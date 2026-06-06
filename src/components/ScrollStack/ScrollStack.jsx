import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef        = useRef(null);
  const stackCompletedRef  = useRef(false);
  const animationFrameRef  = useRef(null);
  const lenisRef           = useRef(null);
  const cardsRef           = useRef([]);
  const lastTransformsRef  = useRef(new Map());
  const isUpdatingRef      = useRef(false);

  // ── Cached static offsets (populated once in useLayoutEffect) ─────────────
  // Using offsetTop chain instead of getBoundingClientRect so transforms
  // applied to cards don't feed back into the position calculation.
  const cardOffsetsRef  = useRef([]);   // document-Y of each card
  const endElOffsetRef  = useRef(0);    // document-Y of the sentinel element

  // ─── helpers ────────────────────────────────────────────────────────────────

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end)   return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  /** Walk offsetParent chain — unaffected by CSS transforms */
  const getStaticOffset = useCallback((el) => {
    let top = 0;
    let node = el;
    while (node) {
      top  += node.offsetTop;
      node  = node.offsetParent;
    }
    return top;
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight };
    }
    const scroller = scrollerRef.current;
    return { scrollTop: scroller.scrollTop, containerHeight: scroller.clientHeight };
  }, [useWindowScroll]);

  // ─── core update ────────────────────────────────────────────────────────────

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx    = parsePercentage(stackPosition,    containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElTop           = endElOffsetRef.current;   // ← cached, never recalculated

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop    = cardOffsetsRef.current[i];      // ← cached, never recalculated
      const pinStart   = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd     = endElTop - containerHeight / 2;
      const triggerEnd = cardTop - scaleEndPositionPx;

      const scaleProgress = calculateProgress(scrollTop, pinStart, triggerEnd);
      const targetScale   = baseScale + i * itemScale;
      const scale         = 1 - scaleProgress * (1 - targetScale);
      const rotation      = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jPinStart = cardOffsetsRef.current[j] - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jPinStart) topCardIndex = j;
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      if (pinEnd > pinStart) {
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd  - cardTop + stackPositionPx + itemStackDistance * i;
        }
      }

      const nt = {
        translateY: Math.round(translateY * 100) / 100,
        scale:      Math.round(scale      * 1000) / 1000,
        rotation:   Math.round(rotation   * 100) / 100,
        blur:       Math.round(blur       * 100) / 100,
      };

      const lt = lastTransformsRef.current.get(i);
      const changed = !lt
        || Math.abs(lt.translateY - nt.translateY) > 0.1
        || Math.abs(lt.scale      - nt.scale)      > 0.001
        || Math.abs(lt.rotation   - nt.rotation)   > 0.1
        || Math.abs(lt.blur       - nt.blur)        > 0.1;

      if (changed) {
        card.style.transform =
          `translate3d(0,${nt.translateY}px,0) scale(${nt.scale}) rotate(${nt.rotation}deg)`;
        card.style.filter = nt.blur > 0 ? `blur(${nt.blur}px)` : '';
        lastTransformsRef.current.set(i, nt);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, rotationAmount, blurAmount, useWindowScroll, onStackComplete,
    calculateProgress, parsePercentage, getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });
      lenis.on('scroll', handleScroll);
      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        normalizeWheel: true,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });
      lenis.on('scroll', handleScroll);
      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
    }
  }, [handleScroll, useWindowScroll]);

  // ─── lifecycle ───────────────────────────────────────────────────────────────

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    // Apply layout styles before measuring (margins affect offset positions)
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange        = 'transform, filter';
      card.style.transformOrigin   = 'top center';
      card.style.backfaceVisibility = 'hidden';
      // Do NOT set transform here — must measure clean positions first
    });

    // ── Cache static document offsets (one-time, transform-immune) ────────────
    // Defer one rAF so the browser has committed the marginBottom changes above
    // before we measure offsetTop.
    const measureId = requestAnimationFrame(() => {
      cardOffsetsRef.current = cards.map(card => getStaticOffset(card));

      const endEl = useWindowScroll
        ? document.querySelector('.scroll-stack-end')
        : scroller.querySelector('.scroll-stack-end');
      endElOffsetRef.current = endEl ? getStaticOffset(endEl) : 0;

      setupLenis();
      updateCardTransforms();
    });

    return () => {
      cancelAnimationFrame(measureId);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      lenisRef.current = null;
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardOffsetsRef.current = [];
      endElOffsetRef.current = 0;
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition,
    baseScale, scaleDuration, rotationAmount, blurAmount, useWindowScroll,
    onStackComplete, getStaticOffset, setupLenis, updateCardTransforms,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
