import type { MetadataRoute } from "next";

import { siteUrl } from "@/data/seo";

/**
 * The site is a single document, so the sitemap holds one entry.
 *
 * Section anchors are deliberately absent: fragments are not separate URLs and
 * listing them invites a crawler to treat one page as nine.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
