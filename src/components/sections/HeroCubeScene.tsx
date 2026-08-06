"use client";

import { Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { heroCubeConfig as config } from "@/data/heroCubeConfig";
import { heroCubeContent } from "@/data/heroCubeContent";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DESKTOP_QUERY } from "@/lib/constants";
import type { HeroCubeFace } from "@/types";

/** Glyph texture resolution. Square, power of two, plenty for a 2-3 character mark. */
const GLYPH_TEXTURE_SIZE = 512;
const GLYPH_FONT_RATIO = 0.42;

/** Lifts the glyph off the cube body so the two never z-fight. */
const GLYPH_OFFSET = 0.004;

type Vec3 = readonly [number, number, number];

/**
 * Face transforms, in the order the content file lists them: front, back,
 * right, left, top, bottom. Unitless — each is scaled by `cubeSize` at use.
 */
const FACE_TRANSFORMS: readonly { position: Vec3; rotation: Vec3 }[] = [
  { position: [0, 0, 0.5], rotation: [0, 0, 0] },
  { position: [0, 0, -0.5], rotation: [0, Math.PI, 0] },
  { position: [0.5, 0, 0], rotation: [0, Math.PI / 2, 0] },
  { position: [-0.5, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  { position: [0, 0.5, 0], rotation: [-Math.PI / 2, 0, 0] },
  { position: [0, -0.5, 0], rotation: [Math.PI / 2, 0, 0] },
];

/**
 * The site's own mono stack, read off the document rather than restated here,
 * so the cube's glyphs are the typeface the rest of the page uses. Falls back
 * to a generic mono stack if the variable has not resolved yet.
 */
function monoFontStack(): string {
  if (typeof window === "undefined") {
    return "ui-monospace, monospace";
  }

  const resolved = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--font-mono")
    .trim();

  return resolved === "" ? "ui-monospace, monospace" : resolved;
}

function createGlyphTexture(symbol: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = GLYPH_TEXTURE_SIZE;
  canvas.height = GLYPH_TEXTURE_SIZE;

  const context = canvas.getContext("2d");

  if (context !== null) {
    context.clearRect(0, 0, GLYPH_TEXTURE_SIZE, GLYPH_TEXTURE_SIZE);
    context.font = `500 ${GLYPH_TEXTURE_SIZE * GLYPH_FONT_RATIO}px ${monoFontStack()}`;
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(symbol, GLYPH_TEXTURE_SIZE / 2, GLYPH_TEXTURE_SIZE / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** HDR overshoot: channels above 1 are what the bloom pass keys on. */
function emissive(color: string, gain: number): THREE.Color {
  return new THREE.Color(color).multiplyScalar(gain);
}

interface CubeFacesProps {
  readonly faces: readonly HeroCubeFace[];
}

/**
 * The six glyphs, each sitting just proud of the cube body.
 *
 * The body itself is a single solid box (see `CubeBody`) rather than six
 * translucent quads: a real, depth-writing volume is what hides the far side
 * and makes the thing read as an object instead of a bright shell. The glyphs
 * are drawn after it and are occluded by it, so only the faces turned toward
 * the camera show their mark.
 */
function CubeFaces({ faces }: CubeFacesProps) {
  const textures = useMemo(
    () =>
      faces.map((face) =>
        createGlyphTexture(face.symbol, face.color ?? config.edgeColor),
      ),
    [faces],
  );

  /* Canvas textures are created by hand, so they are disposed by hand. */
  useEffect(() => {
    return () => {
      for (const texture of textures) {
        texture.dispose();
      }
    };
  }, [textures]);

  return (
    <>
      {faces.map((face, index) => {
        const transform = FACE_TRANSFORMS[index];
        const texture = textures[index];

        if (transform === undefined || texture === undefined) {
          return null;
        }

        const position: Vec3 = [
          transform.position[0] * config.cubeSize,
          transform.position[1] * config.cubeSize,
          transform.position[2] * config.cubeSize,
        ];

        return (
          <group key={face.id} position={position} rotation={transform.rotation}>
            {/*
             * The hue comes from the texture; `color` only sets how hard it is
             * driven. `glyphGlow` is deliberately close to 1 — the multiplier
             * hits all three channels, so a large gain clips the brightest one
             * and every glyph collapses to white no matter what colour the
             * content file gave it. `toneMapped={false}` keeps the authored
             * luminance so the bloom pass still finds it.
             */}
            <mesh position={[0, 0, GLYPH_OFFSET]}>
              <planeGeometry args={[config.cubeSize, config.cubeSize]} />
              <meshBasicMaterial
                map={texture}
                color={emissive("#ffffff", config.glyphGlow)}
                transparent
                toneMapped={false}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

/**
 * The body. Dark, matte, and the only thing in the scene that writes depth.
 *
 * That depth write is deliberate and stays even now that the faces are
 * translucent: it is what hides the far edges and glyphs and keeps the cube
 * reading as an object. So `faceOpacity` controls how much of the *ambient glow
 * behind the cube* shows through a face — tinted glass — rather than exposing
 * the cube's own interior. Turning `depthWrite` off would show the back of the
 * cube through the front and put the washed-out shell straight back.
 */
function CubeBody() {
  return (
    <mesh>
      <boxGeometry args={[config.cubeSize, config.cubeSize, config.cubeSize]} />
      <meshBasicMaterial
        color={config.faceTint}
        transparent
        opacity={config.faceOpacity}
      />
    </mesh>
  );
}

/**
 * The wireframe.
 *
 * Drawn with drei's `Line` rather than `lineSegments`, because WebGL ignores
 * `LineBasicMaterial.linewidth` on every major platform — a raw line is always
 * one pixel, whatever you set. `Line` wraps `Line2`, which builds the stroke
 * from camera-facing quads and so honours `lineWidth` in real pixels.
 *
 * It owns its own geometry and material, so there is nothing here to dispose by
 * hand; the twelve edges are extracted once and handed over as plain points.
 */
function CubeEdges() {
  const points = useMemo<[number, number, number][]>(() => {
    const box = new THREE.BoxGeometry(
      config.cubeSize,
      config.cubeSize,
      config.cubeSize,
    );
    const edges = new THREE.EdgesGeometry(box);
    const position = edges.getAttribute("position");

    const extracted: [number, number, number][] = [];

    for (let index = 0; index < position.count; index += 1) {
      extracted.push([
        position.getX(index),
        position.getY(index),
        position.getZ(index),
      ]);
    }

    box.dispose();
    edges.dispose();
    return extracted;
  }, []);

  return (
    <Line
      points={points}
      /* The extracted points are vertex pairs, not one continuous path. */
      segments
      lineWidth={config.edgeWidth}
      color={emissive(config.edgeColor, config.edgeGlow)}
      transparent
      opacity={config.edgeOpacity}
      toneMapped={false}
    />
  );
}

interface ParticleFieldProps {
  readonly count: number;
}

/**
 * Particles streaming outward, as if the cube were shedding them.
 *
 * Each one keeps a fixed unit direction and a travelling radius; the frame loop
 * advances the radius and recycles anything past `particleSpread` back to the
 * cube's surface. Storing direction and radius separately — rather than
 * integrating the xyz positions — means a recycled particle returns to exactly
 * its own ray, so the field never degenerates into a blob.
 *
 * Speeds are jittered per particle so the stream breathes instead of pulsing in
 * lockstep rings.
 */
function ParticleField({ count }: ParticleFieldProps) {
  const inner = config.cubeSize * config.particleInnerRadius;

  const { geometry, directions, radii, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const dirs = new Float32Array(count * 3);
    const dist = new Float32Array(count);
    const rate = new Float32Array(count);

    for (let index = 0; index < count; index += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const dx = Math.sin(phi) * Math.cos(theta);
      const dy = Math.sin(phi) * Math.sin(theta);
      const dz = Math.cos(phi);

      dirs[index * 3] = dx;
      dirs[index * 3 + 1] = dy;
      dirs[index * 3 + 2] = dz;

      /* Seeded across the whole run so the stream starts mid-flight rather
         than as one shell leaving the cube together. */
      const radius = inner + Math.random() * (config.particleSpread - inner);
      dist[index] = radius;
      rate[index] = config.particleSpeed * (0.6 + Math.random() * 0.8);

      positions[index * 3] = dx * radius;
      positions[index * 3 + 1] = dy * radius;
      positions[index * 3 + 2] = dz * radius;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { geometry: buffer, directions: dirs, radii: dist, speeds: rate };
  }, [count, inner]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((_, delta) => {
    const attribute = geometry.getAttribute("position");
    const positions = attribute.array as Float32Array;

    for (let index = 0; index < count; index += 1) {
      const base = index * 3;
      const advanced = (radii[index] ?? 0) + (speeds[index] ?? 0) * delta;
      const radius = advanced > config.particleSpread ? inner : advanced;

      radii[index] = radius;
      positions[base] = (directions[base] ?? 0) * radius;
      positions[base + 1] = (directions[base + 1] ?? 0) * radius;
      positions[base + 2] = (directions[base + 2] ?? 0) * radius;
    }

    attribute.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={emissive(config.glowColor, config.particleGlow)}
        size={config.particleSize}
        sizeAttenuation
        transparent
        opacity={config.particleOpacity}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

interface SpinningCubeProps {
  readonly dragging: boolean;
}

function SpinningCube({ dragging }: SpinningCubeProps) {
  const group = useRef<THREE.Group>(null);

  /*
   * The idle spin is applied to the group, not to OrbitControls' `autoRotate`.
   * `autoRotate` moves the camera, which fights the damped orbit the user just
   * let go of; spinning the object leaves their viewing angle exactly where
   * they put it.
   */
  useFrame((_, delta) => {
    if (dragging || group.current === null) {
      return;
    }

    group.current.rotation.y += config.idleSpinSpeed * delta;
    group.current.rotation.x += config.idleSpinSpeed * delta * 0.35;
  });

  return (
    <group ref={group}>
      <CubeBody />
      <CubeFaces faces={heroCubeContent.faces} />
      <CubeEdges />
    </group>
  );
}

export interface HeroCubeSceneProps {
  /** Drives `frameloop`: the render loop stops entirely when off-screen. */
  readonly active: boolean;
}

export default function HeroCubeScene({ active }: HeroCubeSceneProps) {
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const [dragging, setDragging] = useState(false);

  const particleCount = desktop
    ? config.particleCountDesktop
    : config.particleCountMobile;

  const maxPixelRatio = desktop
    ? config.pixelRatioMax
    : config.pixelRatioMobileMax;

  return (
    <Canvas
      /* `never` halts the loop outright when the hero is scrolled away — no
         rAF, no GPU work, no battery drain behind the rest of the page. */
      frameloop={active ? "always" : "never"}
      dpr={[1, maxPixelRatio]}
      camera={{ position: [0, 0, config.cameraDistance], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      /* The page background shows through; the scene never paints its own. */
      style={{ background: "transparent" }}
    >
      {/* No glow geometry in the scene at all — the ambient wash is a soft CSS
          radial behind the canvas, so it has no edges to catch the light. */}
      <ParticleField count={particleCount} />
      <SpinningCube dragging={dragging} />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={config.dragDamping}
        rotateSpeed={config.dragRotateSpeed}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      />

      <EffectComposer>
        <Bloom
          intensity={config.bloomIntensity}
          radius={config.bloomRadius}
          luminanceThreshold={config.bloomThreshold}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
