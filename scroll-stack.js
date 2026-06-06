/**
 * ScrollStack – Vanilla JS port of the React Bits ScrollStack component.
 *
 * KEY FIX: card offsets are measured ONCE at init (before any transforms are
 * applied) and cached. Using getBoundingClientRect() on every frame caused a
 * feedback loop: the transform moved the card visually, which changed its
 * getBoundingClientRect() result, which changed the calculated transform,
 * which moved it again → stuck / jittery animation.
 */
class ScrollStack {
  constructor(containerEl, options = {}) {
    this.container = containerEl;

    this.itemDistance      = options.itemDistance      ?? 100;
    this.itemScale         = options.itemScale         ?? 0.03;
    this.itemStackDistance = options.itemStackDistance ?? 30;
    this.stackPosition     = options.stackPosition     ?? '20%';
    this.scaleEndPosition  = options.scaleEndPosition  ?? '10%';
    this.baseScale         = options.baseScale         ?? 0.85;
    this.rotationAmount    = options.rotationAmount    ?? 0;
    this.blurAmount        = options.blurAmount        ?? 0;
    this.onStackComplete   = options.onStackComplete   ?? null;

    this.cards          = [];
    this.cardOffsets    = [];   // static document-Y of each card (cached once)
    this.endElOffset    = 0;   // static document-Y of the sentinel element
    this.lastTransforms = new Map();
    this.stackCompleted = false;
    this.animationFrame = null;
    this.lenis          = null;

    this._init();
  }

  // ─── helpers ────────────────────────────────────────────────────────────────

  _parsePercentage(value, containerHeight) {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }

  _calculateProgress(scrollTop, start, end) {
    if (start >= end) return 0;
    if (scrollTop <= start) return 0;
    if (scrollTop >= end)   return 1;
    return (scrollTop - start) / (end - start);
  }

  /** Returns the element's absolute document-Y WITHOUT being affected by CSS transforms. */
  _staticOffset(el) {
    // offsetTop walks the offsetParent chain – unaffected by CSS transforms.
    let top = 0;
    let node = el;
    while (node) {
      top  += node.offsetTop;
      node  = node.offsetParent;
    }
    return top;
  }

  // ─── core update (called on every Lenis scroll event) ───────────────────────

  _updateCards() {
    if (!this.cards.length) return;

    const scrollTop          = window.scrollY;
    const containerHeight    = window.innerHeight;
    const stackPositionPx    = this._parsePercentage(this.stackPosition,    containerHeight);
    const scaleEndPositionPx = this._parsePercentage(this.scaleEndPosition, containerHeight);
    const endElTop           = this.endElOffset;

    this.cards.forEach((card, i) => {
      const cardTop    = this.cardOffsets[i];   // ← always the original position
      const pinStart   = cardTop - stackPositionPx - this.itemStackDistance * i;
      const pinEnd     = endElTop - containerHeight / 2;
      const triggerEnd = cardTop - scaleEndPositionPx;

      // ── scale ──────────────────────────────────────────────────────────────
      const scaleProgress = this._calculateProgress(scrollTop, pinStart, triggerEnd);
      const targetScale   = this.baseScale + i * this.itemScale;
      const scale         = 1 - scaleProgress * (1 - targetScale);

      // ── rotation ───────────────────────────────────────────────────────────
      const rotation = this.rotationAmount
        ? i * this.rotationAmount * scaleProgress
        : 0;

      // ── blur ───────────────────────────────────────────────────────────────
      let blur = 0;
      if (this.blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < this.cards.length; j++) {
          const jPinStart = this.cardOffsets[j] - stackPositionPx - this.itemStackDistance * j;
          if (scrollTop >= jPinStart) topCardIndex = j;
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * this.blurAmount);
        }
      }

      // ── pin / translateY ────────────────────────────────────────────────────
      let translateY = 0;
      if (pinEnd > pinStart) {            // sentinel must be below pin start
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx + this.itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd  - cardTop + stackPositionPx + this.itemStackDistance * i;
        }
      }

      // ── diff & apply ────────────────────────────────────────────────────────
      const nt = {
        translateY: Math.round(translateY * 10)  / 10,
        scale:      Math.round(scale      * 1000) / 1000,
        rotation:   Math.round(rotation   * 10)  / 10,
        blur:       Math.round(blur       * 10)  / 10,
      };

      const lt = this.lastTransforms.get(i);
      const changed = !lt
        || Math.abs(lt.translateY - nt.translateY) > 0.05
        || Math.abs(lt.scale      - nt.scale)      > 0.0005
        || Math.abs(lt.rotation   - nt.rotation)   > 0.05
        || Math.abs(lt.blur       - nt.blur)        > 0.05;

      if (changed) {
        card.style.transform =
          `translate3d(0,${nt.translateY}px,0) scale(${nt.scale}) rotate(${nt.rotation}deg)`;
        card.style.filter = nt.blur > 0 ? `blur(${nt.blur}px)` : '';
        this.lastTransforms.set(i, nt);
      }

      // ── onStackComplete callback ────────────────────────────────────────────
      if (i === this.cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !this.stackCompleted) {
          this.stackCompleted = true;
          this.onStackComplete?.();
        } else if (!isInView && this.stackCompleted) {
          this.stackCompleted = false;
        }
      }
    });
  }

  // ─── init ────────────────────────────────────────────────────────────────────

  _init() {
    this.cards = Array.from(this.container.querySelectorAll('.scroll-stack-card'));

    // Apply layout / performance styles BEFORE measuring offsets
    this.cards.forEach((card, i) => {
      if (i < this.cards.length - 1) card.style.marginBottom = `${this.itemDistance}px`;
      card.style.willChange         = 'transform';
      card.style.transformOrigin    = 'top center';
      card.style.backfaceVisibility = 'hidden';
      // Do NOT set transform here – we need a clean getBoundingClientRect below
    });

    // ── Cache static offsets (offsetTop chain, unaffected by transforms) ──────
    // Defer one frame so the browser has finalised layout after the margin-bottom
    // assignments above.
    requestAnimationFrame(() => {
      this.cardOffsets = this.cards.map(card => this._staticOffset(card));

      const endEl = document.querySelector('.scroll-stack-end');
      this.endElOffset = endEl ? this._staticOffset(endEl) : 0;

      // ── Set up Lenis ────────────────────────────────────────────────────────
      this.lenis = new Lenis({
        duration:        1.2,
        easing:          t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel:     true,
        wheelMultiplier: 1,
        lerp:            0.1,
        syncTouch:       true,
        syncTouchLerp:   0.075,
      });

      this.lenis.on('scroll', () => this._updateCards());

      const raf = time => {
        this.lenis.raf(time);
        this.animationFrame = requestAnimationFrame(raf);
      };
      this.animationFrame = requestAnimationFrame(raf);

      // Initial paint at rest
      this._updateCards();
    });
  }

  // ─── cleanup ─────────────────────────────────────────────────────────────────

  destroy() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    if (this.lenis)          this.lenis.destroy();
    this.cards          = [];
    this.cardOffsets    = [];
    this.lastTransforms.clear();
    this.stackCompleted = false;
  }
}
