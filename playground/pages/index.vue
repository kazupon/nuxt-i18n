<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#app'

import { useI18n, useLocalePath, useSwitchLocalePath, useLocaleHead, useBrowserLocale } from '#i18n'
import type { LocaleObject } from '#i18n'

const { t, locale, locales, localeProperties } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

console.log('useBrowserLocale', useBrowserLocale())
console.log('localeProperties', localeProperties)

const i18nHead = useLocaleHead({ addSeoAttributes: true })
useHead({
  titleTemplate: t('hello', { name: 'nuxt bridge' }),
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
})

function getLocaleName(code: string) {
  const locale = (locales.value as LocaleObject[]).find(i => i.code === code)
  return locale ? locale.name : code
}

const availableLocales = computed(() => {
  return (locales.value as LocaleObject[]).filter(i => i.code !== locale.value)
})
</script>

<template>
  <div>
    <h1>Demo: Nuxt 3</h1>
    <h2>{{ $t('hello', { name: 'nuxt3' }) }}</h2>
    <h2>Pages</h2>
    <nav>
      <NuxtLink :to="localePath('/')">Home</NuxtLink> |
      <NuxtLink :to="localePath('/about')">About</NuxtLink>
    </nav>
    <h2>Current Language: {{ getLocaleName(locale) }}</h2>
    <h2>Select Languages</h2>
    <nav>
      <span v-for="locale in availableLocales" :key="locale.code">
        <NuxtLink :to="switchLocalePath(locale.code) || ''">{{ locale.name }}</NuxtLink> |
      </span>
    </nav>
    <h2>I18n Head</h2>
    <div>
      <p>{{ i18nHead }}</p>
    </div>
  </div>
</template>
