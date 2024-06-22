import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.highlightcss.com/",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 1,
    },
  ];
}
