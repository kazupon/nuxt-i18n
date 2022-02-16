import { resolveModule, addPluginTemplate, extendWebpackConfig, createResolver } from '@nuxt/kit'
import webpack from 'webpack'

import type { Nuxt } from '@nuxt/schema'

export async function setupNuxtBridge(nuxt: Nuxt) {
  const resolver = createResolver(import.meta.url)

  // resolve vue-i18n as vue-i18n-legacy
  nuxt.options.alias['vue-i18n'] = resolveModule('vue-i18n-legacy/dist/vue-i18n.esm.js', {
    paths: nuxt.options.modulesDir
  })
  nuxt.options.build.transpile.push('vue-i18n')

  // resolve vue-i18n-bridge as vue-i18n
  const vueI18nBridgePath = nuxt.options.dev
    ? 'vue-i18n-bridge/dist/vue-i18n-bridge.esm-bundler.js'
    : 'vue-i18n-bridge/dist/vue-i18n-bridge-runtime.esm-bundler.js'
  nuxt.options.alias['vue-i18n-bridge'] = resolveModule(vueI18nBridgePath, {
    paths: nuxt.options.modulesDir
  })
  nuxt.options.build.transpile.push('vue-i18n-bridge')

  const plugin = resolver.resolve('runtime/bridge.plugin.ts')
  addPluginTemplate(plugin)
  nuxt.options.build.transpile.push(plugin)

  extendWebpackConfig(config => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- `config.plugins` is safe, so it's assigned with nuxt!
    config.plugins!.push(
      new webpack.DefinePlugin({
        __VUE_I18N_FULL_INSTALL__: 'true',
        __VUE_I18N_LEGACY_API__: 'true',
        __INTLIFY_PROD_DEVTOOLS__: 'false'
      })
    )
  })
}
