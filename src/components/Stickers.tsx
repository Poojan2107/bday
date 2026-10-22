"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

type ChipItem = {
  src: string;
  tilt: string;
  /** contain = full art; cover = crop baked-in plate borders */
  fit?: "contain" | "cover";
  zoom?: number;
  pos?: string;
};

/** Bright cutouts only for outer zig-zag — moo-rvelous stays on the journal end card */
const STICKERS = {
  hamster: {
    src: "/stickers/side-hamster.png",
    fit: "contain" as const,
    zoom: 1.05,
  },
  kitten: {
    src: "/stickers/side-kitten-bow.png",
    fit: "cover" as const,
    zoom: 1.15,
    pos: "50% 55%",
  },
  watercolor: {
    src: "/stickers/cow-watercolor.png",
    fit: "contain" as const,
    zoom: 1.1,
  },
  puppy: {
    src: "/stickers/side-puppy-hat.png",
    fit: "contain" as const,
    zoom: 1.08,
  },
} as const;

/** Left order */
const LEFT: ChipItem[] = [
  { ...STICKERS.hamster, tilt: "-8deg" },
  { ...STICKERS.kitten, tilt: "6deg" },
  { ...STICKERS.watercolor, tilt: "-5deg" },
  { ...STICKERS.puppy, tilt: "7deg" },
];

/** Right = same set, rotated so sides alternate */
const RIGHT: ChipItem[] = [
  { ...STICKERS.watercolor, tilt: "5deg" },
  { ...STICKERS.puppy, tilt: "-7deg" },
  { ...STICKERS.hamster, tilt: "4deg" },
  { ...STICKERS.kitten, tilt: "-6deg" },
];

function Chip({
  src,
  tilt,
  fit = "contain",
  zoom = 1,
  pos = "center",
}: ChipItem) {
  return (
    <span
      className="side-chip"
      style={
        {
          ["--tilt"]: tilt,
          ["--fit"]: fit,
          ["--zoom"]: String(zoom),
          ["--pos"]: pos,
        } as CSSProperties
      }
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="140px"
        className="side-chip-img"
        draggable={false}
        priority
      />
    </span>
  );
}

export function StageStickers() {
  return (
    <div className="side-stage" aria-hidden>
      <div className="side-lane side-lane-left">
        {LEFT.map((item) => (
          <Chip key={`L-${item.src}`} {...item} />
        ))}
      </div>
      <div className="side-lane side-lane-right">
        {RIGHT.map((item) => (
          <Chip key={`R-${item.src}`} {...item} />
        ))}
      </div>
    </div>
  );
}
