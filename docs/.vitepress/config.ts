import { defineConfig } from "vitepress";

/**
 * Product + docs site for the bimmerz suite. Each tool lives in its
 * own GitHub repo; this site is the marketing + entry-point landing.
 *
 * - `base` defaults to "/" because the site lives at the apex
 *   `bimmerz.app` domain (CNAME in docs/public). For preview deploys
 *   under a sub-path, override with `VITEPRESS_BASE=/some/path/`.
 */
const base = process.env.VITEPRESS_BASE ?? "/";

const toolEntry = (slug: string, label: string) => ({
  text: label,
  items: [
    { text: "Overview", link: `/tools/${slug}/` },
    { text: "User guide", link: `/tools/${slug}/user` },
    { text: "Developer guide", link: `/tools/${slug}/developer` },
  ],
  collapsed: true,
});

export default defineConfig({
  base,
  title: "bimmerz",
  description:
    "Modern tooling and SDKs for your old cars — open-source replacements for BMW's diagnostic and coding software.",
  cleanUrls: true,
  lastUpdated: false,
  head: [
    ["link", { rel: "icon", href: `${base}icon.svg`, type: "image/svg+xml" }],
    ["meta", { name: "theme-color", content: "#1c69d4" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "bimmerz — modern tooling for old cars" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Open-source diagnostic, coding, and documentation tools for classic BMWs. Runs in your browser, no installer, no admin rights.",
      },
    ],
  ],

  // ```elmo fences: schematics as code (https://elmo.emdzej.pl). The source
  // goes base64 into a data attribute (survives Vue's HTML escaping); the
  // theme renders it to SVG in the browser, as elmo's own docs do.
  markdown: {
    config(md) {
      const fence = md.renderer.rules.fence!;
      md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
        const token = tokens[idx];
        if (token?.info.trim().split(/\s+/)[0] !== "elmo") return fence(tokens, idx, opts, env, self);
        const b64 = Buffer.from(token.content, "utf8").toString("base64");
        token.info = "text";
        const source = fence(tokens, idx, opts, env, self);
        token.info = "elmo";
        return `<div class="elmo-schematic"><div class="elmo-diagram" data-elmo-src="${b64}"></div><a class="elmo-badge" href="https://elmo.emdzej.pl/" target="_blank" rel="noopener" title="Drawn with elmo: schematics as code"><img src="/elmo-icon.svg" alt="elmo"></a><details><summary>elmo source</summary>${source}</details></div>\n`;
      };
    },
  },
  themeConfig: {
    logo: {
      light: "/icon-light.svg",
      dark: "/icon-dark.svg",
      alt: "bimmerz",
    },

    nav: [
      { text: "Hub", link: "https://hub.bimmerz.app" },
      { text: "Tools", link: "/tools/" },
      { text: "News", link: "/news/" },
      { text: "Credits", link: "/credits" },
      { text: "Support", link: "/support" },
    ],

    sidebar: {
      "/tools/": [
        { text: "Overview", link: "/tools/" },
        {
          text: "Diagnostic & coding",
          items: [
            toolEntry("ediabasx", "EDIABASX"),
            toolEntry("inpax", "INPAX"),
            toolEntry("ncsx", "NCSX"),
            toolEntry("nfsx", "NFSX"),
            toolEntry("tunex", "TUNEX"),
          ],
        },
        {
          text: "Bus & ECU",
          items: [toolEntry("xbusx", "XBUSX")],
        },
        {
          text: "Head unit",
          items: [
            {
              text: "NAVX",
              items: [
                { text: "Overview", link: "/tools/navx/" },
                { text: "User guide", link: "/tools/navx/user" },
                { text: "Car functions (carbus)", link: "/tools/navx/carbus" },
                { text: "New firmware", link: "/tools/navx/shell" },
                { text: "NavX Link (DIY)", link: "/tools/navx/link" },
                { text: "Developer guide", link: "/tools/navx/developer" },
                { text: "SDK documentation ↗", link: "https://sdk.navx.bimmerz.app" },
                { text: "Support privacy", link: "/privacy" },
              ],
              collapsed: true,
            },
          ],
        },
        {
          text: "Aftersales support",
          items: [
            toolEntry("tisx", "TISX"),
            toolEntry("etkx", "ETKX"),
            toolEntry("wdsx", "WDSX"),
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "discord", link: "https://discord.gg/c5b4UqeY" },
      { icon: "github", link: "https://github.com/emdzej" },
      { icon: "youtube", link: "https://www.youtube.com/playlist?list=PLXkFtaaluwls", ariaLabel: "Bimmerz videos on YouTube" },
    ],

    footer: {
      message:
        "Most projects are <a href='https://polyformproject.org/licenses/noncommercial/1.0.0/'>PolyForm Noncommercial</a>; some are MIT — see each repo for the canonical licence.",
      copyright:
        "Not affiliated with BMW AG. Built by <a href='https://emdzej.pl'>Michał Jaskólski</a>. <a href='/privacy'>Support privacy</a>",
    },

    search: { provider: "local" },
  },
});
