// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#4C2FE3",
          "primary-light-1": "#9965f4",
          "primary-light-2": "#9965f4",
          "primary-light-3": "#9965f4",
          "primary-2": "#021aee",
          secondary: "#EEEEEE",
          danger: "#B00020",
        },
      },
    },
  },
});
