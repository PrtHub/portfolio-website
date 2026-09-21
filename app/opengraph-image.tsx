import { ImageResponse } from "next/og";

import { headline, profile, seo } from "@/lib/content";

export const alt = `${profile.name} — ${seo.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f4f2ec",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontSize: "30px", color: "#171613" }}>{profile.name}</div>
          <div style={{ fontSize: "17px", letterSpacing: "0.18em", color: "#6f6c63" }}>
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "62px", lineHeight: 1.2, color: "#171613" }}>
          {headline.lead}
          <span style={{ color: "#5c5a52" }}>{headline.trail}</span>
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["#3f8f5f", "#a8781a", "#b85f3c", "#7f7565", "#2f8b99", "#74802e"].map((color) => (
            <div
              key={color}
              style={{ width: "13px", height: "13px", borderRadius: "999px", backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
