<script setup lang="ts">
import { categoryLabels, portfolioItems } from '~/data/studio'
import type { PortfolioItem } from '~/types/portfolio'

const selectedYear = ref<number | 'all'>('all')
const activeItem = ref<PortfolioItem | null>(null)

const years = computed(() => [...new Set(portfolioItems.map((item) => item.year))].sort((a, b) => b - a))
const filteredItems = computed(() =>
  selectedYear.value === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.year === selectedYear.value)
)

const openFolder = (item: PortfolioItem) => {
  activeItem.value = item
}

const closeFolder = () => {
  activeItem.value = null
}

watch(selectedYear, closeFolder)

watch(activeItem, (item) => {
  if (import.meta.client) {
    document.body.classList.toggle('modal-open', Boolean(item))
  }
})

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeFolder()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('modal-open')
})
</script>

<template>
  <section id="portfolio" class="section portfolio-section">
    <div class="section-heading">
      <p class="eyebrow">PORTFOLIO BY YEAR</p>
      <h2>Work by Year</h2>
      <p>Select a folder to dim the page, open the project, and preview the photos before moving to the detail page.</p>
    </div>

    <div class="year-filter" aria-label="Year filter">
      <button type="button" :class="{ active: selectedYear === 'all' }" @click="selectedYear = 'all'">All</button>
      <button
        v-for="year in years"
        :key="year"
        type="button"
        :class="{ active: selectedYear === year }"
        @click="selectedYear = year"
      >
        {{ year }}
      </button>
    </div>

    <div class="portfolio-grid">
      <article v-for="item in filteredItems" :key="item.id" class="folder-card">
        <div class="folder-tab">
          <span>{{ item.year }}</span>
          <span>{{ categoryLabels[item.category] }}</span>
        </div>

        <button
          type="button"
          class="folder-body"
          :aria-label="`Open ${item.title} folder`"
          @click="openFolder(item)"
        >
          <span class="folder-front" aria-hidden="true" />
          <span class="portfolio-image" aria-hidden="true">
            <img :src="item.coverImage" :alt="`${item.title} cover image`">
          </span>
          <span class="portfolio-meta">
            <strong>{{ item.title }}</strong>
            <span>{{ item.summary }}</span>
          </span>
          <span class="portfolio-count">{{ item.images.length }} photos</span>
        </button>
      </article>
    </div>

    <Teleport to="body">
      <div v-if="activeItem" class="folder-modal-backdrop" role="presentation" @click.self="closeFolder">
        <article class="folder-modal" role="dialog" aria-modal="true" :aria-label="`${activeItem.title} folder preview`">
          <button class="folder-modal-close" type="button" aria-label="Close folder" @click="closeFolder">x</button>

          <div class="folder-modal-shell">
            <div class="folder-modal-tab">
              <span>{{ activeItem.year }}</span>
              <span>{{ categoryLabels[activeItem.category] }}</span>
            </div>

            <div class="folder-modal-body">
              <span class="folder-modal-front" aria-hidden="true" />

              <div class="folder-modal-cover">
                <img :src="activeItem.coverImage" :alt="`${activeItem.title} cover image`">
              </div>

              <div class="folder-modal-copy">
                <p class="eyebrow">{{ activeItem.year }} / {{ categoryLabels[activeItem.category] }}</p>
                <h3>{{ activeItem.title }}</h3>
                <p>{{ activeItem.summary }}</p>
              </div>

              <div class="folder-modal-photos" aria-label="Project photos">
                <NuxtLink
                  v-for="(image, index) in activeItem.images"
                  :key="image"
                  class="photo-print"
                  :style="{ '--delay': `${180 + index * 80}ms` }"
                  :to="`/portfolio/${activeItem.id}`"
                  @click="closeFolder"
                >
                  <img :src="image" :alt="`${activeItem.title} photo ${index + 1}`">
                  <span>View Details</span>
                </NuxtLink>
              </div>

              <NuxtLink class="folder-modal-detail" :to="`/portfolio/${activeItem.id}`" @click="closeFolder">
                Open Project Detail
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </Teleport>
  </section>
</template>
