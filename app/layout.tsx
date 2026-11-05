import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./store";
import Header from "./header";
import ShellMark from "./shell-mark";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant" });
const notoSerifKr = Noto_Serif_KR({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-noto-serif-kr", preload: false });

export const metadata: Metadata = {
  title: "PASSION · Oyster & Shell",
  description: "굴, 전복, 가리비. 오늘 아침 바다에서 건진 조개를 얼음 위에 담아 보냅니다.",
};

const NOTICE = ["산지 직송 · Sea to Table", "당일 채취 · 당일 출고", "5만원 이상 무료배송", "0–4℃ 콜드체인", "굴 칼 · 레몬 동봉"];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`h-full antialiased ${cormorant.variable} ${notoSerifKr.variable}`}>
      <body className="flex min-h-full flex-col">
        <StoreProvider>
          <div className="overflow-hidden bg-ink-950 py-2 text-[11px] uppercase tracking-[0.3em] text-ivory/80" aria-label="공지">
            <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap">
              {[...NOTICE, ...NOTICE, ...NOTICE, ...NOTICE].map((t, i) => (
                <span key={i} aria-hidden={i >= NOTICE.length}>✦ {t}</span>
              ))}
            </div>
          </div>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-ink-900/10 bg-ivory">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-[1.4fr_1fr_1fr]">
              <div>
                <div className="flex items-center gap-3 text-ink-950">
                  <ShellMark className="h-12 w-12" />
                  <div>
                    <p className="font-serif text-3xl tracking-[0.2em]">PASSION</p>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-pearl-600">Oyster &amp; Shell</p>
                  </div>
                </div>
                <p className="mt-4 max-w-xs font-serif text-lg italic text-ink-600">
                  가장 차가운 바다의 맛을, 가장 신선한 순간에.
                </p>
              </div>
              <div className="text-sm leading-7 text-ink-600">
                <p className="eyebrow mb-3">Customer Care</p>
                <p>평일 10:00 – 17:00</p>
                <p>hello@passion.store</p>
                <p>교환 · 환불 안내</p>
              </div>
              <div className="text-sm leading-7 text-ink-600">
                <p className="eyebrow mb-3">Our Promise</p>
                <p>당일 채취 · 당일 출고</p>
                <p>0–4℃ 콜드체인</p>
                <p>폐사 · 파손 시 100% 재배송</p>
              </div>
            </div>
            <p className="border-t border-ink-900/10 py-5 text-center text-[11px] uppercase tracking-[0.3em] text-ink-900/40">
              © 2026 PASSION Oyster &amp; Shell · Demo (실제 주문/결제 없음)
            </p>
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
