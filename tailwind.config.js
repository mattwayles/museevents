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
        "navScreen": "calc(100vh - 70px)"
      }),
      colors: {
        peach: "#fdd294"
      },
      dropShadow: {
        'img': '80px -80px 0 rgba(255, 237, 213, 0.8)',
        'imgInvert': '-80px -80px 0 rgba(255, 237, 213, 0.8)',
      },
      fontFamily: {
        didot: ['DidotLightItalic', 'sans-serif'],
        proxima: ['ProximaNovaLight', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
