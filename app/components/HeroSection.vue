<script setup lang="ts">
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
        <button class="btn primary" type="button" @click="scrollToSection('portfolio')">View Portfolio</button>
        <button class="btn ghost" type="button" @click="scrollToSection('location')">Find the Workshop</button>
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
