# SEO settings verification

Published Cloudflare Worker: `4d72e9c1-19d5-4069-9de0-67d02929226c`.

- Eleven tests, lint, TypeScript and production OpenNext build passed.
- Additive migration tested against exported production D1: existing rows and columns unchanged, foreign-key check clean. Remote migration and initial defaults applied successfully.
- Local editor tests passed publishing, unpublished draft isolation, media selection, invalid URL rejection and anonymous update rejection. Browser tested independent search/social copy, image/icon overrides, canonical/site URL overrides, verification token and global/per-page noindex. Disabling indexing retains public crawl access so engines can read noindex; sitemap excludes those pages.
- Seven live pages returned 200 with expected canonical URLs, search descriptions, Open Graph and Twitter tags and default indexing. Icons served 200, sitemap contained seven pages, robots linked the production sitemap, and WebSite/Organization schema appeared. Published SEO API values confirmed initialization; anonymous admin navigation required login.
- Chrome used for browser checks. External search/social previews and rankings were not tested; platforms can cache or rewrite metadata.

Editor instructions: [SEO editing guide](../../../seo-editing-guide.md).
