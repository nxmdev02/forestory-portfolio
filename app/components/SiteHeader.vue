<script setup lang="ts">
import { BriefcaseBusiness, Clock, Home, Mail, MapPin, Menu, Users, X } from '@lucide/vue'

const sections = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'portfolio', label: 'Portfolio', icon: BriefcaseBusiness },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'contact', label: 'Contact', icon: Mail }
]

const route = useRoute()
const activeSection = ref('home')
const isOpen = ref(false)
let observer: IntersectionObserver | null = null

const scrollToElement = (id: string) => {
  if (!import.meta.client) return

  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}

const scrollToSection = async (id: string, event?: MouseEvent) => {
  event?.preventDefault()
  isOpen.value = false
  activeSection.value = id

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
    <a class="brand" href="#home" aria-label="Go to home" @click="scrollToSection('home', $event)">
      <span class="brand-mark">WS</span>
      <span class="brand-text">
        <strong>WOOD STUDIO</strong>
        <small>custom woodworking</small>
      </span>
    </a>

    <button
      class="menu-toggle"
      type="button"
      :aria-expanded="isOpen"
      aria-label="Open menu"
      @click="isOpen = !isOpen"
    >
      <X v-if="isOpen" :size="20" aria-hidden="true" />
      <Menu v-else :size="20" aria-hidden="true" />
    </button>

    <nav class="nav" :class="{ 'is-open': isOpen }" aria-label="Primary navigation">
      <a
        v-for="section in sections"
        :key="section.id"
        :href="`#${section.id}`"
        :class="{ active: route.path === '/' && activeSection === section.id }"
        @click="scrollToSection(section.id, $event)"
      >
        <component :is="section.icon" :size="16" aria-hidden="true" />
        {{ section.label }}
      </a>
    </nav>
  </header>
</template>
