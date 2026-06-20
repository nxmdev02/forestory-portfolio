<script setup lang="ts">
const sections = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'history', label: 'History' },
  { id: 'team', label: 'Team' },
  { id: 'location', label: 'Location' },
  { id: 'contact', label: 'Contact' }
]

const route = useRoute()
const activeSection = ref('home')
const isOpen = ref(false)
let observer: IntersectionObserver | null = null

const scrollToElement = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const scrollToSection = async (id: string) => {
  isOpen.value = false

  if (route.path !== '/') {
    await navigateTo({ path: '/', hash: `#${id}` })
    window.setTimeout(() => scrollToElement(id), 80)
    return
  }

  scrollToElement(id)
}

const setupObserver = () => {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (visible?.target.id) {
        activeSection.value = visible.target.id
      }
    },
    {
      rootMargin: '-24% 0px -58% 0px',
      threshold: [0.08, 0.2, 0.4, 0.6]
    }
  )

  sections.forEach((section) => {
    const el = document.getElementById(section.id)
    if (el) observer?.observe(el)
  })
}

onMounted(() => {
  setupObserver()
  if (route.hash) {
    window.setTimeout(() => scrollToElement(route.hash.replace('#', '')), 80)
  }
})

watch(
  () => route.fullPath,
  () => {
    window.setTimeout(() => {
      setupObserver()
      if (route.hash) scrollToElement(route.hash.replace('#', ''))
    }, 80)
  }
)

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <header class="site-header">
    <button class="brand" type="button" aria-label="Go to home" @click="scrollToSection('home')">
      <span class="brand-mark">WS</span>
      <span class="brand-text">
        <strong>WOOD STUDIO</strong>
        <small>custom woodworking</small>
      </span>
    </button>

    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="isOpen"
      aria-label="Open menu"
      @click="isOpen = !isOpen"
    >
      <span />
      <span />
      <span />
    </button>

    <nav class="nav" :class="{ 'is-open': isOpen }" aria-label="Primary navigation">
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        :class="{ active: route.path === '/' && activeSection === section.id }"
        @click="scrollToSection(section.id)"
      >
        {{ section.label }}
      </button>
    </nav>
  </header>
</template>
