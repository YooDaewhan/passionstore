"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Product = {
  id: number;
  emoji: string;
  image: string; // photo URL, emoji is the fallback
  name: string;
  origin: string;
  pricePerKg: number;
  description: string;
  saleStart: string; // YYYY-MM-DD
  saleEnd: string;
};
export type Role = "admin" | "customer";
export type User = { id: string; name: string; role: Role };
export type CartItem = { productId: number; kg: number };

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=640&h=480&fit=crop&auto=format&q=80`;

export const INITIAL_PRODUCTS: Product[] = [
  { id: 1, emoji: "🦪", image: "/products/oyster.jpg", name: "통영 생굴 (각굴)", origin: "경남 통영", pricePerKg: 16900, description: "찬 바다에서 2년을 키운 껍데기째 생굴. 받은 날 바로 까서 레몬 한 방울이면 충분합니다.", saleStart: "2026-10-15", saleEnd: "2027-03-31" },
  { id: 2, emoji: "🦪", image: u("1729269524124-1645db0b0ff5"), name: "하프쉘 오이스터 플래터", origin: "경남 거제", pricePerKg: 32000, description: "한쪽 껍데기를 열어 얼음과 함께 담았어요. 미뇨네트 소스와 굴 칼이 함께 갑니다.", saleStart: "2026-11-01", saleEnd: "2027-02-28" },
  { id: 3, emoji: "🦪", image: u("1717251752068-30b71a38f605"), name: "대형 석화", origin: "전남 고흥", pricePerKg: 21000, description: "손바닥만 한 자연산 석화. 찜이나 그릴에 올리면 즙이 가득 차오릅니다.", saleStart: "2026-12-01", saleEnd: "2027-04-15" },
  { id: 4, emoji: "🐚", image: "/products/abalone.jpg", name: "완도 활전복", origin: "전남 완도", pricePerKg: 58000, description: "다시마와 미역만 먹고 자란 활전복. 살아 있는 채로 해수 산소 포장해 보냅니다.", saleStart: "2026-01-01", saleEnd: "2026-12-31" },
  { id: 5, emoji: "🐚", image: u("1754291819770-0ca4471ee82f"), name: "손질 전복 (구이용)", origin: "전남 완도", pricePerKg: 64000, description: "내장 분리와 칼집까지 마친 구이용 전복. 버터에 1분씩 앞뒤로 구우면 끝.", saleStart: "2026-03-01", saleEnd: "2026-12-31" },
  { id: 6, emoji: "🐚", image: "/products/scallop.jpg", name: "홍가리비", origin: "경남 고성", pricePerKg: 14900, description: "붉은 껍데기가 고운 홍가리비. 찜기에 5분, 껍데기가 열리면 바로 드세요.", saleStart: "2026-11-10", saleEnd: "2027-04-30" },
  { id: 7, emoji: "🐚", image: u("1761314037101-26c95a861e91"), name: "구이용 하프쉘 가리비", origin: "강원 고성", pricePerKg: 23000, description: "관자가 큰 참가리비를 하프쉘로 손질했어요. 치즈나 버터를 올려 오븐에 그대로.", saleStart: "2026-10-01", saleEnd: "2027-01-31" },
  { id: 8, emoji: "🌊", image: u("1541350013829-75d00d6c8578"), name: "제주 성게알", origin: "제주 구좌", pricePerKg: 180000, description: "해녀가 직접 채취해 그날 깐 보라성게알. 단맛이 진하고 비린 맛이 없어요.", saleStart: "2026-05-01", saleEnd: "2026-07-31" },
  { id: 9, emoji: "🐚", image: u("1762062738089-5d0d3040014d"), name: "백합", origin: "전북 부안", pricePerKg: 19800, description: "조개의 귀족이라 불리는 백합. 맑은 탕이나 술찜에 국물이 달큰하게 우러납니다.", saleStart: "2026-09-01", saleEnd: "2027-02-28" },
  { id: 10, emoji: "🐚", image: u("1757972367630-fbfcec63bb41"), name: "참홍합", origin: "경북 울진", pricePerKg: 12900, description: "알이 꽉 찬 자연산 참홍합. 화이트와인과 마늘로 찌면 근사한 한 냄비가 됩니다.", saleStart: "2026-11-15", saleEnd: "2027-03-15" },
  { id: 11, emoji: "🐙", image: "/products/octopus.jpg", name: "활문어 (챔피언급)", origin: "전남 여수", pricePerKg: 39000, description: "여덟 팔로 펀치를 날릴 만큼 힘이 넘치는 활문어. 글러브는 동봉되지 않습니다.", saleStart: "2026-09-01", saleEnd: "2027-01-31" },
];

// ponytail: mock accounts in client code, swap for real auth when there's a backend
export const ACCOUNTS: (User & { pw: string })[] = [
  { id: "admin", pw: "admin1234", name: "관리자", role: "admin" },
  { id: "customer", pw: "1234", name: "김바다", role: "customer" },
];

export type SaleStatus = "upcoming" | "onsale" | "ended";
export const STATUS_EN: Record<SaleStatus, string> = { onsale: "Available", upcoming: "Coming Soon", ended: "Sold Out" };
export function saleStatus(p: Product, today: string): SaleStatus {
  if (today < p.saleStart) return "upcoming";
  if (today > p.saleEnd) return "ended";
  return "onsale";
}

export const won = (n: number) => n.toLocaleString("ko-KR") + "원";

// ponytail: localStorage only, mock — every browser has its own "DB"
function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setValue(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, ready]);
  return [value, setValue, ready] as const;
}

type Store = {
  ready: boolean;
  today: string;
  products: Product[];
  setProducts: (fn: (p: Product[]) => Product[]) => void;
  user: User | null;
  login: (id: string, pw: string, role: Role) => User | null;
  logout: () => void;
  cart: CartItem[];
  addToCart: (productId: number, kg: number) => void;
  setKg: (productId: number, kg: number) => void;
  clearCart: () => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts, r1] = usePersisted("ps-products-v3", INITIAL_PRODUCTS);
  const [user, setUser, r2] = usePersisted<User | null>("ps-user", null);
  const [cart, setCart, r3] = usePersisted<CartItem[]>("ps-cart", []);
  // read the clock after mount, not during prerender
  const [today, setToday] = useState("");
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const store: Store = {
    ready: r1 && r2 && r3 && today !== "",
    today,
    products,
    setProducts,
    user,
    login(id, pw, role) {
      const acc = ACCOUNTS.find((a) => a.id === id && a.pw === pw && a.role === role);
      const u = acc ? { id: acc.id, name: acc.name, role: acc.role } : null;
      setUser(u);
      return u;
    },
    logout: () => setUser(null),
    cart,
    addToCart: (productId, kg) =>
      setCart((c) =>
        c.some((i) => i.productId === productId)
          ? c.map((i) => (i.productId === productId ? { ...i, kg: i.kg + kg } : i))
          : [...c, { productId, kg }],
      ),
    setKg: (productId, kg) =>
      setCart((c) => (kg <= 0 ? c.filter((i) => i.productId !== productId) : c.map((i) => (i.productId === productId ? { ...i, kg } : i)))),
    clearCart: () => setCart([]),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside StoreProvider");
  return s;
}

// Photo with emoji fallback (empty or broken URL, e.g. admin typo)
export function ProductImage({ p, className = "" }: { p: Pick<Product, "image" | "emoji" | "name">; className?: string }) {
  const [broken, setBroken] = useState(false);
  if (!p.image || broken)
    return <div className={`grid place-items-center bg-gradient-to-br from-pearl-300/40 to-ink-600/10 ${className}`}>{p.emoji}</div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={p.image} alt={p.name} loading="lazy" onError={() => setBroken(true)} className={`object-cover ${className}`} />;
}
