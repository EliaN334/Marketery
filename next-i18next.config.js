/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    // localePath: typeof window === 'undefined'
    //   // eslint-disable-next-line
    //   ? require('path').resolve('./public/locales')
    //   : '/locales',
  },
}