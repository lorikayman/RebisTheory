/**
* highly abstract list of identifiers
* for labeling the source/part of an app,
* responsible for hash change
*/
export const HASH_CHANGE_SOURCE = {
  MDX: 4000,
  TOC: 3000,
  DOM: 2000,
  BROWSER: 1000
}

const hashChangeSource = $state({
  source: HASH_CHANGE_SOURCE.BROWSER,
  started: false,
  processing: false
})

/**
* Application-wide states
*/
export const GlobalState = {
  /**
  * Initial state of @see HASH_CHANGE_SOURCE on full page's load
  */
  hashChangeSource: hashChangeSource,
}
