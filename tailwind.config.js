module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
            
    "primary": "#F06328",
            
    "secondary": "#EE2739",
            
    "accent": "#214669",
            
    "neutral": "#0A1C31",
            
    "base-100": "#F8F9FA",
            
    "info": "#ABBCED",

            
    "success": "#50DCC7",
            
    "warning": "#F5CD4D",
            
    "error": "#333333",
            },
          },
        ],
    },
}
