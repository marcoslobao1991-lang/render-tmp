// LOUSA: remake do slide azul-marinho do original (15/11, Marcos: "meu slide azul marinho… é uma coisa que eu quero um remake").
// No original ele entra em 10 momentos da aula, em tela cheia, e vai ACUMULANDO o raciocínio (habilidade → treino → escuta e fala → repetição).
// Aqui é a mesma lousa, refeita: tela cheia, azul-marinho, uma linha por ideia, cada linha entra NA PALAVRA e a linha da vez fica acesa.
// O lugar de cada linha já está reservado desde o 1º quadro (nada empurra nada). Sem faixa embaixo: o slide é a única coisa na tela.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COR, DISPLAY, SANS, ap, s, w, Carimbo } from "./base";

const CLARO = "#8FA8FF";
const Lousa: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<AbsoluteFill style={{ background: "linear-gradient(180deg, #14276B 0%, #0B1740 52%, #070E26 100%)" }}>
		<div style={{ position: "absolute", left: -200, top: -260, width: 1480, height: 900, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(77,116,255,0.30), rgba(77,116,255,0))" }} />
		<div style={{ position: "absolute", left: 60, right: 60, top: 190, bottom: 330, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>{children}</div>
	</AbsoluteFill>
);
// título da lousa (parado desde o 1º quadro, ou entra em `em`)
const Titulo: React.FC<{ em?: number; children: React.ReactNode; size?: number }> = ({ em, children, size = 104 }) => {
	const f = useCurrentFrame(); const p = em === undefined ? 1 : ap(f, em, 7);
	return <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 1, letterSpacing: -size * 0.035, color: "#fff", textAlign: "center", marginBottom: 56, opacity: em !== undefined && f < em ? 0 : p, transform: `translateY(${(1 - p) * 22}px)` }}>{children}</div>;
};
// linha da lousa. acesa = cartão azul cheio; senão vidro. Antes de `em` o lugar existe, vazio.
const Linha: React.FC<{ em: number; acesa?: boolean; apagada?: boolean; size?: number; sub?: React.ReactNode; subEm?: number; extra?: React.ReactNode; style?: React.CSSProperties; children: React.ReactNode }> = ({ em, acesa, apagada, size = 76, sub, subEm, extra, style, children }) => {
	const f = useCurrentFrame(); const p = ap(f, em, 7); const ps = subEm === undefined ? 1 : ap(f, subEm, 7);
	return (
		<div style={{ visibility: f < em ? "hidden" : "visible", opacity: p * (apagada ? 0.45 : 1), transform: `translateY(${(1 - p) * 24}px)`, borderRadius: 40, padding: "38px 44px", boxSizing: "border-box", background: acesa ? COR.azul : "rgba(255,255,255,0.07)", border: `3px solid ${acesa ? COR.azul : "rgba(255,255,255,0.16)"}`, boxShadow: acesa ? "0 26px 70px rgba(47,91,255,0.45)" : undefined, textAlign: "center", ...style }}>
			<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: -size * 0.032, color: "#fff" }}>{children}</div>
			{sub ? <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 46, lineHeight: 1.16, letterSpacing: -0.5, color: "rgba(255,255,255,0.86)", marginTop: 18, visibility: subEm !== undefined && f < subEm ? "hidden" : "visible", opacity: ps }}>{sub}</div> : null}
			{extra}
		</div>
	);
};
// seta entre duas linhas: se desenha em `em`
const Seta: React.FC<{ em: number }> = ({ em }) => {
	const f = useCurrentFrame(); const p = ap(f, em, 8);
	return (
		<svg width={960} height={84} viewBox="0 0 960 84" style={{ display: "block", visibility: f < em ? "hidden" : "visible" }}>
			<path d="M 480 10 L 480 66" stroke={CLARO} strokeWidth={10} strokeLinecap="round" strokeDasharray={60} strokeDashoffset={(1 - p) * 60} />
			<path d="M 456 46 L 480 72 L 504 46" fill="none" stroke={CLARO} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={p > 0.7 ? 1 : 0} />
		</svg>
	);
};
// qual linha está acesa: a do último tempo que já passou
const vez = (f: number, tempos: [number, number][]) => { let r = -1, t = -1; for (const [em, i] of tempos) if (f >= em && em >= t) { t = em; r = i; } return r; };

// 2:43 · o mercado do fácil
export const Mercado: React.FC = () => {
	const f = useCurrentFrame();
	const t = [w(163, 164.5, "aprenda"), w(164.9, 166, "aprenda"), w(166, 167, "fique"), w(169, 170, "deixa")], tB = w(173, 176.4, "balela");
	const txt = ["Aprenda se divertindo", "Aprenda dormindo", "Fluente em 3 meses", "Fluente em 8 semanas"];
	const v = f >= tB ? -1 : vez(f, t.map((em, i) => [em, i] as [number, number]));
	return (
		<Lousa>
			<Titulo>O mercado do fácil</Titulo>
			<div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 26 }}>
				{txt.map((x, i) => <Linha key={i} em={t[i]} acesa={v === i} apagada={f >= tB}>{x}</Linha>)}
				<Carimbo em={tB} x={480} y={330} size={170}>balela</Carimbo>
			</div>
		</Lousa>
	);
};

// 5:31 · a grande pergunta
export const Pergunta: React.FC = () => {
	const f = useCurrentFrame(); const tQ = w(333, 334, "Como") - 2; const p = ap(f, tQ, 8);
	return (
		<Lousa>
			<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 46, letterSpacing: 5, textTransform: "uppercase", color: CLARO, textAlign: "center", marginBottom: 50 }}>A grande pergunta</div>
			<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 124, lineHeight: 1.0, letterSpacing: -4.4, color: "#fff", textAlign: "center", visibility: f < tQ ? "hidden" : "visible", opacity: p, transform: `translateY(${(1 - p) * 26}px)` }}>
				Como colocar o inglês no <span style={{ color: CLARO }}>subconsciente?</span>
			</div>
		</Lousa>
	);
};

// 7:17, 7:33 e 9:21 · inglês é habilidade → precisa ser treinado → escuta e fala (a mesma lousa, acumulando; em 9:21 ele relê e a linha da vez acende)
export const Habilidade: React.FC = () => {
	const f = useCurrentFrame();
	const t1 = w(437, 438, "inglês") - 3, t2 = w(440, 441, "precisa"), tE = w(458.5, 459.6, "escuta"), tF = w(460, 461, "fala");
	const v = vez(f, [[t1, 0], [t2, 1], [tE, 2], [tF, 3], [w(562.9, 563.4, "inglês"), 0], [w(564.2, 565, "habilidades"), 1], [w(567.5, 568.4, "ouvido"), 2], [w(570.3, 571.2, "fala"), 3]]);
	return (
		<Lousa>
			<Linha em={t1} acesa={v === 0}>Inglês é uma habilidade</Linha>
			<Seta em={t2 - 6} />
			<Linha em={t2} acesa={v === 1}>Precisa ser treinado</Linha>
			<Seta em={tE - 6} />
			<div style={{ display: "flex", gap: 26 }}>
				<Linha em={tE} acesa={v === 2} size={88} style={{ flex: 1 }}>Escuta</Linha>
				<Linha em={tF} acesa={v === 3} size={88} style={{ flex: 1 }}>Fala</Linha>
			</div>
		</Lousa>
	);
};

// 9:55 e 10:08 · a calculadora de palavras de Friends
const EPS = [0.86, 0.66, 0.94, 0.72, 0.87, 0.89, 0.81, 0.93, 0.9, 0.68];
export const Calculo: React.FC = () => {
	const f = useCurrentFrame();
	const tN = w(598.5, 599.2, "números"), tB = s(607.9), t100 = w(613, 614, "100") - 6;
	const ps = [["you", w(608.9, 609.5, "you")], ["that", w(609.4, 609.9, "that")], ["me", w(609.9, 610.3, "me")], ["I", w(610.2, 610.7, "I")], ["who", w(610.6, 611.1, "who")], ["what", w(611, 611.5, "what")], ["how", w(611.5, 612.1, "how")]] as [string, number][];
	if (f < tB) return (
		<Lousa>
			<Titulo size={92}>Calculadora de palavras</Titulo>
			<div style={{ borderRadius: 40, border: "3px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.07)", padding: "44px 40px 34px" }}>
				<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 46, color: "rgba(255,255,255,0.86)", marginBottom: 30 }}>Friends · 1 temporada inteira</div>
				<div style={{ height: 560, display: "flex", alignItems: "flex-end", gap: 16, borderBottom: "4px solid rgba(255,255,255,0.35)" }}>
					{EPS.map((h, i) => <div key={i} style={{ flex: 1, height: `${h * 100 * ap(f, tN + i * 3, 12)}%`, background: i % 2 ? "#4D74FF" : COR.azul, borderRadius: "14px 14px 0 0" }} />)}
				</div>
				<div style={{ display: "flex", gap: 16, marginTop: 14 }}>{EPS.map((_, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 36, color: "rgba(255,255,255,0.75)" }}>{i + 1}</div>)}</div>
				<div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 42, color: "rgba(255,255,255,0.86)", textAlign: "center", marginTop: 22 }}>palavras diferentes em cada episódio</div>
			</div>
		</Lousa>
	);
	return (
		<Lousa>
			<Titulo size={92}>As palavras que mais aparecem</Titulo>
			<div style={{ display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center", minHeight: 420, alignContent: "flex-start" }}>
				{ps.map(([p, em]) => { const q = ap(f, em, 7); return <div key={p} style={{ visibility: f < em ? "hidden" : "visible", opacity: q, transform: `translateY(${(1 - q) * 20}px)`, padding: "22px 44px", borderRadius: 34, background: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 96, letterSpacing: -3, color: COR.ink }}>{p}</div>; })}
			</div>
			<Linha em={t100} acesa size={104} sub="em 1 único episódio" style={{ marginTop: 50 }}>Mais de 100 vezes</Linha>
		</Lousa>
	);
};

// 11:18 · o que a gente tem até agora → repetição
export const Subconsciente: React.FC = () => {
	const f = useCurrentFrame();
	const t = [w(678.4, 679.2, "fluência"), w(683, 684, "treinar"), w(686, 687, "essencial") - 8, w(690.8, 692, "repetição")];
	const v = vez(f, t.map((em, i) => [em, i] as [number, number]));
	return (
		<Lousa>
			<Linha em={t[0]} acesa={v === 0} size={70}>A fluência está no subconsciente</Linha>
			<Seta em={t[1] - 6} />
			<Linha em={t[1]} acesa={v === 1} size={70}>Treinar escuta e fala</Linha>
			<Seta em={t[2] - 6} />
			<Linha em={t[2]} acesa={v === 2} size={70}>Dentro do inglês essencial</Linha>
			<Seta em={t[3] - 6} />
			<Linha em={t[3]} acesa={v === 3} size={124}>Repetição</Linha>
		</Lousa>
	);
};

// 11:50 e 12:16 · os 2 tipos de repetição
export const Repeticao: React.FC = () => {
	const f = useCurrentFrame();
	const tT = w(707, 708, "dois") - 4, t1 = w(710.8, 711.3, "repetição"), s1 = w(713.5, 714.2, "repete"), t2 = w(737, 737.6, "repetição"), s2 = w(739.9, 740.4, "revê"), d2 = w(741, 741.5, "depois");
	const v = vez(f, [[t1, 0], [t2, 1]]);
	const n1 = Math.max(0, Math.min(8, Math.floor((f - w(714.2, 714.8, "várias")) / 6) + 1));
	const dias = ["hoje", "+1 dia", "+3 dias", "+7 dias"];
	return (
		<Lousa>
			<Titulo em={tT}>2 tipos de repetição</Titulo>
			<Linha em={t1} acesa={v === 0} size={92} sub="a mesma coisa, várias vezes, na mesma hora" subEm={s1}
				extra={<div style={{ display: "flex", gap: 14, marginTop: 30, visibility: f < s1 ? "hidden" : "visible" }}>{[...Array(8)].map((_, i) => <div key={i} style={{ flex: 1, height: 26, borderRadius: 13, background: i < n1 ? "#fff" : "rgba(255,255,255,0.22)" }} />)}</div>}>
				1 · Continuada
			</Linha>
			<div style={{ height: 34 }} />
			<Linha em={t2} acesa={v === 1} size={92} sub="rever o treino depois de alguns dias" subEm={s2}
				extra={<div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, visibility: f < d2 ? "hidden" : "visible" }}>{dias.map((d, i) => { const q = ap(f, d2 + i * 8, 7); return <div key={d} style={{ opacity: q, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}><div style={{ width: 54, height: 54, borderRadius: 27, background: "#fff" }} /><div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 38, color: "#fff" }}>{d}</div></div>; })}</div>}>
				2 · Espaçada
			</Linha>
		</Lousa>
	);
};

// TÍTULO DE CONCEITO: remake do título amarelo que a edição antiga punha por cima dele (4 s). Uma palavra, tela cheia.
const Conceito = (texto: React.ReactNode, size = 150): React.FC => () => (
	<Lousa>
		<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 0.98, letterSpacing: -size * 0.038, color: "#fff", textAlign: "center" }}>{texto}</div>
		<div style={{ width: 220, height: 14, borderRadius: 7, background: COR.azul, margin: "46px auto 0" }} />
	</Lousa>
);
export const CHabilidades = Conceito("Habilidades", 164);
export const CEssencial = Conceito(<>Fluência essencial</>, 164);
export const CConversacionais = Conceito("Conversacionais", 124);
export const CDiscursos = Conceito("Discursos", 180);

// 12:56 e 13:03 · treinos concentrados: o idioma inteiro → 1 episódio → 1 minuto (a barra encolhe)
export const Concentrados: React.FC = () => {
	const f = useCurrentFrame();
	const t = [w(784, 785, "idioma"), w(788.8, 789.8, "único"), w(795.5, 796.8, "minuto") - 8];
	const v = vez(f, t.map((em, i) => [em, i] as [number, number]));
	const L = [["O idioma inteiro", 1], ["1 episódio", 0.5], ["1 minuto", 0.14]] as [string, number][];
	return (
		<Lousa>
			<Titulo size={118}>Treinos concentrados</Titulo>
			{L.map(([x, k], i) => { const p = ap(f, t[i], 10); return (
				<div key={i} style={{ visibility: f < t[i] ? "hidden" : "visible", opacity: p, marginTop: i ? 54 : 20 }}>
					<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 84, letterSpacing: -2.8, color: "#fff", marginBottom: 20 }}>{x}</div>
					<div style={{ height: 64, borderRadius: 32, background: "rgba(255,255,255,0.12)" }}><div style={{ height: 64, borderRadius: 32, width: `${(i ? L[i - 1][1] + (k - L[i - 1][1]) * p : k * p) * 100}%`, minWidth: 64, background: v === i ? COR.azul : "rgba(255,255,255,0.45)", boxShadow: v === i ? "0 18px 50px rgba(47,91,255,0.5)" : undefined }} /></div>
				</div>
			); })}
		</Lousa>
	);
};
