<script setup lang="ts">
const workshopLocation = {
  lat: 37.5665,
  lng: 126.978,
  address: '123 Example-ro, Example-gu, Seoul',
  name: 'WOOD STUDIO',
  phone: '010-0000-0000',
  email: 'woodstudio@example.com',
  hours: 'Mon-Sat 10:00 - 18:00'
}
</script>

<template>
  <section id="location" class="section location-section">
    <div class="section-heading">
      <p class="eyebrow">VISIT US</p>
      <h2>Workshop Location</h2>
      <p>Visits are by appointment. Contact us before stopping by and we will prepare wood samples and project references.</p>
    </div>

    <div class="location-layout">
      <div class="map-panel">
        <NaverMap :location="workshopLocation" />
      </div>

      <aside class="contact-panel">
        <h3>{{ workshopLocation.name }}</h3>
        <p>{{ workshopLocation.address }}</p>
        <dl>
          <div>
            <dt>Hours</dt>
            <dd>{{ workshopLocation.hours }}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd><a :href="`tel:${workshopLocation.phone}`">{{ workshopLocation.phone }}</a></dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a :href="`mailto:${workshopLocation.email}`">{{ workshopLocation.email }}</a></dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
</template>
