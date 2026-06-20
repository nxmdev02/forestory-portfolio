<script setup lang="ts">
import { categoryLabels, portfolioItems } from '~/data/studio'

const route = useRoute()
const router = useRouter()

const portfolio = computed(() => portfolioItems.find((item) => item.id === route.params.id))
const activeImage = ref('')

const currentIndex = computed(() =>
  portfolio.value ? portfolioItems.findIndex((item) => item.id === portfolio.value?.id) : -1
)
const previousProject = computed(() =>
  currentIndex.value > 0 ? portfolioItems[currentIndex.value - 1] : portfolioItems[portfolioItems.length - 1]
)
const nextProject = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < portfolioItems.length - 1
    ? portfolioItems[currentIndex.value + 1]
    : portfolioItems[0]
)

watch(
  portfolio,
  (item) => {
    if (!item) {
      throw createError({ statusCode: 404, statusMessage: 'Portfolio item not found.' })
    }
    activeImage.value = item.images[0] || item.coverImage
    useSeoMeta({
      title: `${item.title} | WOOD STUDIO`,
      description: item.summary
    })
  },
  { immediate: true }
)

const backToList = async () => {
  await router.push({ path: '/', hash: '#portfolio' })
}
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
          <button class="btn ghost" type="button" @click="backToList">Back to Portfolio</button>
          <NuxtLink class="btn primary" :to="`/portfolio/${nextProject.id}`">Next Project</NuxtLink>
        </div>
      </div>
    </section>

    <section class="detail-content section">
      <aside class="project-facts" aria-label="Project information">
        <dl>
          <div>
            <dt>Year</dt>
            <dd>{{ portfolio.year }}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{{ categoryLabels[portfolio.category] }}</dd>
          </div>
          <div v-if="portfolio.period">
            <dt>Period</dt>
            <dd>{{ portfolio.period }}</dd>
          </div>
          <div v-if="portfolio.location">
            <dt>Location</dt>
            <dd>{{ portfolio.location }}</dd>
          </div>
          <div v-if="portfolio.client">
            <dt>Client</dt>
            <dd>{{ portfolio.client }}</dd>
          </div>
        </dl>

        <div class="detail-materials">
          <h2>Wood / Materials</h2>
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
      <button type="button" @click="backToList">Back to Portfolio</button>
      <NuxtLink :to="`/portfolio/${nextProject.id}`">
        <span>Next Project</span>
        <strong>{{ nextProject.title }}</strong>
      </NuxtLink>
    </nav>
  </main>
</template>
