import { resolveModule, addPluginTemplate, createResolver } from '@nuxt/kit'

import type { Nuxt } from '@nuxt/schema'

export async function setupNuxt3(nuxt: Nuxt) {
  const resolver = createResolver(import.meta.url)

  // resolve vue-i18n
  const vueI18nPath = nuxt.options.dev
    ? 'vue-i18n/dist/vue-i18n.esm-bundler.js'
    : 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
  nuxt.options.alias['vue-i18n'] = resolveModule(vueI18nPath, {
    paths: nuxt.options.modulesDir
  })
  nuxt.options.build.transpile.push('vue-i18n')

  const plugin = resolver.resolve('runtime/nuxt3.plugin.ts')
  addPluginTemplate(plugin)
  nuxt.options.build.transpile.push(plugin)
}
