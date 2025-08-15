<script>

  // gremlin conlang table contents
  const GREMLIN_CONLANG_RUNES = [
    ['▖', 2],
    ['▗', 7],
    ['▘', 4],
    ['▝', 5],
    ['▌', '4/5'],
    ['▐', 2],
    ['▄', 6],
    ['▀', 6],
    ['█', '5/6'],
    ['▙', 2],
    ['▟', 4],
    ['▚', 1],
    ['▞', 3],
    ['▜', 0],
    ['▛', 2],
    ['_', '3/4']
  ]

  console.log('here')
</script>

<table>
  <thead>
    <tr>
      <th>Symbol / Rune</th>
      <th>Repetitions (min/max)</th>
    </tr>
  </thead>
  <tbody>
    {#each GREMLIN_CONLANG_RUNES as runeInfo, ri}
      <tr class={ri % 2 == 0 ? 'row-color-1' : 'row-color-2'}>
        {#each runeInfo as infoElement, i}
          {#if i == 0}
            <td><code>{infoElement}</code></td>
          {:else}
            <td>{infoElement}</td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
