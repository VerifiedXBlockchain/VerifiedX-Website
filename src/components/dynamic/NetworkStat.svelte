<script>
  import NumberFlow from '@number-flow/svelte';
  export let title;
  export let subtitle;
  export let value;
  export let metric;
  export let gradientDirection;
  export let ctaTitle;
  export let ctaHref;
  export let valueIsNumber = true;
  export let valueIsSmaller = false;
</script>

<div
  class="col-span-3 mx-auto flex w-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 intersect-once motion-safe:md:intersect:animate-fade motion-safe:md:opacity-0 intersect-quarter"
>
  <div
    class="rounded-lg border border-btc border-solid border-1 fun-gradient px-6 py-8 flex w-full max-w-sm flex-col justify-between text-center transition-transform transform hover:scale-105 hover:shadow-none"
    style={`box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.3); --gradient-direction: ${gradientDirection}`}
  >
    <div class="px-2 py-0 flex flex-col justify-evenly">
      <div>
        <h3 class="text-center text-xl font-semibold uppercase leading-6 tracking-wider mb-2 text-white">
          {title}
        </h3>
        {#if subtitle}
          <p class="font-light sm:text-lg text-gray-200 dark:text-slate-300">{subtitle}</p>
        {/if}
      </div>

      {#if valueIsSmaller}
        <div class="py-2"></div>
      {/if}

      <div class="mt-4">
        <!-- <span
            class="text-5xl relative font-semibold text-white drop-shadow-lg slot-machine-container"
            use:slotMachine={{ from: previousValue, to: value, duration: 800 }}
          ></span> -->

        <span class={`${valueIsSmaller ? 'text-3xl' : 'text-5xl'} font-semibold text-white drop-shadow-lg`}>
          {#if valueIsNumber}
            <NumberFlow {value} />
          {:else}
            <div class="py-3">
              {value}
            </div>
          {/if}
        </span>
      </div>

      {#if valueIsSmaller}
        <div class="py-2"></div>
      {/if}

      {#if metric}
        <span class="text-base inline-block mt-2 text-white font-semibold uppercase tracking-widest">{metric}</span>
      {/if}

      {#if ctaTitle && ctaHref}
        <a
          href={ctaHref}
          target="_blank"
          class="border border-1 inline-block mt-3 border-white text-white font-semibold tracking-wider py-1 px-3 text-sm rounded-full hover:text-black transition ease-in-out hover:bg-white"
        >
          {ctaTitle}
        </a>
      {/if}
    </div>
  </div>
</div>
