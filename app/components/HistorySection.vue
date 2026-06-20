<script setup lang="ts">
import { historyItems } from '~/data/history'
</script>

<template>
  <section id="history" class="section history-section">
    <div class="section-heading">
      <p class="eyebrow">COMPANY HISTORY</p>
      <h2>Company History</h2>
      <p>Key milestones as WOOD STUDIO grew from a custom furniture workshop into a wood-focused interior studio.</p>
    </div>

    <div class="timeline" aria-label="Company history timeline">
      <article v-for="item in historyItems" :key="item.year" class="timeline-item">
        <time :datetime="String(item.year)">{{ item.year }}</time>
        <div class="timeline-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
