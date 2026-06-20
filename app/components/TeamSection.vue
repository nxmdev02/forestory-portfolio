<script setup lang="ts">
import { teamMembers } from '~/data/team'

const failedImages = ref(new Set<string>())

const initials = (name: string) => name.slice(0, 1)

const hasImage = (name: string, image: string) => Boolean(image) && !failedImages.value.has(name)

const markImageFailed = (name: string) => {
  failedImages.value = new Set([...failedImages.value, name])
}
</script>

<template>
  <section id="team" class="section team-section">
    <div class="section-heading">
      <p class="eyebrow">CRAFT TEAM</p>
      <h2>Team</h2>
      <p>The people behind WOOD STUDIO, responsible for consultation, design, making, and installation.</p>
    </div>

    <div class="team-grid">
      <article v-for="member in teamMembers" :key="member.name" class="staff-card">
        <div class="staff-photo">
          <img
            v-if="hasImage(member.name, member.image)"
            :src="member.image"
            :alt="`${member.name} portrait`"
            @error="markImageFailed(member.name)"
          >
          <span v-else aria-hidden="true">{{ initials(member.name) }}</span>
        </div>
        <div class="staff-copy">
          <p>{{ member.role }}</p>
          <h3>{{ member.name }}</h3>
          <span>{{ member.bio }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
