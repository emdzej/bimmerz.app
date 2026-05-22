import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import MStripe from "./MStripe.vue";
import "./custom.css";

/**
 * Custom theme — wraps VitePress's default with a BMW M tricolour
 * stripe pinned across the top of every page. CSS overrides in
 * `custom.css` retint the brand variables to the M palette.
 */
const theme: Theme = {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-top": () => h(MStripe),
    }),
};

export default theme;
