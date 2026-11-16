import type { MetadataRoute } from "next";
import { abs, IS_LIVE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!IS_LIVE) return { rules: { userAgent: "*", disallow: "/" } }; // domain belum live → jangan diindeks
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: abs("/sitemap.xml") };
}
