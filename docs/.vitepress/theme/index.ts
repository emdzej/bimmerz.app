import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import MStripe from "./MStripe.vue";
import NewsFeed from "./NewsFeed.vue";
import PostHeader from "./PostHeader.vue";
import "./custom.css";

/** Renders each ```elmo block (see config.ts) to SVG; elmo loads only on pages that have one. */
async function renderElmo(): Promise<void> {
  const hosts = Array.from(document.querySelectorAll<HTMLElement>(".elmo-diagram[data-elmo-src]:not([data-elmo-done])"));
  if (!hosts.length) return;
  const { render } = await import("@emdzej/elmo-core");
  await Promise.all(
    hosts.map(async (host) => {
      host.setAttribute("data-elmo-done", "1");
      const bytes = Uint8Array.from(atob(host.getAttribute("data-elmo-src") ?? ""), (c) => c.charCodeAt(0));
      try {
        host.innerHTML = (await render(new TextDecoder().decode(bytes))).svg;
      } catch (err) {
        host.textContent = `elmo: ${err instanceof Error ? err.message : String(err)}`;
      }
    }),
  );
}

const theme: Theme = {
  ...DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      "layout-top": () => h(MStripe),
    }),
  enhanceApp({ app, router }) {
    app.component("NewsFeed", NewsFeed);
    app.component("PostHeader", PostHeader);
    if (typeof window === "undefined") return;
    const rerender = () => window.setTimeout(renderElmo, 0);
    const prev = router.onAfterRouteChanged;
    router.onAfterRouteChanged = (to) => {
      prev?.(to);
      rerender();
    };
    rerender();
  },
};

export default theme;
