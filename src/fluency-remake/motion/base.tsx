// BASE do REMAKE da VSL oficial da Fluency (13/11). Visual = SISTEMA v2 da fluency-yt-rmkt (branco editorial, 1 tipo de cartão,
// azul só na RESPOSTA, vermelho só pra negar, verde só pra afirmar). Aqui o áudio é CONTÍNUO em 1×: frame = segundo × 30.
import React from "react";
import { OffthreadVideo, Sequence, useCurrentFrame } from "remotion";
import { WORDS } from "../words";
export { COR, DISPLAY, SANS, SOMBRA, PALCO, Pilula, Cartao, Frase, Apoio, Entra, Riscada, Traco, Troca, Fundo, ap } from "../../fluency-yt-rmkt/motion/base";
import { COR, SANS, DISPLAY, SOMBRA, Entra, ap } from "../../fluency-yt-rmkt/motion/base";

export const FPS = 30;
export const s = (t: number) => Math.round(t * FPS);
const lim = (x: string) => x.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
// frame em que a `palavra` começa, procurando entre os segundos a e b (ocorr = qual ocorrência, a partir de 0)
export const w = (a: number, b: number, palavra: string, ocorr = 0) => {
	const alvo = lim(palavra); let k = 0;
	for (const [p, t] of WORDS) { if (t < a - 0.02) continue; if (t > b + 0.02) break; if (lim(p).startsWith(alvo)) { if (k === ocorr) return s(t); k++; } }
	throw new Error(`w: "${palavra}" não está entre ${a} e ${b}`);
};
// cena: vale de `de` (s) até a próxima. cheio = não mostra ele mesmo que exista imagem (a aula ocupa a tela)
// broll = clipe (public/fluency-remake/broll/<nome>.mp4, 8 s em loop) que ocupa a parte de baixo quando ELE não existe no original.
// th = a cena é dele em TELA CHEIA (olho no olho); a lista [frame, frase] é o que aparece na faixa de baixo, trocando na palavra.
export type Cena = { de: number; C: React.FC; cheio?: boolean; broll?: string; th?: [number, React.ReactNode][] };

export const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
export const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;
// conteúdo centralizado dentro de um Cartao
export const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };
export const AZUL_CHEIO: React.CSSProperties = { background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" };
export const ANEL = `0 0 0 7px ${COR.azul}, 0 26px 70px rgba(47,91,255,0.28)`;

// X vermelho e check verde que se desenham
export const Xis: React.FC<{ em: number; size?: number }> = ({ em, size = 84 }) => {
	const f = useCurrentFrame(); if (f < em) return null; const p = ap(f, em, 6), q = ap(f, em + 4, 6);
	return <svg width={size} height={size} viewBox="0 0 84 84"><path d="M 16 16 L 68 68" stroke={COR.vermelho} strokeWidth={13} strokeLinecap="round" strokeDasharray={80} strokeDashoffset={(1 - p) * 80} /><path d="M 68 16 L 16 68" stroke={COR.vermelho} strokeWidth={13} strokeLinecap="round" strokeDasharray={80} strokeDashoffset={(1 - q) * 80} opacity={f >= em + 4 ? 1 : 0} /></svg>;
};
export const Check: React.FC<{ em: number; size?: number; cor?: string }> = ({ em, size = 84, cor = COR.verde }) => {
	const f = useCurrentFrame(); if (f < em) return null; const p = ap(f, em, 9);
	return <svg width={size} height={size} viewBox="0 0 84 84"><path d="M 14 44 L 34 64 L 70 22" fill="none" stroke={cor} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={100} strokeDashoffset={(1 - p) * 100} /></svg>;
};
// carimbo (entra batendo, levemente girado)
export const Carimbo: React.FC<{ em: number; x: number; y: number; cor?: string; size?: number; children: React.ReactNode }> = ({ em, x, y, cor = COR.vermelho, size = 76, children }) => {
	const f = useCurrentFrame(); if (f < em) return null; const p = ap(f, em, 6);
	return <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(-7deg) scale(${1.9 - 0.9 * p})`, opacity: p, padding: "10px 34px", border: `8px solid ${cor}`, borderRadius: 22, background: "rgba(255,255,255,0.92)", fontFamily: DISPLAY, fontWeight: 800, fontSize: size, letterSpacing: -1.5, color: cor, whiteSpace: "nowrap" }}>{children}</div>;
};
// o que está valendo agora numa lista [frame, valor]
export function agora<T>(f: number, itens: [number, T][]): [number, T] | null { let r: [number, T] | null = null; for (const x of itens) if (f >= x[0]) r = x; return r; }

// CLIPES REAIS (banco de cenas): tocam em loop, mudos, dentro do retângulo pai
export type Clipe = { src: string; dur: number };
const VPS = "https://media.srv1198551.hstgr.cloud/friends/";
export const FRIENDS: Clipe[] = [{ src: VPS + "friends-1.mp4", dur: 2.294 }, { src: VPS + "friends-2.mp4", dur: 1.627 }, { src: VPS + "friends-3.mp4", dur: 2.044 }];
export const Clipes: React.FC<{ clipes: Clipe[]; de: number; ate: number }> = ({ clipes, de, ate }) => {
	const f = useCurrentFrame(); const itens: { from: number; dur: number; src: string }[] = []; let t = de;
	for (let g = 0; t < ate && g < 400; g++) for (const c of clipes) { if (t >= ate) break; const d = Math.max(2, Math.round(c.dur * FPS)); itens.push({ from: t, dur: Math.min(d, ate - t), src: c.src }); t += d; }
	return <>{itens.filter((i) => f >= i.from - 30 && f < i.from + i.dur + 2).map((i) => (
		<Sequence key={i.from} from={i.from} durationInFrames={i.dur} layout="none"><OffthreadVideo muted src={i.src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></Sequence>
	))}</>;
};
// player escuro com o clipe real dentro
export const Player: React.FC<{ y: number; h: number; em: number; de: number; ate: number; clipes?: Clipe[]; children?: React.ReactNode }> = ({ y, h, em, de, ate, clipes = FRIENDS, children }) => (
	<Entra em={em} style={{ position: "absolute", left: 48, top: y, width: 984, height: h, borderRadius: 44, background: "#0F172A", padding: 14, boxSizing: "border-box", boxShadow: "0 30px 70px rgba(11,13,18,0.28)" }}>
		<div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", background: "#0B1220" }}>
			<Clipes clipes={clipes} de={de} ate={ate} />
			{children}
		</div>
	</Entra>
);
// etiqueta pequena (chip) dentro de player/cartão
export const Chip: React.FC<{ cor?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ cor = COR.azul, children, style }) => (
	<div style={{ display: "inline-flex", alignItems: "center", padding: "12px 28px", borderRadius: 99, background: cor, color: "#fff", fontFamily: SANS, fontWeight: 700, fontSize: 36, letterSpacing: -0.3, boxShadow: SOMBRA, whiteSpace: "nowrap", ...style }}>{children}</div>
);
