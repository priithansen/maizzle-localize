const i18next = require('i18next')

/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

module.exports = {
  lang: 'en', // Use as fallback if nothing specified with env
  t: i18next.t, // Make i18next translate function available in templates as page.t()
  build: {
    templates: {
      source: 'src/templates',
      destination: {
        path: 'build_local',
      },
      assets: {
        source: 'src/images',
        destination: 'images',
      },
    },
  },
  events: {
    beforeCreate: async (config) => {
      const fallbackLng = config.lang

      if (process.env.MAIZZLE_TEMPLATE_LANG) {
        config = Object.assign(config, { 
          lang: process.env.MAIZZLE_TEMPLATE_LANG 
        })
      }

      // Await is important here to not let build advance and start using page.t() before i18next has finished initializing.
      await i18next.init({
        lng: config.lang,
        fallbackLng,
        debug: false,
        resources: { // Inlined just to simplify example.
          en: {
            translation: {
              "hello": "Hello {{name}}!",
            },
          },
          et: {
            translation: {
              "hello": "Tere {{name}}!",
            },
          },
        },
      })
    },
  },
}
