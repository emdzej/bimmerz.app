# bimmerz.app

Product and documentation site for the **bimmerz** suite — `ediabasx`,
`inpax`, `ncsx`, `xbusx`, `tisx`, `etkx`, `wdsx`. Modern tooling and SDKs
for your old cars.

Built with [VitePress](https://vitepress.dev/). Auto-deploys to
[bimmerz.app](https://bimmerz.app) via GitHub Pages on every push to
`main`.

## Layout

```
docs/
├── .vitepress/
│   ├── config.ts          site config (nav, sidebar, head, footer)
│   └── theme/             custom VitePress theme — M-tricolour overrides
├── index.md               home (feature grid)
├── tools/
│   ├── index.md           overview + hosted vs self-hosted breakdown
│   └── <tool>/
│       ├── index.md       one-line "what it is", how to use it
│       ├── user.md        user-guide stub
│       └── developer.md   developer-guide stub
└── public/
    ├── CNAME              bimmerz.app — GitHub Pages apex binding
    └── icon.svg           favicon + hero logo
```

## Develop

```bash
pnpm install
pnpm dev                  # http://localhost:5173
pnpm build                # docs/.vitepress/dist
pnpm preview              # serve the built site locally
```

## Theme

Custom theme tints VitePress's default to the **BMW M tricolour**:

- M Light Blue (`#1c69d4`) — primary brand
- M Dark Blue (`#002664`) — accent / hover
- M Red (`#c41e3a`) — alt button / highlight

A 3-pixel M stripe is pinned to the top of every page via the
`layout-top` slot in `docs/.vitepress/theme/`. Light + dark backgrounds
shift toward cool blues so the M accent reads as of-a-piece.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds the site on every
push to `main` and publishes via `actions/deploy-pages`. The
`docs/public/CNAME` file binds the apex `bimmerz.app` to the published
site; configure the matching DNS A / AAAA records pointing at GitHub
Pages servers in your domain registrar.

## Content updates

Tool descriptions, hosting notes, and high-level overviews should match
each project's README. When a project's README changes substantively,
update the matching `docs/tools/<tool>/index.md` here too — content stays
hand-written rather than pulled because we want product-page framing,
not a README mirror.

## License

The same as the sibling projects — [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)
for the content; the tooling (VitePress, etc.) keeps its own.
