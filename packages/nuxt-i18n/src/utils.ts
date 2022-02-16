import { resolveFiles } from '@nuxt/kit'
import { parse } from 'pathe'
import { isString } from '@intlify/shared'

import type { LocaleObject } from 'vue-i18n-routing'
import type { NuxtI18nOptions, LocaleInfo } from './types'

export function getNormalizedLocales(locales: NuxtI18nOptions['locales']): LocaleObject[] {
  locales = locales || []
  const normalized: LocaleObject[] = []
  for (const locale of locales) {
    if (isString(locale)) {
      normalized.push({ code: locale })
    } else {
      normalized.push(locale)
    }
  }
  return normalized
}

export async function resolveLocales(path: string, locales: LocaleObject[]): Promise<LocaleInfo[]> {
  const files = await resolveFiles(path, '**/*{json,json5,yaml,yml}')
  return files.map(file => {
    const parsed = parse(file)
    const locale = findLocales(locales, parsed.base)
    return locale === undefined
      ? {
          path: file,
          file: parsed.base,
          code: parsed.name
        }
      : Object.assign({ path: file }, locale)
  })
}

function findLocales(locales: LocaleObject[], filename: string) {
  return locales.find((locale: string | LocaleObject) => locale.file === filename)
}
