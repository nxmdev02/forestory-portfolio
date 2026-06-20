<script setup lang="ts">
import { ArrowRight, Camera, ChevronLeft, ChevronRight, FolderOpen, Images, X } from '@lucide/vue'
import { categoryLabels, portfolioItems } from '~/data/studio'
import type { PortfolioItem } from '~/types/portfolio'

const selectedYear = ref<number | 'all'>('all')
const activeItem = ref<PortfolioItem | null>(null)
const activePreviewImage = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

const years = computed(() => [...new Set(portfolioItems.map((item) => item.year))].sort((a, b) => b - a))
const filteredItems = computed(() =>
  selectedYear.value === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.year === selectedYear.value)
)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage)))
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})
const paginationLabel = computed(() => {
  if (!filteredItems.value.length) return 'No projects found'

  const start = (currentPage.value - 1) * itemsPerPage + 1
  const end = Math.min(currentPage.value * itemsPerPage, filteredItems.value.length)
  return `Showing ${start}-${end} of ${filteredItems.value.length} projects`
})

const goToPage = (page: number) => {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

const openFolder = (item: PortfolioItem) => {
  activeItem.value = item
  activePreviewImage.value = item.coverImage
}

const closeFolder = () => {
  activeItem.value = null
  activePreviewImage.value = ''
}

watch(selectedYear, () => {
  currentPage.value = 1
  closeFolder()
})

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

    <div class="portfolio-toolbar" aria-live="polite">
      <span>{{ paginationLabel }}</span>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
    </div>

    <div class="portfolio-grid">
      <a
        v-for="item in paginatedItems"
        :key="item.id"
        class="folder-card"
        :href="`/portfolio/${item.id}`"
        :aria-label="`Open ${item.title} folder`"
        @click.prevent="openFolder(item)"
        @keydown.space.prevent="openFolder(item)"
      >
        <div class="folder-tab">
          <span>{{ item.year }}</span>
          <span>{{ categoryLabels[item.category] }}</span>
        </div>

        <div class="folder-body">
          <span class="folder-front" aria-hidden="true" />
          <span class="portfolio-image" aria-hidden="true">
            <img :src="item.coverImage" :alt="`${item.title} cover image`">
          </span>
          <span class="portfolio-meta">
            <strong>{{ item.title }}</strong>
            <span>{{ item.summary }}</span>
          </span>
          <span class="portfolio-count">
            <Images :size="16" aria-hidden="true" />
            {{ item.images.length }} photos
          </span>
        </div>
      </a>
    </div>

    <nav v-if="totalPages > 1" class="portfolio-pagination" aria-label="Portfolio pagination">
      <button type="button" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        <ChevronLeft :size="16" aria-hidden="true" />
        Previous
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        type="button"
        :class="{ active: currentPage === page }"
        :aria-current="currentPage === page ? 'page' : undefined"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button type="button" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
        Next
        <ChevronRight :size="16" aria-hidden="true" />
      </button>
    </nav>

    <Teleport to="body">
      <div v-if="activeItem" class="folder-modal-backdrop" role="presentation" @click.self="closeFolder">
        <article class="folder-modal" role="dialog" aria-modal="true" :aria-label="`${activeItem.title} folder preview`">
          <button class="folder-modal-close" type="button" aria-label="Close folder" @click="closeFolder">
            <X :size="20" aria-hidden="true" />
          </button>

          <div class="folder-modal-shell">
            <div class="folder-modal-tab">
              <span>{{ activeItem.year }}</span>
              <span>{{ categoryLabels[activeItem.category] }}</span>
            </div>

            <div class="folder-modal-body">
              <span class="folder-modal-front" aria-hidden="true" />

              <div class="folder-modal-cover">
                <img :src="activePreviewImage || activeItem.coverImage" :alt="`${activeItem.title} selected preview`">
              </div>

              <div class="folder-modal-copy">
                <p class="eyebrow">{{ activeItem.year }} / {{ categoryLabels[activeItem.category] }}</p>
                <h3>{{ activeItem.title }}</h3>
                <p>{{ activeItem.summary }}</p>
              </div>

              <div class="folder-modal-photos" aria-label="Project photos">
                <button
                  v-for="(image, index) in activeItem.images"
                  :key="image"
                  type="button"
                  class="photo-print"
                  :class="{ active: activePreviewImage === image }"
                  :style="{ '--delay': `${180 + index * 80}ms` }"
                  @click="activePreviewImage = image"
                >
                  <img :src="image" :alt="`${activeItem.title} photo ${index + 1}`">
                  <span>
                    <Camera :size="14" aria-hidden="true" />
                    Preview Photo
                  </span>
                </button>
              </div>

              <NuxtLink class="folder-modal-detail" :to="`/portfolio/${activeItem.id}`" @click="closeFolder">
                <FolderOpen :size="18" aria-hidden="true" />
                Open Project Detail
                <ArrowRight :size="18" aria-hidden="true" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </Teleport>
  </section>
</template>
