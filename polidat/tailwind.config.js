const colors = require('tailwindcss/colors');
module.exports = {
  theme: {
    extend: {
      colors: {
        teal: colors.red,
        cyan: colors.white
      }
    }
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ]
}
