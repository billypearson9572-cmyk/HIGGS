import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const gradient = "linear-gradient(120deg, #8ae04b 0%, #34c7c9 50%, #1e8fe6 100%)";

// Embed the real brand assets so the share card matches the site.
const toDataUri = (file: string) =>
  `data:image/png;base64,${readFileSync(join(process.cwd(), "public", file)).toString("base64")}`;
const markSrc = toDataUri("voltara-mark.png");
const wordmarkSrc = toDataUri("voltara-wordmark.png");

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "80px",
          justifyContent: "space-between",
          backgroundColor: "#070b16",
          color: "#e9eef7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={97} height={84} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmarkSrc} width={172} height={44} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <span style={{ fontSize: "70px", fontWeight: 800, lineHeight: 1.05, maxWidth: "920px" }}>
            Grow beyond word-of-mouth.
          </span>
          <span style={{ fontSize: "30px", color: "#93a3c0", maxWidth: "840px" }}>
            Social media marketing &amp; AI automation for growing businesses.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            height: "10px",
            width: "260px",
            borderRadius: "9999px",
            backgroundImage: gradient,
          }}
        />
      </div>
    ),
    size,
  );
}
