<script>
  let { children } = $props();
</script>

<style>
  .quotes {
    visibility: visible;
    opacity: 0;
    position: absolute;
  }

  code {
    font-weight: bold;
    font-style: normal;
    border-radius: 2px;
    padding: 0px 4px;
  }

</style>

<span class="quotes">“</span>
<code>
  {@render children?.()}
</code>
<span class="quotes">”</span>
