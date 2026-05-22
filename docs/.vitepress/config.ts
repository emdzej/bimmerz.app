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

  themeConfig: {
    logo: {
      light: "/icon-light.svg",
      dark: "/icon-dark.svg",
      alt: "bimmerz",
    },

    nav: [{ text: "Tools", link: "/tools/" }],

    sidebar: {
      "/tools/": [
        { text: "Overview", link: "/tools/" },
        {
          text: "Diagnostic & coding",
          items: [
            toolEntry("ediabasx", "EDIABASX"),
            toolEntry("inpax", "INPAX"),
            toolEntry("ncsx", "NCSX"),
          ],
        },
        {
          text: "Bus & ECU",
          items: [toolEntry("xbusx", "XBUSX")],
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

    socialLinks: [{ icon: "github", link: "https://github.com/emdzej" }],

    footer: {
      message:
        "Most projects are <a href='https://polyformproject.org/licenses/noncommercial/1.0.0/'>PolyForm Noncommercial</a>; some are MIT — see each repo for the canonical licence.",
      copyright:
        "Not affiliated with BMW AG. Built by <a href='https://github.com/emdzej'>emdzej</a>.",
    },

    search: { provider: "local" },
  },
});
