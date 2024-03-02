module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      height:{
        screen:'100vh',
        screen:'100svh'
      },
      backgroundImage: {
				fade: "url(/images/main_web/bg_fade.jpg)",
			},
      colors: {
				primary: "#090d16",
				secondary: "#cccccc",
				third: "#10B981",
				//fourth: "#4C1D95",
				fourth: "#320f69",
        error: "#EF4444",
        success: "#10B981",
        info: "#4C1D95"
			},
      transitionDuration: {
        '10000': '10000ms',
      },
      boxShadow: {
        'third': '0px -1px 12px -4px rgba(10,133,92,1)',
        'red': '0px -1px 12px -4px rgba(248,113,113,1)'
      }
    },
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/typography")
  ],
  daisyui: {
    styled: true,
    // TODO: Theme needs works
    themes: [
      {
        'pickle': {                          /* your theme name */
          fontFamily: {
          },
          'primary': '#090d16',           /* Primary color */
          'primary-focus': '#090d16',     /* Primary color - focused */
          'primary-content': '#ffffff',   /* Foreground content color to use on primary color */

          'secondary': '#fff',         /* Secondary color */
          'secondary-focus': '#fff',   /* Secondary color - focused */
          'secondary-content': '#000', /* Foreground content color to use on secondary color */

          'accent': '#10B981',            /* Accent color */
          'accent-focus': '#10B981',      /* Accent color - focused */
          'accent-content': '#ffffff',    /* Foreground content color to use on accent color */

          'neutral': '#4C1D95',           /* Neutral color */
          'neutral-focus': '#4C1D95',     /* Neutral color - focused */
          'neutral-content': '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100': '#090d16',          /* Base color of page, used for blank backgrounds */
          'base-200': '#35363a',          /* Base color, a little darker */
          'base-300': '#222222',          /* Base color, even more darker */
          'base-content': '#fff',      /* Foreground content color to use on base color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
        },
      },
      // backup themes:
      // 'dark',
      // 'synthwave'
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}