<script setup lang="ts">
import { ArrowRight, MessageCircle } from '@lucide/vue'
</script>

<template>
  <section class="studio-cta" aria-label="Wood studio consultation">
    <img src="/images/wood-interior-cta.png" alt="Finished walnut dining interior with custom shelving">
    <div class="studio-cta-card">
      <p class="eyebrow">FROM SKETCH TO ROOM</p>
      <h2>Built-in warmth, planned around daily use</h2>
      <p>
        We design furniture and wood interiors around material samples, site measurements,
        and the quiet details that make a space feel settled.
      </p>
      <a class="btn primary" href="#contact">
        <MessageCircle :size="18" aria-hidden="true" />
        Start a Consultation
        <ArrowRight :size="18" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>
