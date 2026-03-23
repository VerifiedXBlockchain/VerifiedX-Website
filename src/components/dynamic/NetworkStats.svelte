<script>
  import { onMount } from 'svelte';
  import NetworkStat from './NetworkStat.svelte';
  import { externalLinks } from '~/navigation';

  let timer;

  let data = $state({});
  let loading = $state(true);
  let error = $state(false);

  async function fetchData() {
    try {
      const response = await fetch('https://data.verifiedx.io/api/metrics/');
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();

      if (result && result['latest_block']) {
        data = { ...result };
      } else {
        error = true;
      }
    } catch (e) {
      console.error(e);
      error = true;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchData();

    timer = window.setInterval(() => {
      fetchData();
    }, 5000);

    // setInterval(() => {
    //   value = Math.floor(Math.random() * 9999);
    // }, 2000);
  });
</script>

<div
  class="relative px-4 md:px-6 py-4 text-default max-w-6xl mx-auto mt-0 pt-0 md:pt-0 lg:pt-0"
  class:loaded={!loading && !error}
>
  <div class="flex items-stretch justify-center">
    <div class="grid grid-cols-3 gap-6 dark:text-white sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {#if loading || error}
        {#each [
          { title: 'Latest Block', hasCta: true },
          { title: 'Block Time', hasMetric: true },
          { title: 'Transactions', hasMetric: true },
          { title: 'Fees Burned', hasMetric: true },
          { title: 'Circulating Supply', hasMetric: true, smaller: true },
          { title: 'Active Validators', hasCta: true },
        ] as card}
          <div class="col-span-3 mx-auto flex w-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
            <div
              class="rounded-lg border border-vfx-purple/40 border-solid border-1 fun-gradient px-6 py-8 flex w-full max-w-sm flex-col justify-between text-center"
              style="box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.3); --gradient-direction: to bottom"
            >
              <div class="px-2 py-0 flex flex-col justify-evenly">
                <div>
                  <h3 class="text-center text-xl font-semibold uppercase leading-6 tracking-wider mb-2 text-white">
                    {card.title}
                  </h3>
                </div>

                {#if card.smaller}<div class="py-2"></div>{/if}

                <div class="mt-4">
                  <span class={`${card.smaller ? 'text-3xl' : 'text-5xl'} font-semibold inline-block`}>
                    <div class="mx-auto h-12 w-36 rounded bg-white/10 animate-pulse"></div>
                  </span>
                </div>

                {#if card.smaller}<div class="py-2"></div>{/if}

                {#if card.hasMetric}
                  <span class="text-base inline-block mt-2">
                    <div class="mx-auto h-4 w-16 rounded bg-white/10 animate-pulse"></div>
                  </span>
                {/if}

                {#if card.hasCta}
                  <div class="inline-block mt-3 py-1 px-3 text-sm">
                    <div class="mx-auto h-7 w-28 rounded-full bg-white/10 animate-pulse"></div>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <NetworkStat
          title="Latest Block"
          value={data['latest_block']}
          ctaTitle="Open Spyglass"
          ctaHref={externalLinks.spyglass}
          gradientDirection="to bottom right"
        />
        <NetworkStat title="Block Time" value={10} metric="Seconds" gradientDirection="to bottom" />
        <NetworkStat
          title="Transactions"
          value={data['total_transactions']}
          metric="Total"
          gradientDirection="to bottom left"
        />

        <NetworkStat title="Fees Burned" value={data['total_burned']} metric="VFX" gradientDirection="to top right" />
        <NetworkStat
          title="Circulating Supply"
          value={data['circulating_supply']}
          metric="VFX"
          gradientDirection="to top"
          valueIsSmaller={true}
        />

        <NetworkStat
          title="Active Validators"
          value={data['active_validators']}
          gradientDirection="to top left"
          ctaHref={externalLinks.validatingDocs}
          ctaTitle="Start Validating"
        />
      {/if}
    </div>
  </div>
</div>
