<script module>
  import a from '$lib/components/a.svelte'
  import h4 from '$lib/components/headings/h4.svelte'
  // import h5 from '$lib/components/headings/h5.svelte'
  // import h6 from '$lib/components/headings/h6.svelte'

  export { a, h4 }
</script>

<script>
  let { children, frontmatter } = $props()
</script>

<div>
  {@render children?.()}
</div>
