import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";
import { seo } from "@/data/seo";
import { OG_COLORS } from "@/lib/constants";

export const alt = seo.ogImage.alt;
export const size = { width: seo.ogImage.width, height: seo.ogImage.height };
export const contentType = "image/png";

/**
 * The social card (SPEC §9), generated at build time from `data/seo.ts` and
 * `data/profile.ts` — no copy is written here.
 *
 * Satori supports a narrow subset of CSS and resolves no custom properties, so
 * this file is styled inline against `OG_COLORS` rather than with the token
 * layer. It is deliberately the same composition as the hero: eyebrow rule,
 * name, positioning line, then a muted metadata row.
 */
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
          backgroundColor: OG_COLORS.surface,
          padding: 80,
        }}
      >
        {/* One ambient orb, echoing the site background. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -200,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: `radial-gradient(circle at center, ${OG_COLORS.accentGlow} 0%, transparent 70%)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: `1px solid ${OG_COLORS.border}`,
              backgroundColor: OG_COLORS.raised,
              color: OG_COLORS.primary,
              fontSize: 26,
            }}
          >
            {profile.monogram}
          </div>
          <div
            style={{
              display: "flex",
              color: OG_COLORS.tertiary,
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {seo.ogImage.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              color: OG_COLORS.primary,
              fontSize: 76,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              color: OG_COLORS.secondary,
              fontSize: 32,
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 3,
              backgroundColor: OG_COLORS.accent,
            }}
          />
          <div style={{ display: "flex", color: OG_COLORS.tertiary, fontSize: 24 }}>
            {profile.location}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
