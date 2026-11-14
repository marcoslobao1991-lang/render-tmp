// LOTE 3 (13/11, SISTEMA v2): expressões são a base de uma conversa · o essencial dele · primeira meta · 1x → 1,5x → 2x · lapidação acelerada.
// Frases 182 a 279. Régua de AULA + v2 (centralizado, cartão único, azul só na resposta). Versão anterior em motion/_v1/lote3.tsx.bak.
import React from "react";
import { C190N, C236N } from "./real";
import { useCurrentFrame } from "remotion";
import { COR, DISPLAY, SANS, SOMBRA, Pilula, Cartao, Frase, Apoio, Entra, Riscada, fr, fw, Cena } from "./base";

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;
const AZUL_CHEIO: React.CSSProperties = { background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" };
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };

// 182-189 · de "500 a 1.000 palavras" pra "não é isso: são EXPRESSÕES"
const C182: React.FC = () => {
	const f = useCurrentFrame(); const tE = fw(185, "expressões"); const t0 = fw(182, "500") - 8;
	return (
		<>
			<Pilula>O que você precisa treinar</Pilula>
			{f < tE ? (
				<Entra em={t0} style={{ position: "absolute", left: 40, right: 40, top: 280, textAlign: "center" }}><Frase size={168}>500 a 1.000</Frase><Frase size={150} c={COR.ink2}>palavras</Frase></Entra>
			) : (
				<>
					<Centro top={225}><Frase size={84} c={COR.ink2}><Riscada em={tE}>500 a 1.000 palavras</Riscada></Frase></Centro>
					<Cartao y={370} h={330} em={tE} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={158} c="#fff">Expressões</Frase></Cartao>
					<Entra em={fw(187, "base") - 8} style={{ position: "absolute", left: 48, right: 48, top: 780, textAlign: "center" }}><Apoio size={60} c={COR.ink}>são a base de uma conversa</Apoio></Entra>
				</>
			)}
		</>
	);
};

// 216-235 · ele como prova: não sei tudo, sei o essencial, e converso sobre qualquer assunto
const C216: React.FC = () => {
	const f = useCurrentFrame(); const tN = fr(224), tC = fw(227, "conversar") - 12, tM = fr(232);
	return (
		<>
			<Pilula>Eu sou fluente</Pilula>
			<div style={{ position: "absolute", left: 225, top: 150, width: 630, height: 630, borderRadius: "50%", background: "#fff", boxShadow: SOMBRA }} />
			<div style={{ position: "absolute", left: 408, top: 333, width: 264, height: 264, borderRadius: "50%", background: COR.azul, boxShadow: "0 0 0 18px rgba(47,91,255,0.14)" }} />
			<Entra em={fr(221)} style={{ position: "absolute", left: 0, right: 0, top: 212, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 42, color: f >= tN ? COR.vermelho : COR.ink2 }}>palavras que eu não sei</Entra>
			<div style={{ position: "absolute", left: 0, right: 0, top: 435, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 50, letterSpacing: -1, color: "#fff" }}>essencial</div>
			{f >= tM
				? <Cartao key="m" y={826} h={224} em={tM} style={MEIO}><Frase size={96}>Uma ótima <Azul>primeira meta</Azul></Frase></Cartao>
				: <Cartao key="c" y={826} h={224} em={tC} style={{ ...MEIO, padding: "0 30px", boxSizing: "border-box" }}><Frase size={70}>Converso com qualquer pessoa sobre <Azul>qualquer assunto</Azul></Frase></Cartao>}
		</>
	);
};

// 253-260 · o músico que tirou o solo e agora acelera: as notas passam cada vez mais rápido
const C253: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(254), tL = fr(260);
	const p = Math.max(0, Math.min(1, (f - t0) / Math.max(1, tL - t0))); const bpm = Math.round(80 + p * 80);
	const fase = (f - t0) * (0.05 + p * 0.09);
	return (
		<>
			<Pilula>Quem faz isso? Músicos</Pilula>
			<Centro top={180}><Entra em={tL}><Frase size={104} style={{ whiteSpace: "nowrap" }}>Lapidação <Azul>acelerada</Azul></Frase></Entra></Centro>
			<Cartao y={330} h={420}>
				<svg width={984} height={420} viewBox="48 330 984 420" style={{ position: "absolute", inset: 0 }}>
					{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={90} x2={990} y1={470 + i * 44} y2={470 + i * 44} stroke={COR.linha} strokeWidth={4} />)}
					{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const x = 990 - (((i / 8 + fase) % 1) * 900); const y = 470 + ((i * 3) % 5) * 44; return <g key={i}><ellipse cx={x} cy={y} rx={26} ry={19} fill={COR.azul} transform={`rotate(-18 ${x} ${y})`} /><line x1={x + 23} x2={x + 23} y1={y} y2={y - 106} stroke={COR.azul} strokeWidth={7} /></g>; })}
				</svg>
			</Cartao>
			<div style={{ position: "absolute", left: 0, right: 0, top: 785, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 140, lineHeight: 1, letterSpacing: -4, color: COR.ink }}>{bpm}<span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 46, letterSpacing: 0, color: COR.ink2 }}> batidas por minuto</span></div>
			<Entra em={tL + 10} style={{ position: "absolute", left: 48, right: 48, top: 965, textAlign: "center" }}><Apoio size={50}>acontece quando você aumenta a velocidade</Apoio></Entra>
		</>
	);
};

// 261-272 · um episódio dominado em 2x → o próximo seriado "fica baba"
const C261: React.FC = () => {
	const f = useCurrentFrame(); const t2 = fw(262, "2x") - 6, tB = fw(263, "baba") - 4;
	const cartao = (x: number, em: number, tit: string, sub: React.ReactNode, cor: string, anel?: boolean) => (
		<Cartao x={x} w={476} y={210} h={590} em={em} style={anel ? { boxShadow: `0 0 0 7px ${cor}, 0 26px 70px rgba(14,159,79,0.25)` } : undefined}>
			<div style={{ position: "absolute", left: 40, right: 40, top: 46, height: 250, borderRadius: 28, background: COR.gelo, display: "flex", alignItems: "center", justifyContent: "center" }}>
				<svg width={100} height={100}><path d="M 26 14 L 84 50 L 26 86 Z" fill={cor} /></svg>
			</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 340, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 46, color: COR.ink2 }}>{tit}</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 410, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 108, letterSpacing: -3.4, color: cor }}>{sub}</div>
		</Cartao>
	);
	return (
		<>
			<Pilula>10 mil vezes o mesmo chute</Pilula>
			{cartao(48, fr(262), "1 episódio", "em 2x", COR.azul)}
			{f >= tB ? cartao(556, tB, "outro seriado", "baba", COR.verde, true) : null}
			{f >= tB ? <Entra em={tB} style={{ position: "absolute", left: 496, top: 460, width: 88, height: 88, borderRadius: 99, background: COR.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 700, fontSize: 54, lineHeight: 1 }}>→</Entra> : null}
			<Entra em={t2} style={{ position: "absolute", left: 48, right: 48, top: 875, textAlign: "center" }}><Apoio size={58} c={COR.ink}>{f >= fr(269) ? "Ele não começa do zero" : "“Eu entendo tudo, até em 2x”"}</Apoio></Entra>
		</>
	);
};

// 273-279 · O BULLET do bloco (do docs dele): as palavras se repetem em expressões
const C273: React.FC = () => (
	<>
		<Pilula>A base do seu treino</Pilula>
		<Centro top={205}><Frase size={156}>As palavras</Frase><Frase size={156}>se repetem</Frase></Centro>
		<Cartao y={570} h={290} em={fw(276, "expressões") - 8} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={122} c="#fff">em expressões</Frase></Cartao>
	</>
);

export const LOTE3: Cena[] = [{ de: 182, C: C182 }, { de: 190, C: C190N }, { de: 216, C: C216 }, { de: 236, C: C236N }, { de: 253, C: C253 }, { de: 261, C: C261 }, { de: 273, C: C273 }];
export const LOTE3_FIM = 286; // primeira frase depois do lote
