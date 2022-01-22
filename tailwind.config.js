module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minHeight: {
      '50': '50px',
      '70': '70px',
    },
    extend: {
      height: theme => ({
        "navScreen": "calc(100vh - 18vh)"
      }),
      padding: {
        '18': '4.5rem',
      },
      keyframes: {
        grow: {
          '0%': { 'max-height': '0px' },
          '100%': { 'max-height': '500px' },
        }
      },
      animation: {
        grow: 'grow 500ms ease-in-out'
      },
      colors: {
        peach: "#dea27a",
        sand: "#f7efe9"
      },
      dropShadow: {
        'img': '80px -80px 0 rgba(247, 239, 233, 0.8)',
        'imgInvert': '-80px -80px 0 rgba(247, 239, 233, 0.8)',
      },
      fontFamily: {
        didot: ['DidotLightItalic', 'sans-serif'],
        proxima: ['ProximaNovaLight', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
