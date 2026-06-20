<script setup lang="ts">
import { Edit3, ImagePlus, Plus, Save, Trash2 } from '@lucide/vue'
import { categoryLabels } from '~/data/studio'
import type { PortfolioCategory, PortfolioItem } from '~/types/portfolio'

const emptyForm = () => ({
  id: '',
  title: '',
  year: new Date().getFullYear(),
  category: 'furniture' as PortfolioCategory,
  summary: '',
  description: '',
  client: '',
  location: '',
  period: '',
  coverImage: '',
  imagesText: '',
  materialsText: ''
})

const form = reactive(emptyForm())
const notice = ref('')
const uploadedImages = ref<string[]>([])
const editingId = ref('')
const { managedItems, loadManagedItems, saveManagedItem, deleteManagedItem } = usePortfolioStore()

const categories = Object.entries(categoryLabels) as Array<[PortfolioCategory, string]>

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const splitLines = (value: string) =>
  value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)

const resetForm = () => {
  Object.assign(form, emptyForm())
  uploadedImages.value = []
  editingId.value = ''
}

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

const onImageFilesChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files ?? [])
  if (!files.length) return

  const images = await Promise.all(files.map(readFileAsDataUrl))
  uploadedImages.value.push(...images)
  input.value = ''
}

const buildItem = (): PortfolioItem => {
  const typedImages = splitLines(form.imagesText)
  const images = [...new Set([...typedImages, ...uploadedImages.value])]
  const coverImage = form.coverImage.trim() || images[0] || '/images/placeholder-workshop.jpg'
  const idBase = form.id.trim() || `${slugify(form.title)}-${form.year}`

  return {
    id: idBase,
    title: form.title.trim(),
    year: Number(form.year),
    category: form.category,
    summary: form.summary.trim(),
    description: form.description.trim(),
    client: form.client.trim() || undefined,
    location: form.location.trim() || undefined,
    period: form.period.trim() || undefined,
    coverImage,
    images: images.length ? images : [coverImage],
    materials: splitLines(form.materialsText)
  }
}

const saveItem = () => {
  const item = buildItem()

  if (!item.title || !item.summary || !item.description) {
    notice.value = 'Title, summary, and description are required.'
    return
  }

  if (!item.id) {
    notice.value = 'Please enter a title that can be used for a URL.'
    return
  }

  saveManagedItem(item)
  notice.value = editingId.value ? 'Portfolio item updated.' : 'Portfolio item saved.'
  resetForm()
}

const editItem = (item: PortfolioItem) => {
  editingId.value = item.id
  Object.assign(form, {
    id: item.id,
    title: item.title,
    year: item.year,
    category: item.category,
    summary: item.summary,
    description: item.description,
    client: item.client ?? '',
    location: item.location ?? '',
    period: item.period ?? '',
    coverImage: item.coverImage,
    imagesText: item.images.filter((image) => !image.startsWith('data:')).join('\n'),
    materialsText: item.materials.join('\n')
  })
  uploadedImages.value = item.images.filter((image) => image.startsWith('data:'))
  notice.value = `Editing ${item.title}.`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const removeItem = (id: string) => {
  deleteManagedItem(id)
  if (editingId.value === id) resetForm()
  notice.value = 'Portfolio item deleted.'
}

onMounted(() => loadManagedItems())

useSeoMeta({
  title: 'Portfolio Admin | WOOD STUDIO',
  description: 'Create and manage local portfolio entries for WOOD STUDIO.'
})
</script>

<template>
  <main class="admin-page">
    <section class="admin-hero">
      <p class="eyebrow">ADMIN</p>
      <h1>Portfolio Manager</h1>
      <p>Add portfolio projects without editing TypeScript data files. Saved items are stored in this browser.</p>
      <NuxtLink class="btn ghost" to="/#portfolio">Back to Site</NuxtLink>
    </section>

    <section class="admin-layout">
      <form class="admin-form" @submit.prevent="saveItem">
        <div class="admin-form-heading">
          <h2>{{ editingId ? 'Edit Portfolio' : 'New Portfolio' }}</h2>
          <button class="btn ghost" type="button" @click="resetForm">
            <Plus :size="18" aria-hidden="true" />
            New
          </button>
        </div>

        <label>
          <span>Project Title *</span>
          <input v-model="form.title" type="text" placeholder="Walnut Library Wall">
        </label>

        <div class="admin-form-grid">
          <label>
            <span>Year</span>
            <input v-model.number="form.year" type="number" min="2000" max="2100">
          </label>
          <label>
            <span>Category</span>
            <select v-model="form.category">
              <option v-for="[value, label] in categories" :key="value" :value="value">{{ label }}</option>
            </select>
          </label>
        </div>

        <label>
          <span>Custom URL ID</span>
          <input v-model="form.id" type="text" placeholder="Auto-created from title if empty">
        </label>

        <label>
          <span>Summary *</span>
          <textarea v-model="form.summary" rows="3" placeholder="Short text shown on the folder card." />
        </label>

        <label>
          <span>Description *</span>
          <textarea v-model="form.description" rows="7" placeholder="Detailed project story shown on the detail page." />
        </label>

        <div class="admin-form-grid">
          <label>
            <span>Client</span>
            <input v-model="form.client" type="text" placeholder="Private Client">
          </label>
          <label>
            <span>Period</span>
            <input v-model="form.period" type="text" placeholder="Mar 2026 - May 2026">
          </label>
        </div>

        <label>
          <span>Location</span>
          <input v-model="form.location" type="text" placeholder="Seoul, Seongdong-gu">
        </label>

        <label>
          <span>Materials</span>
          <textarea v-model="form.materialsText" rows="4" placeholder="Walnut&#10;Natural Oil&#10;Brass Pulls" />
        </label>

        <label>
          <span>Cover Image URL</span>
          <input v-model="form.coverImage" type="text" placeholder="/images/your-cover.jpg or https://...">
        </label>

        <label>
          <span>Gallery Image URLs</span>
          <textarea v-model="form.imagesText" rows="5" placeholder="/images/detail-01.jpg&#10;/images/detail-02.jpg" />
        </label>

        <label class="admin-file-drop">
          <ImagePlus :size="22" aria-hidden="true" />
          <span>Upload Gallery Photos</span>
          <small>Images are stored in this browser for now.</small>
          <input type="file" accept="image/*" multiple @change="onImageFilesChange">
        </label>

        <div v-if="uploadedImages.length" class="admin-upload-preview">
          <img v-for="image in uploadedImages" :key="image" :src="image" alt="Uploaded preview">
        </div>

        <button class="btn primary" type="submit">
          <Save :size="18" aria-hidden="true" />
          Save Portfolio
        </button>

        <p v-if="notice" class="form-notice" role="status">{{ notice }}</p>
      </form>

      <aside class="admin-list">
        <div class="admin-form-heading">
          <h2>Saved Items</h2>
          <span>{{ managedItems.length }} local items</span>
        </div>

        <p v-if="!managedItems.length" class="admin-empty">No local portfolio items yet.</p>

        <article v-for="item in managedItems" :key="item.id" class="admin-list-item">
          <img :src="item.coverImage" :alt="`${item.title} cover`">
          <div>
            <span>{{ item.year }} / {{ categoryLabels[item.category] }}</span>
            <strong>{{ item.title }}</strong>
            <small>/portfolio/{{ item.id }}</small>
          </div>
          <div class="admin-list-actions">
            <button type="button" aria-label="Edit portfolio item" @click="editItem(item)">
              <Edit3 :size="16" aria-hidden="true" />
            </button>
            <button type="button" aria-label="Delete portfolio item" @click="removeItem(item.id)">
              <Trash2 :size="16" aria-hidden="true" />
            </button>
          </div>
        </article>
      </aside>
    </section>
  </main>
</template>
