<script setup lang="ts">
import { ArrowRight, MapPin } from '@lucide/vue'

const scrollToSection = (id: string, event?: MouseEvent) => {
  event?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}

const imageFailed = ref(false)
</script>

<template>
  <section id="home" class="hero section">
    <div class="hero-copy">
      <p class="eyebrow">HANDCRAFTED WOODWORKING</p>
      <h1>Warm spaces, finished by hand</h1>
      <p class="hero-subtitle">Custom furniture, solid wood interiors, and workshop-built portfolios</p>
      <div class="hero-actions">
        <a class="btn primary" href="#portfolio" @click="scrollToSection('portfolio', $event)">
          View Portfolio
          <ArrowRight :size="18" aria-hidden="true" />
        </a>
        <a class="btn ghost" href="#location" @click="scrollToSection('location', $event)">
          <MapPin :size="18" aria-hidden="true" />
          Find the Workshop
        </a>
      </div>
    </div>

    <div class="hero-visual" aria-label="Woodworking workshop image">
      <img
        v-if="!imageFailed"
        src="/images/placeholder-workshop.jpg"
        alt="A woodworking bench for handcrafted furniture"
        @error="imageFailed = true"
      >
      <div v-else class="image-fallback">
        <span>WOOD STUDIO</span>
        <strong>Workshop image coming soon</strong>
      </div>
    </div>
  </section>
</template>
