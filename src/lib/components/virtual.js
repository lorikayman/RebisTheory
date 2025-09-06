export class VirtualizedList {
  constructor(container, items, estimatedHeight = 50) {
    this.container = container;
    this.items = items;
    this.estimatedHeight = estimatedHeight;
    this.measuredHeights = {}; // Cache measured heights
    this.visibleItems = new Set(); // Track visible items
    this.inner = container.querySelector('#inner');

    // Set initial inner height based on estimates
    this.inner.style.height = `${items.length * estimatedHeight}px`;

    this.initIntersectionObserver();
    this.renderChunk();
  }

  initIntersectionObserver() {
    // Options for the observer
    const options = {
      root: this.container,
      rootMargin: '50px 0px', // Load items slightly outside viewport
      threshold: 0
    };

    // Create observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.dataset.index);

        if (entry.isIntersecting) {
          this.visibleItems.add(index);
        } else {
          this.visibleItems.delete(index);
        }
      });

      this.renderChunk(); // Re-render based on visibility changes
    }, options);
  }

  renderChunk() {
    const containerRect = this.container.getBoundingClientRect();
    const scrollTop = this.container.scrollTop;
    const visibleStart = Math.max(0, Math.floor(scrollTop / this.estimatedHeight) - 5);
    const visibleEnd = Math.min(
      this.items.length - 1,
      Math.ceil((scrollTop + containerRect.height) / this.estimatedHeight) + 5
    );

    // Remove non-visible items
    this.inner.querySelectorAll('.item').forEach(item => {
      const index = parseInt(item.dataset.index);
      if (index < visibleStart || index > visibleEnd) {
        this.observer.unobserve(item);
        item.remove();
      }
    });

    // Add new visible items
    for (let i = visibleStart; i <= visibleEnd; i++) {
      if (!this.visibleItems.has(i) && !this.inner.querySelector(`[data-index="${i}"]`)) {
        const item = this.createItem(i);
        this.inner.appendChild(item);
        this.observer.observe(item);
      }
    }

    this.updateInnerHeight(); // Adjust inner container height
  }

  createItem(index) {
    const item = document.createElement('div');
    item.className = 'item';
    item.dataset.index = index;
    item.textContent = this.items[index]; // Customize content here

    // Use cached height or estimate
    item.style.top = `${this.calculateTop(index)}px`;
    item.style.height = `${this.measuredHeights[index] || this.estimatedHeight}px`;

    // Measure and update height if not cached
    if (!this.measuredHeights[index]) {
      setTimeout(() => this.measureHeight(item, index), 0);
    }

    return item;
  }

  measureHeight(item, index) {
    const height = item.getBoundingClientRect().height;
    if (height !== this.measuredHeights[index]) {
      this.measuredHeights[index] = height;
      this.updateItemPositions(); // Recalculate positions if height changed
    }
  }

  calculateTop(index) {
    let top = 0;
    for (let i = 0; i < index; i++) {
      top += this.measuredHeights[i] || this.estimatedHeight;
    }
    return top;
  }

  updateItemPositions() {
    this.inner.querySelectorAll('.item').forEach(item => {
      const index = parseInt(item.dataset.index);
      item.style.top = `${this.calculateTop(index)}px`;
    });
    this.updateInnerHeight();
  }

  updateInnerHeight() {
    const totalHeight = this.items.reduce((sum, _, i) => {
      return sum + (this.measuredHeights[i] || this.estimatedHeight);
    }, 0);
    this.inner.style.height = `${totalHeight}px`;
  }
}

// Usage
// const container = document.getElementById('container');
// const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
// new VirtualizedList(container, items);
