/**
 * Copied from https://github.com/vuejs/vuepress/blob/38e98634af117f83b6a32c8ff42488d91b66f663/packages/%40vuepress/shared-utils/src/slugify.ts
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2018-present, Yuxi (Evan) You
 */

const rControl = /[\u0000-\u001f]/g // eslint-disable-line no-control-regex
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’–—<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

export function slugify(str: string) {
  return str
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()
}

/**
 * camelCase to kebabCase
 *
 * 'aaBbCc' -> 'aa-bb-cc'
 *
 * @param str
 * @returns
 */
export function camel2Kebab(str: string) {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}
