<script setup lang="ts">
import { ExternalLink, Map } from '@lucide/vue'

interface WorkshopLocation {
  lat: number
  lng: number
  address: string
  name: string
}

declare global {
  interface Window {
    naver?: {
      maps: {
        Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown
        LatLng: new (lat: number, lng: number) => unknown
        Marker: new (options: Record<string, unknown>) => unknown
      }
    }
  }
}

const props = withDefaults(
  defineProps<{
    location: WorkshopLocation
    zoom?: number
  }>(),
  {
    zoom: 16
  }
)

const config = useRuntimeConfig()
const mapEl = ref<HTMLElement | null>(null)
const isLoaded = ref(false)
const hasMapKey = computed(() => Boolean(config.public.naverMapClientId))

const naverMapUrl = computed(
  () => `https://map.naver.com/p/search/${encodeURIComponent(props.location.address)}`
)

const loadNaverMapScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.naver?.maps) {
      resolve()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-naver-map-script="true"]')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Naver map script failed to load')), {
        once: true
      })
      return
    }

    const script = document.createElement('script')
    script.dataset.naverMapScript = 'true'
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${config.public.naverMapClientId}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Naver map script failed to load'))
    document.head.appendChild(script)
  })
}

const createMap = async () => {
  if (!hasMapKey.value || !mapEl.value) return

  await loadNaverMapScript()

  if (!window.naver?.maps || !mapEl.value) return

  const position = new window.naver.maps.LatLng(props.location.lat, props.location.lng)
  const map = new window.naver.maps.Map(mapEl.value, {
    center: position,
    zoom: props.zoom
  })

  new window.naver.maps.Marker({
    position,
    map
  })

  isLoaded.value = true
}

onMounted(() => {
  createMap().catch(() => {
    isLoaded.value = false
  })
})
</script>

<template>
  <div class="naver-map-wrapper">
    <div v-if="hasMapKey" ref="mapEl" class="naver-map" :class="{ loaded: isLoaded }" />
    <div v-else class="map-fallback">
      <span><Map :size="18" aria-hidden="true" /> MAP</span>
      <strong>Map API key is not configured.</strong>
      <p>{{ location.address }}</p>
      <a :href="naverMapUrl" target="_blank" rel="noreferrer">
        View on Naver Map
        <ExternalLink :size="16" aria-hidden="true" />
      </a>
    </div>
  </div>
</template>
