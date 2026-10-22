"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { pages, wish, type JournalPage } from "@/lib/wish";
import { StageStickers } from "./Stickers";

type ScrapBack = {
  src: string;
  frame: "polaroid" | "pink" | "tape" | "heart" | "film";
  fill?: boolean;
};

/** Bright stickers only — no grey-plate / dark assets */
const BRIGHT_STICKERS: ScrapBack[] = [
  { src: "/stickers/side-hamster.png", frame: "pink" },
  { src: "/stickers/side-kitten-bow.png", frame: "heart" },
  { src: "/stickers/side-puppy-hat.png", frame: "pink" },
  { src: "/stickers/cow-hat.png", frame: "heart" },
  { src: "/stickers/cow-watercolor.png", frame: "pink" },
];

/**
 * Real memory photos (bright only).
 * note: photo-01.jpg is a moo-rvelous duplicate — skipped.
 * photo-03 is dark B&W — skipped.
 */
const PHOTO = {
  open: { src: "/stickers/photo-05.jpg", frame: "polaroid" },
  rooftop: { src: "/stickers/photo-08.jpg", frame: "tape" },
  film: { src: "/stickers/photo-02.jpg", frame: "film" },
  festive: { src: "/stickers/photo-04.jpg", frame: "polaroid" },
  hands: { src: "/stickers/photo-06.jpg", frame: "tape" },
  hug: { src: "/stickers/photo-07.jpg", frame: "polaroid" },
  nightOut: { src: "/stickers/photo-09.jpg", frame: "heart" },
  wink: { src: "/stickers/photo-10.jpg", frame: "tape" },
  end: {
    src: "/stickers/photo-end.jpg",
    frame: "polaroid",
    fill: true,
  },
} as const satisfies Record<string, ScrapBack>;

/**
 * One scrap back per leaf.
 * - Real photos: chapter openers + special notes
 * - Bright stickers: flow notes
 * - Second-last leaf → best photo (hug)
 * - Last reveal → landscape FinaleSpread
 */
function buildPageBacks(leaves: JournalPage[]): ScrapBack[] {
  const chapterAt = new Set(
    leaves
      .map((p, i) => (p.type === "chapter" ? i : -1))
      .filter((i) => i > 0),
  );
  const photoFacingChapter = new Set(
    [...chapterAt].map((i) => i - 1).filter((i) => i >= 0),
  );

  const specialPhotoAt = new Map<number, ScrapBack>([
    [3, PHOTO.rooftop],
    [5, PHOTO.hug],
    [8, PHOTO.hands],
    [10, PHOTO.festive],
    [13, PHOTO.film],
    [14, PHOTO.wink],
    [15, PHOTO.nightOut],
    [20, PHOTO.rooftop],
    [23, PHOTO.nightOut],
  ]);

  const chapterPhotos = [PHOTO.festive, PHOTO.film, PHOTO.hands];
  let chapterPhotoI = 0;
  let stickerI = 0;
  const nextSticker = (): ScrapBack =>
    BRIGHT_STICKERS[stickerI++ % BRIGHT_STICKERS.length];

  return leaves.map((page, i) => {
    if (i === leaves.length - 2) return PHOTO.hug;
    if (i === leaves.length - 1) return nextSticker();
    if (i === 0) return PHOTO.open;

    if (photoFacingChapter.has(i)) {
      return chapterPhotos[
        Math.min(chapterPhotoI++, chapterPhotos.length - 1)
      ];
    }

    if (page.type === "note" && specialPhotoAt.has(i)) {
      return specialPhotoAt.get(i)!;
    }

    return nextSticker();
  });
}

const PAGE_BACKS = buildPageBacks(pages);

export function Journal() {
  const leaves = useMemo(() => pages, []);
  const [flipCount, setFlipCount] = useState(0);
  const [dragAngle, setDragAngle] = useState<number | null>(null);
  const [draggingLeaf, setDraggingLeaf] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const dragRef = useRef<{ leaf: number; startX: number; active: boolean } | null>(
    null,
  );
  const angleRef = useRef<number | null>(null);

  const setAngle = (angle: number | null) => {
    angleRef.current = angle;
    setDragAngle(angle);
  };

  const canFlipNext = flipCount < leaves.length;
  const canFlipPrev = flipCount > 0;
  const atEnd = flipCount >= leaves.length;
  const isOpen = flipCount > 0 || draggingLeaf !== null;

  const finishFlip = useCallback((nextCount: number) => {
    setFlipCount(nextCount);
    angleRef.current = null;
    setDragAngle(null);
    setDraggingLeaf(null);
    setBusy(true);
    window.setTimeout(() => setBusy(false), 1180);
  }, []);

  const flipNext = useCallback(() => {
    if (busy || !canFlipNext) return;
    finishFlip(flipCount + 1);
  }, [busy, canFlipNext, finishFlip, flipCount]);

  const flipPrev = useCallback(() => {
    if (busy || !canFlipPrev) return;
    finishFlip(flipCount - 1);
  }, [busy, canFlipPrev, finishFlip, flipCount]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        flipNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        flipPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipNext, flipPrev]);

  function onPointerDown(e: ReactPointerEvent, leafIndex: number) {
    if (busy) return;
    if (leafIndex !== flipCount && leafIndex !== flipCount - 1) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { leaf: leafIndex, startX: e.clientX, active: true };
    setDraggingLeaf(leafIndex);
    setAngle(leafIndex < flipCount ? -178 : 0);
  }

  function onPointerMove(e: ReactPointerEvent, leafIndex: number) {
    const drag = dragRef.current;
    if (!drag?.active || drag.leaf !== leafIndex) return;
    const dx = e.clientX - drag.startX;
    const width = (e.currentTarget as HTMLElement).offsetWidth || 320;
    const raw = dx / width;
    const eased =
      Math.sign(raw) * Math.min(1, Math.pow(Math.abs(raw), 0.88));

    if (leafIndex === flipCount) {
      setAngle(Math.max(-178, Math.min(0, eased * 180)));
    } else if (leafIndex === flipCount - 1) {
      setAngle(Math.max(-178, Math.min(0, -178 + eased * 180)));
    }
  }

  function onPointerUp(leafIndex: number) {
    const drag = dragRef.current;
    if (!drag?.active || drag.leaf !== leafIndex) return;
    dragRef.current = null;

    const angle = angleRef.current ?? (leafIndex < flipCount ? -178 : 0);
    if (leafIndex === flipCount) {
      if (angle < -70) finishFlip(flipCount + 1);
      else {
        setAngle(null);
        setDraggingLeaf(null);
      }
    } else if (leafIndex === flipCount - 1) {
      if (angle > -110) finishFlip(flipCount - 1);
      else {
        setAngle(null);
        setDraggingLeaf(null);
      }
    } else {
      setAngle(null);
      setDraggingLeaf(null);
    }
  }

  const pageLabel = atEnd
    ? "the end"
    : flipCount === 0
      ? "cover"
      : `${flipCount} / ${leaves.length - 1}`;

  const current = !atEnd ? pages[flipCount] : null;
  const chapter =
    flipCount === 0
      ? "for Kashvi"
      : atEnd
        ? "moo-rvelous ending"
        : current && "chapter" in current
          ? current.chapter
          : "a note for Kashu";

  const tip =
    flipCount === 0
      ? "two sisters, one chaotic forever kind of love"
      : atEnd
        ? "miles apart, still right here — always"
        : current?.type === "chapter"
          ? "another piece of us, written down"
          : current?.type === "note"
            ? "written with all my heart"
            : "keep flipping — our story continues";

  return (
    <div className="journal-screen">
      <StageStickers />

      <div className="chrome-top" aria-live="polite">
        <div className="chrome-chip">
          <p className="font-hand text-base leading-none text-pink-hot sm:text-lg">
            {flipCount === 0 ? `happy birthday · ${wish.nickname}` : chapter}
          </p>
          {flipCount === 0 ? null : (
            <p className="mt-0.5 text-[0.55rem] tracking-[0.14em] text-ink-soft uppercase">
              {pageLabel}
            </p>
          )}
        </div>
        <div className="chrome-progress" aria-hidden>
          {leaves.map((_, i) => (
            <span
              key={i}
              className={`progress-bead ${i < flipCount ? "is-lit" : i === flipCount && !atEnd ? "is-now" : ""}`}
            />
          ))}
          <span className={`progress-bead heart ${atEnd ? "is-lit" : ""}`} />
        </div>
      </div>

      <button
        type="button"
        className="edge-nav edge-nav-prev"
        onClick={flipPrev}
        disabled={!canFlipPrev || busy}
        aria-label="Previous page"
      >
        ←
      </button>
      <button
        type="button"
        className="edge-nav edge-nav-next"
        onClick={atEnd ? () => finishFlip(0) : flipNext}
        disabled={busy || (!atEnd && !canFlipNext)}
        aria-label={atEnd ? "Start over" : flipCount === 0 ? "Open journal" : "Next page"}
      >
        {atEnd ? "↻" : "→"}
      </button>

      <div className="book-stage">
        {atEnd ? (
          <FinaleSpread />
        ) : (
          <div className={`book-track ${isOpen ? "is-open" : ""}`}>
            <div
              className={`book ${isOpen ? "is-open" : "is-closed"}`}
              role="region"
              aria-label="Birthday memory journal"
            >
              <div className="book-base" />
              <div className="book-spine" aria-hidden />
              <div className="book-crease" aria-hidden />
              <div className="book-underfill" />

              {leaves.map((page, i) => {
                const flipped = i < flipCount;
                const isDragging = draggingLeaf === i;
                const styleAngle =
                  isDragging && dragAngle !== null
                    ? dragAngle
                    : flipped
                      ? -178
                      : 0;
                const z = flipped ? 20 + i : 40 + (leaves.length - i);
                const back = PAGE_BACKS[i];

                return (
                  <div
                    key={i}
                    className="leaf"
                    style={{
                      zIndex: z,
                      transform: `rotateY(${styleAngle}deg)`,
                      transition: isDragging
                        ? "none"
                        : "transform var(--flip-ms) var(--flip-ease)",
                    }}
                    onPointerDown={(e) => onPointerDown(e, i)}
                    onPointerMove={(e) => onPointerMove(e, i)}
                    onPointerUp={() => onPointerUp(i)}
                    onPointerCancel={() => onPointerUp(i)}
                  >
                    <div
                      className={`leaf-face front ${page.type === "cover" ? "paper-cover" : "paper-inner"}`}
                    >
                      <div className="leaf-hinge" />
                      <div className="leaf-page-pad">
                        <PageBody page={page} />
                      </div>
                    </div>

                    <div className="leaf-face back">
                      <div className={`scrap-frame scrap-frame-${back.frame}`}>
                        <div className="scrap-mat">
                          <Image
                            src={back.src}
                            alt=""
                            fill
                            sizes="(max-width: 720px) 78vw, 400px"
                            className={`scrap-art ${back.fill ? "scrap-art-fill" : "scrap-art-contain"}`}
                            draggable={false}
                            priority={i < 3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <p className="chrome-tip font-hand text-sm text-ink-soft/70 sm:text-base">
        {tip}
      </p>
    </div>
  );
}

function FinaleSpread() {
  return (
    <div className="finale-spread" role="region" aria-label="Birthday finale">
      <div className="finale-photo">
        <Image
          src="/stickers/photo-07.jpg"
          alt="Kashu and Vaidehi"
          fill
          className="finale-photo-img"
          sizes="(max-width: 720px) 90vw, 380px"
          priority
        />
      </div>
      <div className="finale-moo">
        <div className="finale-moo-art">
          <Image
            src="/stickers/moo-rvelous.png"
            alt="Have a moo-rvelous birthday"
            fill
            className="object-contain object-center p-2 sm:p-3"
            sizes="(max-width: 720px) 90vw, 420px"
            priority
          />
        </div>
        <p className="finale-moo-caption font-hand">
          have a moo-rvelous birthday, {wish.nickname}
        </p>
      </div>
    </div>
  );
}

function PageBody({ page }: { page: JournalPage }) {
  if (page.type === "cover") {
    return (
      <div className="page-body cover-body">
        <div className="cover-scrap" aria-hidden>
          <span className="cover-spark cover-spark-a" />
          <span className="cover-spark cover-spark-b" />
          <span className="cover-spark cover-spark-c" />
          <span className="cover-spark cover-spark-d" />
          <span className="cover-tape" />
          <span className="cover-cloudlet" />
        </div>

        <header className="cover-top">
          <div className="cover-banner">
            <span>♡</span>
            <p>OUR JOURNAL</p>
            <span>♡</span>
          </div>
        </header>

        <section className="cover-mid">
          <p className="cover-belongs" aria-label="forever us">
            <span>F</span>
            <span>O</span>
            <span>R</span>
            <span>E</span>
            <span>V</span>
            <span>E</span>
            <span>R</span>
            <span className="cover-belongs-gap" />
            <span>U</span>
            <span>S</span>
          </p>
          <div className="cover-name-row">
            <span className="cover-pal-frame cover-pal-left">
              <span className="cover-pal-window">
                <Image
                  src="/stickers/side-hamster.png"
                  alt=""
                  width={96}
                  height={96}
                  className="cover-pal"
                  draggable={false}
                  unoptimized
                />
              </span>
            </span>
            <div className="cover-cloud">
              <p className="cover-pair font-hand" aria-label={`${wish.nickname} and ${wish.from}`}>
                <span>{wish.nickname}</span>
                <span className="cover-pair-heart" aria-hidden>
                  ♡
                </span>
                <span>{wish.from}</span>
              </p>
            </div>
            <span className="cover-pal-frame cover-pal-right">
              <span className="cover-pal-window">
                <Image
                  src="/stickers/side-puppy-hat.png"
                  alt=""
                  width={96}
                  height={96}
                  className="cover-pal"
                  draggable={false}
                  unoptimized
                />
              </span>
            </span>
          </div>
          <div className="cover-bunting" aria-hidden>
            <span />
            <span />
            <span className="cover-bunting-bow" />
            <span />
            <span />
          </div>
        </section>

        <footer className="cover-bottom">
          <p className="cover-age font-hand">{wish.ageLine}</p>
          <p className="cover-tags">
            shopping chaos · long drives · garba nights · endless voice notes
          </p>
          <p className="cover-open-hint">open me →</p>
        </footer>
      </div>
    );
  }

  if (page.type === "chapter") {
    return (
      <div className="page-body page-body-center chapter-page">
        <span className="chapter-eyebrow">a new chapter</span>
        <h2 className="chapter-title">{page.title}</h2>
        <span className="chapter-rule" aria-hidden />
        {page.blurb ? (
          <p className="chapter-blurb">{page.blurb}</p>
        ) : null}
        <p className="chapter-cue">turn the page →</p>
      </div>
    );
  }

  if (page.type === "note") {
    const long = page.body.length > 220;
    return (
      <div className="page-body page-body-note">
        <header className="note-head">
          <p className="note-eyebrow">a letter for Kashu</p>
          <h2 className="note-title">{page.title}</h2>
        </header>
        <article className="note-letter">
          <span className="note-tape" aria-hidden />
          <p className={`note-body ${long ? "is-long" : ""}`}>{page.body}</p>
          <footer className="note-sign">
            <span className="note-heart" aria-hidden>
              ♡
            </span>
            <span>— {wish.from}</span>
          </footer>
        </article>
      </div>
    );
  }

  return null;
}
