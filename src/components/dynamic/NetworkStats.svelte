<script>
  import { onMount, onDestroy } from 'svelte';
  import NetworkStat from './NetworkStat.svelte';
  import { externalLinks } from '~/navigation';
  import { onNewBlock } from '~/lib/block-socket';
  import { useTranslations } from '~/i18n';

  let { locale = 'en' } = $props();
  const t = useTranslations(locale);

  let timer;
  let unsubSocket;

  let data = $state({});
  let loading = $state(true);
  let error = $state(false);

  async function fetchData() {
    try {
      const response = await fetch('https://data.verifiedx.io/api/metrics/', { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();

      if (result && result['latest_block']) {
        data = { ...result };
        loading = false;
        error = false;
      } else {
        error = true;
        loading = false;
      }
    } catch (e) {
      console.error(e);
      error = true;
      loading = false;
    }
  }

  onMount(() => {
    fetchData();
    // Poll REST for all metrics (longer interval since socket handles block height)
    timer = window.setInterval(fetchData, 30000);

    // Live block height from socket
    unsubSocket = onNewBlock((height) => {
      if (data['latest_block'] != null) {
        data = { ...data, latest_block: height };
      }
    });

    return () => {
      if (timer) clearInterval(timer);
      if (unsubSocket) unsubSocket();
    };
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
          { title: t('stats.latest_block'), hasCta: true },
          { title: t('stats.block_time'), hasMetric: true },
          { title: t('stats.transactions'), hasMetric: true },
          { title: t('stats.fees_burned'), hasMetric: true },
          { title: t('stats.circulating_supply'), hasMetric: true, smaller: true },
          { title: t('stats.active_validators'), hasCta: true },
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
          title={t('stats.latest_block')}
          value={data['latest_block']}
          ctaTitle={t('stats.open_spyglass')}
          ctaHref={externalLinks.spyglass}
          gradientDirection="to bottom right"
        />
        <NetworkStat title={t('stats.block_time')} value={10} metric={t('stats.block_time_metric')} gradientDirection="to bottom" />
        <NetworkStat
          title={t('stats.transactions')}
          value={data['total_transactions']}
          metric={t('stats.transactions_metric')}
          gradientDirection="to bottom left"
        />

        <NetworkStat title={t('stats.fees_burned')} value={data['total_burned']} metric={t('stats.fees_metric')} gradientDirection="to top right" />
        <NetworkStat
          title={t('stats.circulating_supply')}
          value={data['circulating_supply']}
          metric={t('stats.supply_metric')}
          gradientDirection="to top"
          valueIsSmaller={true}
        />

        <NetworkStat
          title={t('stats.active_validators')}
          value={data['active_validators']}
          gradientDirection="to top left"
          ctaHref={externalLinks.validatingDocs}
          ctaTitle={t('stats.start_validating')}
        />
      {/if}
    </div>
  </div>
</div>
