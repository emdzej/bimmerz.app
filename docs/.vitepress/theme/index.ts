import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import MStripe from "./MStripe.vue";
import NewsFeed from "./NewsFeed.vue";
import PostHeader from "./PostHeader.vue";
import "./custom.css";

const theme: Theme = {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-top": () => h(MStripe),
    }),
  enhanceApp({ app }) {
    app.component("NewsFeed", NewsFeed);
    app.component("PostHeader", PostHeader);
  },
};

export default theme;
