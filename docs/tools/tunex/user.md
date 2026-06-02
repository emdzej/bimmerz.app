# TUNEX — user guide

> This guide is a stub. Content is coming as the docs settle.

Things this guide will cover:

- Loading a firmware `.bin` and what stays on disk vs. in the browser.
- The RAW hex editor — cursor nav, jump-to-offset, the interpretation
  panel, edit-as-type, and the contents-column modes (ASCII / u8 /
  u16 / i16 / u32 / i32, plus bars view).
- Inline hex-pair editing — `FF AA CC…`, `Enter` accepts, `Esc` cancels.
- Bookmarks — naming offsets, organising them into folders, exporting.
- The Structured editor — picking a TunerPro `.xdf`, the category
  tree, search-as-you-type filter.
- Constants, flags, and patches — read values, write values, apply or
  revert patches (including the "virginise" flow).
- Tables — grid editing, dec/hex toggle, heatmap view, axis labels.
- The hex view ↔ structured editor cross-link, and the "Jump 0x… →"
  shortcut.
- Saving the modified binary back to disk.

In the meantime, the [project README](https://github.com/emdzej/tunex)
walks the basic load → edit → save flow.
