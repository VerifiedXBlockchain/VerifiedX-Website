<script>
  import { onMount } from 'svelte';
  import NetworkStat from './NetworkStat.svelte';
  import { externalLinks } from '~/navigation';

  let timer;

  let data = {};
  let loading = true;
  let error = false;

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
    } catch (error) {
      console.error(error);
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

{#if loading}
  <div></div>
{:else if error}
  <div></div>
{:else}
  <div
    class="relative px-4 md:px-6 py-4 text-default intersect-once intersect-quarter intercept-no-queue motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade max-w-6xl mx-auto mt-0 pt-0 md:pt-0 lg:pt-0"
  >
    <div class="flex items-stretch justify-center">
      <div class="grid grid-cols-3 gap-6 dark:text-white sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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
      </div>
    </div>
  </div>
{/if}
