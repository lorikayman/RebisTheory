<script>
  import { onMount } from 'svelte'

  /**
   * @param {[]Node} items
   *  list of compiled Nodes
   * @param {string} id
   *  id of container node where `items` will be redndered
   */
  let {items, id} = $props()
  console.log('VIRTUAL::received items:', items.length)

  let viewportHeight = $state(window.innerHeight)
  let reserveHeightVertical = 0.0
  // let renderHeight = $derived(viewportHeight * reserveHeightVertical)
  let observer;
  let root;

  // let mountedElements = new Set
  // let renderedItems = $state([])

  let startItems = []
  for (let i = 0; i < 9; i++) {
    startItems.push(i)
  }

  // Cache measured heights
  // let measuredHeights = $state({})
  let visibleItemIndexes = new Set()
  // $effect(() => {
  //   console.log('visibleItemsIndexes:', visibleItemsIndexes)
  // })

  /**
   * Attachment function to root element of IntersectionObserver
   *
   * @param {Node} el
   */
  const viewportRoot = (el) => {
    console.log('Found root:', el.nodeName)
    root = el

    const viewport = null
    initIntersectionObserver(viewport)
    console.log('VIRTUAL::observer', observer)
  }

  function initIntersectionObserver(root) {
    // Options for the observer
    const options = {
      root: root,
      rootMargin: `${viewportHeight * reserveHeightVertical}px 0px`,
      threshold: 0
    };

    // Create observer
    observer = new IntersectionObserver(intersectionCallback, options);
  }

  /**
   * If callback is called, this mans the viewport changes/moves
   *
   * @param {IntersectionObserverEntry[]} entries
   *  changed observed entries
   */
  function intersectionCallback(entries) {
    const opId = `${Math.random()}`.substring(2, 5)

    const ixMinPrev = Math.min(...visibleItemIndexes)
    const ixMaxPrev = Math.max(...visibleItemIndexes)

    entries.forEach(entry => {
      const index = parseInt(entry.target.dataset.index);

      if (entry.isIntersecting) {
        visibleItemIndexes.add(index);
        console.log(opId,': IN:', entry.target.dataset.index)
      } else {
        visibleItemIndexes.delete(index);
        console.log(opId,': OUT:', entry.target.dataset.index)
      }
    });

    const ixMin = Math.min(...visibleItemIndexes)
    const ixMax = Math.max(...visibleItemIndexes)
    console.log(opId, ': ixs:', ixMin, ixMax)

    const renderContext = {
      scrollUp: false,
      scrollDown: false
    }


    // while scrolling down, top block remains due to its height, residing in and outside of vieport
    if (ixMax > ixMaxPrev && ixMin == ixMinPrev) {
      console.log('scrolling DOWN for blocks:', ixMax - ixMaxPrev)
      renderContext.scrollDown = true
    }
    // while scrolling up, bottom block remains due to its height, residing in and outside of vieport
    if (ixMax === ixMaxPrev && ixMin < ixMinPrev) {
      console.log('scroll UP for blocks:', ixMaxPrev - ixMax)
      renderContext.scrollUp = true
    }
    // simpler cases, unprecise, so we consider flag changes from above cases
    if (!renderContext.scrollDown && ixMin > ixMinPrev) {
      console.log('scrolling DOWN for blocks:', ixMin - ixMinPrev)
      renderContext.scrollDown = true
    }
    if (!renderContext.scrollUp && ixMax < ixMaxPrev) {
      console.log('scroll UP for blocks:', ixMaxPrev - ixMax)
      renderContext.scrollUp = true
    }

    updateRenderedItems(renderContext)
  }


  function updateRenderedItems(renderContext) {
    // Get all visible indexes and some buffer around them
    // const visibleIndexes = Array.from(visibleItemIndexes).sort((a, b) => a - b)

    if (visibleItemIndexes.length === 0) return
    console.log('visibleItemIndexes', visibleItemIndexes, renderContext)

    function calcRenderedHeight() {
      let heights = [];
      for (const i of visibleItemIndexes) {
        console.log('calcRenderedHeight::item [', i, '] height: ', items[i].offsetHeight, items[i])
        heights.push(items[i].offsetHeight)
      }
      return heights.reduce((p, n) => p += n, 0)
    }

    // elsHeightNumAbove
    // elsHeightNumBelow
    // elsCountAbove
    // elsCountBelow
    const renderedHeight = calcRenderedHeight()
    console.log('renderedHeight', renderedHeight)
    if (renderedHeight > viewportHeight * reserveHeightVertical) {
      console.log('changing elemnets')
    }
    return


    // // Create new set of indexes to render
    // const newRenderedIndexes = new Set();
    // for (let i = minIndex; i <= maxIndex; i++) {
    //   newRenderedIndexes.add(i);
    // }

    // // Remove items that are no longer needed
    // renderedItems.forEach(index => {
    //   if (!newRenderedIndexes.has(index)) {
    //     removeItem(index);
    //   }
    // });

    // // Add new items that should be rendered
    // newRenderedIndexes.forEach(index => {
    //   if (!renderedItems.includes(index)) {
    //     addItem(index);
    //   }
    // });

    // renderedItems = Array.from(newRenderedIndexes).sort((a, b) => a - b);
  }

  function addItem(index) {
    // if (!root || mountedElements.has(index)) return;

    const element = items[index];
    element.dataset.index = index;

    root.appendChild(element);
    observer.observe(element);
    // mountedElements.set(index, element);
  }

  function removeItem(index) {
    const element = mountedElements.get(index);
    if (element) {
      observer.unobserve(element);
      if (element.parentNode === root) {
        root.removeChild(element);
      }
      mountedElements.delete(index);
    }
  }


  function initContent() {
    console.log('VIRTUAL::init content', root)
    for (let i = 0; i < 10; i++) {
      observer.observe(items[i])
      root.appendChild(items[i])
    }
  }

  onMount(() => {
    initContent()
    console.log('visibleItemIndexes::', visibleItemIndexes)
  })

</script>

<div id={id}
  class='root'
  {@attach viewportRoot}
>
  <!-- {#each startItems as ix}
    {@html items[ix].outerHTML}
  {/each} -->
</div>
