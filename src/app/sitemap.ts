import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://highlightcss.com/",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
  ];
}
