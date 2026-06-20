<script setup lang="ts">
import { ArrowRight, Hammer, Home, Layers3 } from '@lucide/vue'

const services = [
  {
    title: 'Custom Furniture',
    description: 'Tables, chairs, storage pieces, and one-off furniture made around material and proportion.',
    image: '/images/wood-process-tile.png',
    icon: Hammer
  },
  {
    title: 'Wood Interiors',
    description: 'Warm built-in walls, counters, shelving, and residential wood features planned for daily use.',
    image: '/images/wood-interior-cta.png',
    icon: Home
  },
  {
    title: 'Studio Build',
    description: 'From sketches and samples to workshop fabrication, finishing, delivery, and installation.',
    image: '/images/wood-hero-studio.png',
    icon: Layers3
  }
]
</script>

<template>
  <section class="section services-section" aria-label="Wood studio services">
    <div class="section-heading compact-heading">
      <p class="eyebrow">OUR SERVICES</p>
      <h2>Made for the way a room is used</h2>
    </div>

    <div class="service-card-grid">
      <article v-for="service in services" :key="service.title" class="service-card">
        <img :src="service.image" :alt="`${service.title} background`">
        <div class="service-card-overlay">
          <component :is="service.icon" :size="24" aria-hidden="true" />
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <span>
            Explore craft
            <ArrowRight :size="16" aria-hidden="true" />
          </span>
        </div>
      </article>
    </div>
  </section>
</template>
