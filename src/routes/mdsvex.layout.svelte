<script context="module">
  import a from '$lib/components/a.svelte'
  import h4 from '$lib/components/headings/h4.svelte'
  // import h5 from '$lib/components/headings/h5.svelte'
  // import h6 from '$lib/components/headings/h6.svelte'
  import code from "$lib/components/code.svelte"

  export { a, h4, code }
</script>

<slot />
