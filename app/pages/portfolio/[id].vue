<script setup lang="ts">
import { ArrowLeft, ArrowRight, Calendar, Clock, FolderOpen, MapPin, Package, Tag, User } from '@lucide/vue'
import { categoryLabels } from '~/data/studio'

const route = useRoute()
const isReady = ref(false)
const { allPortfolioItems, loadManagedItems } = usePortfolioStore()

const portfolio = computed(() => allPortfolioItems.value.find((item) => item.id === route.params.id))
const activeImage = ref('')

const currentIndex = computed(() =>
  portfolio.value ? allPortfolioItems.value.findIndex((item) => item.id === portfolio.value?.id) : -1
)
const previousProject = computed(() =>
  currentIndex.value > 0 ? allPortfolioItems.value[currentIndex.value - 1] : allPortfolioItems.value[allPortfolioItems.value.length - 1]
)
const nextProject = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < allPortfolioItems.value.length - 1
    ? allPortfolioItems.value[currentIndex.value + 1]
    : allPortfolioItems.value[0]
)

watch(
  [portfolio, isReady],
  ([item, ready]) => {
    if (!item && ready) {
      throw createError({ statusCode: 404, statusMessage: 'Portfolio item not found.' })
    }
    if (!item) return

    activeImage.value = item.images[0] || item.coverImage
    useSeoMeta({
      title: `${item.title} | WOOD STUDIO`,
      description: item.summary
    })
  },
  { immediate: true }
)

onMounted(() => {
  loadManagedItems()
  isReady.value = true
})

</script>

<template>
  <main v-if="portfolio" class="portfolio-detail-page">
    <section class="detail-hero">
      <div class="detail-hero-image">
        <img :src="activeImage || portfolio.coverImage" :alt="`${portfolio.title} hero image`">
      </div>

      <div class="detail-hero-copy">
        <p class="eyebrow">{{ portfolio.year }} / {{ categoryLabels[portfolio.category] }}</p>
        <h1>{{ portfolio.title }}</h1>
        <p>{{ portfolio.summary }}</p>
        <div class="detail-actions">
          <NuxtLink class="btn ghost" to="/#portfolio">
            <ArrowLeft :size="18" aria-hidden="true" />
            Back to Portfolio
          </NuxtLink>
          <NuxtLink class="btn primary" :to="`/portfolio/${nextProject.id}`">
            Next Project
            <ArrowRight :size="18" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="detail-content section">
      <aside class="project-facts" aria-label="Project information">
        <dl>
          <div>
            <dt><Calendar :size="15" aria-hidden="true" /> Year</dt>
            <dd>{{ portfolio.year }}</dd>
          </div>
          <div>
            <dt><Tag :size="15" aria-hidden="true" /> Category</dt>
            <dd>{{ categoryLabels[portfolio.category] }}</dd>
          </div>
          <div v-if="portfolio.period">
            <dt><Clock :size="15" aria-hidden="true" /> Period</dt>
            <dd>{{ portfolio.period }}</dd>
          </div>
          <div v-if="portfolio.location">
            <dt><MapPin :size="15" aria-hidden="true" /> Location</dt>
            <dd>{{ portfolio.location }}</dd>
          </div>
          <div v-if="portfolio.client">
            <dt><User :size="15" aria-hidden="true" /> Client</dt>
            <dd>{{ portfolio.client }}</dd>
          </div>
        </dl>

        <div class="detail-materials">
          <h2><Package :size="20" aria-hidden="true" /> Wood / Materials</h2>
          <div class="material-list">
            <span v-for="material in portfolio.materials" :key="material">{{ material }}</span>
          </div>
        </div>
      </aside>

      <article class="project-story">
        <p class="eyebrow">WORK NOTE</p>
        <h2>Project Description</h2>
        <p>{{ portfolio.description }}</p>
      </article>
    </section>

    <section class="detail-gallery section" aria-label="Image gallery">
      <div class="section-heading">
        <p class="eyebrow">GALLERY</p>
        <h2>Image Gallery</h2>
        <p>Select a thumbnail to update the main image. On mobile, thumbnails can be browsed horizontally.</p>
      </div>

      <div class="gallery-viewer">
        <img :src="activeImage || portfolio.coverImage" :alt="`${portfolio.title} selected image`">
      </div>

      <div class="detail-thumb-list" aria-label="Portfolio thumbnail list">
        <button
          v-for="(image, index) in portfolio.images"
          :key="image"
          type="button"
          :class="{ active: activeImage === image }"
          :aria-label="`View ${portfolio.title} image ${index + 1}`"
          @click="activeImage = image"
        >
          <img :src="image" :alt="`${portfolio.title} thumbnail ${index + 1}`">
        </button>
      </div>
    </section>

    <nav class="project-nav section" aria-label="Project navigation">
      <NuxtLink :to="`/portfolio/${previousProject.id}`">
        <span>Previous Project</span>
        <strong>{{ previousProject.title }}</strong>
      </NuxtLink>
      <NuxtLink class="project-nav-list" to="/#portfolio">
        <FolderOpen :size="18" aria-hidden="true" />
        Back to Portfolio
      </NuxtLink>
      <NuxtLink :to="`/portfolio/${nextProject.id}`">
        <span>Next Project</span>
        <strong>{{ nextProject.title }}</strong>
      </NuxtLink>
    </nav>
  </main>
</template>
