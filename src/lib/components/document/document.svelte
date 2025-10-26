<script>
  /**
   * @module document
   *
   * .svelte file combines view and viewmodel
   *    due to rigid tethering of data and view in svelte
   * model is separated and has non-view specific data of the component
   * viewmodel has all view logic
   */
  import {onMount} from 'svelte'

  import { DocumentModel } from "./document.model"

  import './document.css'
  import './inline/styles.css'

  import {GlobalState, HASH_CHANGE_SOURCE} from '$lib/state/global.svelte.js'

  const { document } = $props()

  /**
   * setup model and view
   */
  const model = new DocumentModel()
  const view = {
    data: undefined,
    get root() {
      return this.data
    },
    set root(e) {
      this.data = e
    }
  }

  /**
   * Hash change logic, responsible for edge cases
   * of page traversal and history traversal by the user
   */
  window.addEventListener('hashchange', async e => {
    const hOld = new URL(e.oldURL).hash
    const hNew = new URL(e.newURL).hash
    console.log(`Received 'hashchange' event from '${hOld}' to '${hNew}'`)

    // this check allows for identification of the source of hash change
    // if its from url traversal within DOM,
    // such as href links, - scroll Toc smoothly
    //
    // Otherwise, jump  in instant scroll to an active an aligned toc element
    // as this is likely a history traversal backwards/forwards
    if (GlobalState.hashChangeSource.started) {
      GlobalState.hashChangeSource.started = false
      GlobalState.hashChangeSource.processing = true

      console.log('Found href processing before hashchange event as:', $state.snapshot(GlobalState.hashChangeSource))

      switch (GlobalState.hashChangeSource.source) {
        // when hash change comes from mdx itself - it was caused by `a` tag click
        case HASH_CHANGE_SOURCE.MDX:
          console.log("Found 'hrefchange' source as HASH_CHANGE_SOURCE.MDX")
          break
        // this is sourced from Toc component - those are `a` tas,
        // but this logic is delegated to MeltUI through component builder itself
        // so we stop here
        case HASH_CHANGE_SOURCE.TOC:
          console.log("Found 'hrefchange' source as HASH_CHANGE_SOURCE.TOC")
          GlobalState.hashChangeSource.processing = false
          return
      }
    }

    // process toc scrolling
    // we don't expect response
    // for ToC melt ui component to update
    // so we preemptively identify target active element
    // and move scroll into its view and of viewport

    // locateActiveTocItem({
    //   scrollBehavior: GlobalState.hashChangeSource.processing ? 'smooth' : 'instant',
    //   errorMsg: `No active element was found when backing
    //     history from '${hOld}' to '${hNew}'`
    // })
    GlobalState.hashChangeSource.processing = false
  })

  /**
   * Prepare a chain of listeners, as `click` event will always precede `hashchange`
   * Here, we identify through bubbling a general area of the page,
   * from which an event has emerged, and act accordingly through
   * working with @see hashChangeSource
   */
  onMount(() => {
    // logic to locate toc active entry on history traversion
    // from markdown document link clicks
    //
    // source is a rendered mdx document
    view.root.addEventListener('click', _ => {
      GlobalState.hashChangeSource.source = HASH_CHANGE_SOURCE.MDX
      GlobalState.hashChangeSource.started = true
      console.log('Received event from document container')
    })
  })
</script>

<div {@attach view.root}
  class='container'
>
  {@render document()}
</div>
