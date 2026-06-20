<script setup lang="ts">
import { BookOpen, Clock, Globe, Mail, MapPin, Phone, Send } from '@lucide/vue'

const contactInfo = {
  phone: '010-0000-0000',
  email: 'woodstudio@example.com',
  hours: 'Mon-Sat 10:00 - 18:00',
  address: '123 Example-ro, Example-gu, Seoul',
  instagram: 'https://www.instagram.com/woodstudio',
  blog: 'https://blog.naver.com/woodstudio'
}

const form = reactive({
  name: '',
  contact: '',
  message: ''
})

const notice = ref('')

const submitInquiry = () => {
  notice.value = 'The inquiry feature is coming soon.'
}
</script>

<template>
  <section id="contact" class="section inquiry-section">
    <div class="section-heading">
      <p class="eyebrow">CONTACT</p>
      <h2>Contact</h2>
      <p>Leave a note for project consultation, estimates, or studio visits. Submission will be connected later.</p>
    </div>

    <div class="inquiry-layout">
      <aside class="inquiry-info">
        <h3>WOOD STUDIO</h3>
        <dl>
          <div>
            <dt><Phone :size="15" aria-hidden="true" /> Phone</dt>
            <dd><a :href="`tel:${contactInfo.phone}`">{{ contactInfo.phone }}</a></dd>
          </div>
          <div>
            <dt><Mail :size="15" aria-hidden="true" /> Email</dt>
            <dd><a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a></dd>
          </div>
          <div>
            <dt><Clock :size="15" aria-hidden="true" /> Hours</dt>
            <dd>{{ contactInfo.hours }}</dd>
          </div>
          <div>
            <dt><MapPin :size="15" aria-hidden="true" /> Address</dt>
            <dd>{{ contactInfo.address }}</dd>
          </div>
        </dl>
        <div class="social-links" aria-label="Social links">
          <a :href="contactInfo.instagram" target="_blank" rel="noreferrer">
            <Globe :size="16" aria-hidden="true" />
            Instagram
          </a>
          <a :href="contactInfo.blog" target="_blank" rel="noreferrer">
            <BookOpen :size="16" aria-hidden="true" />
            Blog
          </a>
        </div>
      </aside>

      <form class="inquiry-form" @submit.prevent="submitInquiry">
        <label>
          <span>Name</span>
          <input v-model="form.name" type="text" name="name" autocomplete="name" placeholder="Your name">
        </label>
        <label>
          <span>Contact</span>
          <input v-model="form.contact" type="text" name="contact" autocomplete="tel" placeholder="010-0000-0000">
        </label>
        <label>
          <span>Message</span>
          <textarea v-model="form.message" name="message" rows="6" placeholder="Tell us about the furniture or space you have in mind." />
        </label>
        <button class="btn primary" type="submit">
          Send Inquiry
          <Send :size="18" aria-hidden="true" />
        </button>
        <p v-if="notice" class="form-notice" role="status">{{ notice }}</p>
      </form>
    </div>
  </section>
</template>
