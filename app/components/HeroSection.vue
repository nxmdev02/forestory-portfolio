<script setup lang="ts">
import { ArrowRight, MapPin } from '@lucide/vue'

const scrollToSection = (id: string, event?: MouseEvent) => {
  event?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}

const imageFailed = ref(false)

const marqueeItems = [
  'Custom Furniture',
  'Solid Wood Interiors',
  'Kitchen Systems',
  'Dining Tables',
  'Storage Design',
  'Workshop Build'
]
const marqueeLoop = [...marqueeItems, ...marqueeItems].map((label, index) => ({ label, index }))
const { updateSpotlight, clearSpotlight } = useSpotlightCard()
</script>

<template>
  <section id="home" class="hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">HANDCRAFTED WOODWORKING</p>
        <h1>Furniture shaped for warm spaces</h1>
        <p class="hero-subtitle">Custom wood furniture, built-in interiors, and carefully finished studio projects.</p>
        <div class="hero-actions">
          <a class="btn primary" href="#portfolio" @click="scrollToSection('portfolio', $event)">
            View Portfolio
            <ArrowRight :size="18" aria-hidden="true" />
          </a>
          <a class="btn ghost" href="#location" @click="scrollToSection('location', $event)">
            <MapPin :size="18" aria-hidden="true" />
            Visit Studio
          </a>
        </div>
      </div>

      <div
        class="hero-process-tile interactive-spotlight"
        @pointermove="updateSpotlight"
        @pointerleave="clearSpotlight"
      >
        <img src="/images/wood-process-tile.png" alt="Hands marking walnut boards in a woodworking studio">
        <div>
          <strong>Measured slowly. Built to stay.</strong>
          <span>Every project starts with grain, proportion, and the way a room is lived in.</span>
        </div>
      </div>

      <div
        class="hero-visual interactive-spotlight"
        aria-label="Woodworking studio image"
        @pointermove="updateSpotlight"
        @pointerleave="clearSpotlight"
      >
        <img
          v-if="!imageFailed"
          src="/images/wood-hero-studio.png"
          alt="A refined woodworking studio with a handcrafted chair on a workbench"
          @error="imageFailed = true"
        >
        <div v-else class="image-fallback">
          <span>WOOD STUDIO</span>
          <strong>Workshop image coming soon</strong>
        </div>
      </div>
    </div>

    <div class="marquee-strip" aria-label="Studio services">
      <div>
        <span v-for="item in marqueeLoop" :key="`${item.label}-${item.index}`">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>
