<script setup lang="ts">
import { Mail, MapPin, Phone } from '@lucide/vue'

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'History', href: '#history' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' }
]
</script>

<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <NuxtPage />
    <footer class="site-footer">
      <div class="footer-brand-row">
        <strong>WOOD STUDIO</strong>
        <span>Custom woodwork for warm, lasting interiors</span>
        <a class="footer-cta" href="#contact">Contact Us</a>
      </div>

      <div class="footer-grid">
        <div>
          <h2>Company</h2>
          <p>Handcrafted furniture and built-in wood interiors, planned from material samples to final installation.</p>
          <span>Mon-Sat 10:00 - 18:00</span>
        </div>

        <div>
          <h2>Contact</h2>
          <a href="tel:010-0000-0000">
            <Phone :size="16" aria-hidden="true" />
            010-0000-0000
          </a>
          <a href="mailto:woodstudio@example.com">
            <Mail :size="16" aria-hidden="true" />
            woodstudio@example.com
          </a>
          <span>
            <MapPin :size="16" aria-hidden="true" />
            123 Example-ro, Example-gu, Seoul
          </span>
        </div>

        <div>
          <h2>Sitemap</h2>
          <a v-for="link in footerLinks" :key="link.href" :href="link.href">{{ link.label }}</a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 WOOD STUDIO. All rights reserved.</span>
        <span>Crafted with Nuxt 4</span>
      </div>
    </footer>
  </div>
</template>
