"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const DURATION = 6000;
const SLIDES = [
  { src: "/slides/1.jpg", pos: "50% 50%", eyebrow: "Collection No.01 — On Ice", title: "얼음 위에 놓인\n겨울 바다의 첫 맛", text: "통영과 거제에서 오늘 아침 건진 굴을 그대로 식탁으로." },
  { src: "/slides/2.jpg", pos: "50% 55%", eyebrow: "Collection No.02 — Oyster Bar", title: "화이트 와인 한 잔과\n하프쉘 오이스터", text: "레몬과 미뇨네트만 있으면 집이 오이스터 바가 됩니다." },
  { src: "/slides/3.jpg", pos: "50% 50%", eyebrow: "Collection No.03 — Mother of Pearl", title: "껍데기 안쪽의\n자개빛 바다", text: "완도 활전복과 고성 가리비, 가장 좋은 철에만 보냅니다." },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(t);
  }, [i]);

  return (
    <section className="relative h-[calc(100svh-96px)] min-h-[480px] overflow-hidden bg-ink-950 text-ivory" aria-roledescription="carousel">
      {/* slow crossfade + gentle zoom, restrained like luxury editorials */}
      {SLIDES.map((s, n) => (
        <div key={s.src} className={`absolute inset-0 transition-opacity duration-[1500ms] ${n === i ? "opacity-100" : "opacity-0"}`} aria-hidden={n !== i}>
          <img
            src={s.src}
            alt=""
            style={{ objectPosition: s.pos }}
            className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${n === i ? "scale-105" : "scale-100"}`}
            loading={n === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/55 to-transparent" />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <p key={`e${i}`} className="text-[11px] uppercase tracking-[0.35em] text-pearl-300">{SLIDES[i].eyebrow}</p>
        <h1 key={`t${i}`} className="mt-4 whitespace-pre-line font-serif text-4xl font-normal leading-[1.15] sm:text-6xl">{SLIDES[i].title}</h1>
        <p className="mt-4 max-w-md text-sm text-ivory/75">{SLIDES[i].text}</p>
        <a href="#products" className="mt-8 inline-block border border-ivory/70 px-7 py-3 text-[11px] uppercase tracking-[0.3em] transition hover:bg-ivory hover:text-ink-950">
          Discover the Collection
        </a>

        <div className="mt-10 flex max-w-xs gap-2">
          {SLIDES.map((s, n) => (
            <button key={s.src} onClick={() => setI(n)} aria-label={`${n + 1}번 슬라이드`} className="h-6 flex-1">
              <span className="block h-px w-full bg-ivory/30">
                <span
                  key={n === i ? `on${i}` : "off"}
                  className="block h-px bg-ivory"
                  style={n === i ? { animation: `grow ${DURATION}ms linear forwards` } : { width: n < i ? "100%" : "0%" }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
