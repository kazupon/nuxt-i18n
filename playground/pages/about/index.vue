<script lang="ts">
import { defineComponent } from 'vue'
import type { ExportedGlobalComposer, LocaleObject } from '#i18n'

export default defineComponent({
  mounted() {
    console.log('mounted', this.$i18n)
    console.log('$i18n.getBrowserLocale', this.$i18n.getBrowserLocale())
    console.log('$i18n.getLocaleCookie', this.$i18n.getLocaleCookie())
    console.log('$i18n.localeProperties', this.$i18n.localeProperties)
  },
  computed: {
    switchableLocale() {
      const i18n = this.$i18n as ExportedGlobalComposer
      const _locales = (i18n.locales as LocaleObject[]).filter(i => i.code !== this.$i18n.locale)
      return _locales.length !== 0 ? _locales[0] : { code: 'ja', name: '日本語' }
    }
  },
  setup() {
    useHead({
      meta: [{ property: 'og:title', content: 'this is og title' }]
    })
    return {}
  }
})
</script>

<script setup lang="ts">
definePageMeta({
  title: 'pages.title.about'
})
</script>

<template>
  <div>
    <nav>
      <NuxtLink :to="localePath('/')">Back to Home</NuxtLink>
    </nav>
    <p>hello</p>
    <p>{{ switchableLocale }}</p>
    <p>{{ localeHead({ addSeoAttributes: true }) }}</p>
  </div>
</template>
