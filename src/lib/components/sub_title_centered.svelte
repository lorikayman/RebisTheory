<script>
  const { backgroundImage, children } = $props()
</script>

<div class="centered">
  <span class="text">
    {@render children?.()}
  </span>

  {#if backgroundImage}
    <img alt="" src={backgroundImage} class="bg" />
  {/if}
</div>

<style>
  :global {
    .bg {
      z-index: -2;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      padding-bottom: 1.5rem;

      width: 3.2rem;
      height: 3.2rem;
      filter: opacity(0.06);
    }

    .centered {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 3rem 4rem;
      margin-top: 0rem;
    }

    .text {
      filter: drop-shadow(0 0 3mm hsla(39, 100%, 66%, 0.7));

      & em {
        font-family: subheading;
        color: hsl(34, 100%, 78%);
        letter-spacing: 0.4px;
        line-height: 1.6;
      }

      margin-bottom: 0.4rem;

      & code {
        background-color: hsla(39, 100%, 66%, 1);
        color: hsl(343, 10%, 10%);
        padding: 4px 26px;
        font-style: italic;
      }

      & h4 {
        margin-bottom: 2rem;
      }
    }
  }
</style>
