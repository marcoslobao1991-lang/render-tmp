// DESENHOS do remake (15/11, 3ª versão: "a edição tem que reduzir o esforço cognitivo… você empilha um monte de coisa").
// Regra: cada desenho é UMA coisa só, na zona de cima (1080 × 812). Sem etiqueta, sem título, sem cartão de frase trocando:
// o texto que guia é a FAIXA (uma frase parada por ponto), que fica sempre no mesmo lugar. Aqui só entra o que a fala não mostra sozinha.
import React from "react";
import { Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import { COR, DISPLAY, SANS, SOMBRA, Cartao, Frase, Entra, Riscada, Traco, ap, s, w, MEIO, AZUL_CHEIO, Xis, Carimbo, agora } from "./base";

const NOITE = "#0F172A";
const c01 = (x: number) => Math.max(0, Math.min(1, x));
const Rot: React.FC<{ children: React.ReactNode; c?: string; size?: number; style?: React.CSSProperties }> = ({ children, c = COR.ink2, size = 42, style }) => (
	<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: size, letterSpacing: -0.4, color: c, ...style }}>{children}</div>
);
const Barra: React.FC<{ p: number; cor?: string; h?: number; style?: React.CSSProperties }> = ({ p, cor = COR.azul, h = 34, style }) => (
	<div style={{ height: h, borderRadius: 99, background: "#EEF1F6", ...style }}><div style={{ width: `${c01(p) * 100}%`, height: "100%", borderRadius: 99, background: cor }} /></div>
);
const No: React.FC<{ x: number; y: number; wd: number; h?: number; em?: number; az?: boolean; size?: number; children: React.ReactNode }> = ({ x, y, wd, h = 170, em, az, size = 72, children }) => {
	const f = useCurrentFrame(); if (em !== undefined && f < em) return null;
	const corpo = <div style={{ width: wd, height: h, borderRadius: 40, background: az ? COR.azul : "#fff", boxShadow: az ? "0 22px 56px rgba(47,91,255,0.34)" : SOMBRA, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: size, letterSpacing: -size * 0.03, lineHeight: 1.02, color: az ? "#fff" : COR.ink, padding: "0 20px", boxSizing: "border-box" }}>{children}</div>;
	return em !== undefined ? <Entra em={em} style={{ position: "absolute", left: x, top: y }}>{corpo}</Entra> : <div style={{ position: "absolute", left: x, top: y }}>{corpo}</div>;
};

// ── episódio 1 → 2 → 3: o quanto de cada um você já treinou no anterior
const Eps = (t1: number, t2: number, t3: number): React.FC => () => {
	const f = useCurrentFrame();
	const eps: [number, number, string, string, string][] = [[t1, 100, "Episódio 1", "entendido", COR.verde], [t2, 79, "Episódio 2", "já treinado", COR.azul], [t3, 88, "Episódio 3", "já treinado", COR.azul]];
	return <>{eps.map(([em, pct, t, sub, cor], i) => {
		const p = ap(f, em + 4, 26); const vivo = f >= em;
		return (
			<Cartao key={i} y={70 + i * 232} h={206} style={{ opacity: vivo ? 1 : 0.45 }}>
				<div style={{ position: "absolute", left: 44, top: 30, fontFamily: DISPLAY, fontWeight: 800, fontSize: 68, letterSpacing: -2, color: COR.ink }}>{t}</div>
				{vivo ? <div style={{ position: "absolute", right: 44, top: 40, fontFamily: SANS, fontWeight: 700, fontSize: 42, color: cor }}>{Math.round(pct * p)}% {sub}</div> : null}
				<Barra p={vivo ? (pct * p) / 100 : 0} cor={cor} h={30} style={{ position: "absolute", left: 44, right: 44, bottom: 36 }} />
			</Cartao>
		);
	})}</>;
};
export const EpsLead = Eps(w(43, 45, "primeiro"), w(47, 49, "segundo"), w(52, 53, "cada"));
export const EpsAula = Eps(w(875.5, 878.2, "risada") - 40, w(886.5, 888, "segundo") - 6, w(889, 890.5, "Terceiro") - 6);

// ── o vídeo do YouTube (prova real)
export const Youtube: React.FC = () => (
	<Cartao y={70} h={680}>
		<Img src={staticFile("fluency-remake/yt-thumb.jpg")} style={{ position: "absolute", left: 20, top: 20, width: 944, height: 531, objectFit: "cover", borderRadius: 30 }} />
		<div style={{ position: "absolute", left: 40, bottom: 34, fontFamily: DISPLAY, fontWeight: 800, fontSize: 56, letterSpacing: -1.6, color: COR.ink }}>420 mil visualizações</div>
	</Cartao>
);

// ── as promessas do mercado: uma por vez no mesmo lugar, e o carimbo
export const Promessas: React.FC = () => {
	const f = useCurrentFrame();
	const prom = agora(f, [[w(163, 166, "divertindo"), "Aprenda se divertindo"], [w(164, 166.6, "dormindo"), "Aprenda dormindo"], [w(166, 168.4, "três"), "Fluente em 3 meses"], [w(168, 170.8, "oito"), "Fluente em 8 semanas"]] as [number, string][]);
	const tB = w(173, 176.4, "balela");
	return (
		<>
			<Cartao y={170} h={470} style={MEIO}>
				{prom ? <Entra key={prom[0]} em={prom[0]}><Frase size={84} c={f >= tB ? "#B8C0CF" : COR.ink} style={{ whiteSpace: "nowrap" }}>{prom[1]}</Frase></Entra> : <Frase size={84} c="#B8C0CF" style={{ whiteSpace: "nowrap" }}>Sem esforço</Frase>}
			</Cartao>
			<Carimbo em={tB} x={540} y={405} size={150}>balela</Carimbo>
		</>
	);
};

// ── as 2 camadas (o desenho que atravessa a 1ª aula)
const Camadas: React.FC<{ em1?: number; em2?: number; aceso1?: boolean; aceso2?: boolean; sub1?: string; t2?: string; l1?: React.ReactNode; l2?: React.ReactNode; barreira?: number }> = ({ em1, em2, aceso1, aceso2, sub1 = "consciente · rasa", t2 = "Camada 2", l1, l2, barreira }) => {
	const f = useCurrentFrame();
	return (
		<>
			<Cartao y={80} h={220} em={em1} style={{ boxShadow: aceso1 ? `0 0 0 8px ${COR.ink}, ${SOMBRA}` : SOMBRA }}>
				<div style={{ position: "absolute", left: 48, top: 40, fontFamily: DISPLAY, fontWeight: 800, fontSize: 84, letterSpacing: -2.6, color: COR.ink, whiteSpace: "nowrap" }}>Camada 1</div>
				<div style={{ position: "absolute", left: 50, top: 140, fontFamily: SANS, fontWeight: 600, fontSize: 42, color: COR.ink2, whiteSpace: "nowrap" }}>{sub1}</div>
				<div style={{ position: "absolute", right: 40, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>{l1}</div>
			</Cartao>
			<Cartao y={324} h={410} em={em2 ?? em1} style={{ background: aceso2 ? COR.azul : NOITE, boxShadow: aceso2 ? "0 26px 70px rgba(47,91,255,0.38)" : SOMBRA }}>
				<div style={{ position: "absolute", left: 48, top: 44, fontFamily: DISPLAY, fontWeight: 800, fontSize: t2.length > 10 ? 66 : 84, letterSpacing: -2.6, color: aceso2 ? "#fff" : "#8A94A8", whiteSpace: "nowrap" }}>{t2}</div>
				<div style={{ position: "absolute", left: 48, right: 48, top: 170, bottom: 40, display: "flex", alignItems: "center" }}>{l2}</div>
			</Cartao>
			{barreira !== undefined && f >= barreira ? <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", justifyContent: "center" }}><div style={{ width: 124, height: 124, borderRadius: 99, background: "#fff", boxShadow: SOMBRA, display: "flex", alignItems: "center", justifyContent: "center" }}><Xis em={barreira} size={84} /></div></div> : null}
		</>
	);
};
const Item: React.FC<{ em: number; children: React.ReactNode }> = ({ em, children }) => (
	<Entra key={em} em={em} dy={-30}><div style={{ padding: "18px 32px", borderRadius: 99, background: "#EEF1F6", fontFamily: SANS, fontWeight: 700, fontSize: 44, letterSpacing: -0.5, color: COR.ink, whiteSpace: "nowrap" }}>{children}</div></Entra>
);
const Dentro: React.FC<{ em: number; children: React.ReactNode; c?: string }> = ({ em, children, c = "#fff" }) => (
	<Entra key={em} em={em}><div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 72, letterSpacing: -2.2, lineHeight: 1.04, color: c }}>{children}</div></Entra>
);
// 3:04 · as duas aparecem; a 1ª acende; as promessas caem todas nela
export const Camadas1: React.FC = () => {
	const f = useCurrentFrame();
	const tD = w(184, 187.4, "duas"), t1 = w(189.5, 191.5, "primeira"), tP = w(194, 197, "promessas");
	const cai = agora(f, [[w(195, 198.2, "rápido"), "rápido e fácil"], [w(196.5, 199, "divertindo"), "se divertindo"], [w(197.5, 199.8, "dormindo"), "dormindo"], [w(198.5, 201.5, "dica"), "dica solta"]] as [number, string][]);
	return <Camadas em1={tD} em2={tD + 10} aceso1={f >= t1} sub1={f >= t1 ? "consciente · superficial e rasa" : "consciente"} l1={f >= tP && cai ? <Item em={cai[0]}>{cai[1]}</Item> : null} />;
};
// 3:24 · a palavra nova entra na camada 1 e NÃO desce
export const Camadas2: React.FC = () => {
	const f = useCurrentFrame();
	const tV = w(208.9, 211.5, "vídeos"), tN = w(219.6, 220.8, "Só"), tU = w(221.5, 225.2, "usar");
	return <Camadas aceso1 l1={f >= tV ? <Item em={tV}>a palavra nova</Item> : null} barreira={tN} l2={f >= tU ? <Dentro em={tU}>Você não consegue <span style={{ color: "#FF8A8C" }}>usar</span></Dentro> : null} />;
};
// 4:16 · a camada 2 acende: é a resposta
export const Camadas3: React.FC = () => {
	const f = useCurrentFrame();
	const t2 = w(259.6, 263, "camada"), tT = w(266.5, 269, "traduzir"), tS = w(282, 285, "subconsciente");
	return <Camadas aceso2={f >= t2} t2={f >= tS ? "Camada 2 · subconsciente" : "Camada 2"} l2={f >= tT ? <Dentro em={tT}>Sem traduzir mentalmente</Dentro> : f >= t2 ? <Dentro em={t2}>Tudo no automático</Dentro> : null} />;
};

// ── 30.000×: a corrida da tartaruga com o foguete
const Tartaruga: React.FC<{ x: number; y: number; k?: number; passo?: number }> = ({ x, y, k = 1, passo = 0 }) => (
	<g transform={`translate(${x} ${y}) scale(${k})`}>
		<rect x={-58} y={-8 + passo} width={26} height={34} rx={11} fill="#3E8E5A" /><rect x={26} y={-8 - passo} width={26} height={34} rx={11} fill="#3E8E5A" />
		<circle cx={86} cy={-26} r={26} fill="#4FA56D" /><circle cx={96} cy={-32} r={5} fill={COR.ink} />
		<path d="M -92 -6 C -92 -92 76 -92 76 -6 Z" fill="#2F7A4A" /><path d="M -50 -6 C -50 -58 34 -58 34 -6" fill="none" stroke="#8ED0A4" strokeWidth={7} /><path d="M -8 -68 L -8 -6" stroke="#8ED0A4" strokeWidth={7} />
	</g>
);
const Foguete: React.FC<{ x: number; y: number; k?: number; chama?: number }> = ({ x, y, k = 1, chama = 1 }) => (
	<g transform={`translate(${x} ${y}) scale(${k})`}>
		<path d={`M -70 -16 L ${-110 - 90 * chama} 0 L -70 16 Z`} fill="#FFB020" /><path d={`M -70 -9 L ${-96 - 44 * chama} 0 L -70 9 Z`} fill="#fff" />
		<path d="M -74 -30 L -40 -30 L -20 -62 L -62 -62 Z" fill="#1E3FCC" /><path d="M -74 30 L -40 30 L -20 62 L -62 62 Z" fill="#1E3FCC" />
		<path d="M -76 -30 L 40 -30 C 84 -30 118 -10 124 0 C 118 10 84 30 40 30 L -76 30 Z" fill={COR.azul} /><circle cx={40} cy={0} r={15} fill="#fff" />
	</g>
);
export const Corrida: React.FC = () => {
	const f = useCurrentFrame();
	const t30 = w(291.5, 294.6, "30"), tTar = w(300.5, 303, "tartaruga"), tFog = w(307.5, 310.6, "foguete");
	const n = Math.round(30000 * ap(f, t30, 34));
	const andar = c01((f - tTar) / (s(313.4) - tTar)), voo = ap(f, tFog, 26);
	return (
		<>
			<div style={{ position: "absolute", left: 0, right: 0, top: 50, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 230, letterSpacing: -9, lineHeight: 1, color: f >= t30 ? COR.azul : "#D5DBE7", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{f >= t30 ? n.toLocaleString("pt-BR") : "0"}×</div>
			<Cartao y={320} h={430} em={tTar - 20}>
				<Rot style={{ position: "absolute", left: 40, top: 24 }}>Consciente</Rot>
				<Rot style={{ position: "absolute", left: 40, top: 226 }} c={f >= tFog ? COR.azul : "#B8C0CF"}>Subconsciente</Rot>
				<svg width={984} height={430} style={{ position: "absolute", inset: 0 }}>
					<rect x={40} y={186} width={904} height={8} rx={4} fill="#E3E8F1" /><rect x={40} y={392} width={904} height={8} rx={4} fill="#E3E8F1" />
					{f >= tTar ? <Tartaruga x={150 + andar * 70} y={176} k={0.92} passo={Math.sin(f / 5) * 3} /> : null}
					{f >= tFog ? <><rect x={40} y={340} width={Math.max(0, 80 + voo * 640)} height={10} rx={5} fill="rgba(47,91,255,0.22)" /><Foguete x={180 + voo * 640} y={345} k={0.9} chama={0.6 + 0.4 * Math.sin(f / 2)} /></> : null}
				</svg>
			</Cartao>
		</>
	);
};

// ── matéria de escola (riscada) → habilidade
export const Materia: React.FC = () => {
	const tHab = w(363, 366, "habilidade");
	return (
		<>
			<Cartao y={90} h={280} style={MEIO}><Frase size={104} style={{ whiteSpace: "nowrap" }}><Riscada em={tHab}>matéria de escola</Riscada></Frase></Cartao>
			<Cartao y={410} h={330} em={tHab - 4} style={{ ...MEIO, ...AZUL_CHEIO }}><Frase size={170} c="#fff" style={{ whiteSpace: "nowrap" }}>habilidade</Frase></Cartao>
		</>
	);
};

// ── o embolado que o ouvido treinado separa em palavras
const Embolado = (abreEm: number | null, fim: number): React.FC => () => {
	const f = useCurrentFrame();
	const abre = abreEm === null ? 0 : ap(f, abreEm, fim - abreEm);
	const ps = ["What", "do", "you", "want", "to", "do?"];
	return (
		<Cartao y={170} h={470}>
			<Rot style={{ position: "absolute", left: 48, top: 40 }} c={abre > 0.5 ? COR.azul : COR.ink2}>{abre > 0.5 ? "com o ouvido treinado" : "o que você escuta"}</Rot>
			<div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center", gap: abre * 12 }}>
				{ps.map((p, i) => <div key={i} style={{ padding: `${12 * abre}px ${abre * 16}px`, borderRadius: 24, background: abre > 0.5 ? "#EEF1F6" : "transparent", fontFamily: DISPLAY, fontWeight: 800, fontSize: interpolate(abre, [0, 1], [96, 58]), letterSpacing: interpolate(abre, [0, 1], [-7, -1.4]), color: abre > 0.5 ? COR.ink : COR.ink2, filter: abre < 0.5 ? `blur(${(0.5 - abre) * 7}px)` : undefined }}>{abre < 0.5 ? p.replace("?", "").toLowerCase() : p}</div>)}
			</div>
		</Cartao>
	);
};
export const Embolado0 = Embolado(null, 0);
export const Embolado1 = Embolado(w(505.8, 508, "treina"), w(508, 510.2, "palavras") + 10);

// ── palavras soltas → um bloco
export const Bloco: React.FC = () => {
	const f = useCurrentFrame();
	const tUma = w(536, 538.2, "uma"), tBl = w(538.5, 540.3, "blocos");
	const junta = ap(f, tBl - 4, 12);
	return (
		<Cartao y={170} h={470}>
			<Rot style={{ position: "absolute", left: 48, top: 40 }} c={junta > 0.5 ? COR.azul : COR.ink2}>{junta > 0.5 ? "um bloco de conversa" : "palavra por palavra"}</Rot>
			<div style={{ position: "absolute", left: 0, right: 0, top: 170, display: "flex", justifyContent: "center" }}>
				<div style={{ display: "flex", gap: (1 - junta) * 26, padding: junta > 0.5 ? "26px 44px" : 0, borderRadius: 34, background: junta > 0.5 ? COR.azul : "transparent" }}>
					{["Do", "you", "want", "to"].map((p, i) => <div key={i} style={{ padding: junta > 0.5 ? "0 11px" : "22px 30px", borderRadius: 26, background: junta > 0.5 ? "transparent" : "#EEF1F6", fontFamily: DISPLAY, fontWeight: 800, fontSize: 88, letterSpacing: -2.6, color: junta > 0.5 ? "#fff" : COR.ink }}>{f >= tUma && junta <= 0.5 ? <Riscada em={tUma + i * 3}>{p}</Riscada> : p}</div>)}
				</div>
			</div>
		</Cartao>
	);
};

// ── mapas da aula (cada nó entra na palavra)
export const Mapa1: React.FC = () => {
	const tH = w(562, 565, "habilidade"), tT = w(564.5, 566.3, "treinadas"), tO = w(567, 569.5, "ouvido"), tFa = w(569.5, 571.4, "fala");
	return (
		<>
			<No x={48} y={70} wd={984} h={190} size={84} em={tH - 14}>Habilidade</No>
			<svg width={1080} height={812} style={{ position: "absolute", left: 0, top: 0 }}><Traco d="M 540 272 L 540 304" em={tT - 6} cor={COR.azul} larg={12} /><Traco d="M 540 518 L 300 556 M 540 518 L 780 556" em={tO - 6} cor={COR.azul} larg={12} /></svg>
			<No x={48} y={316} wd={984} h={190} size={84} em={tT - 4} az>Treino</No>
			<No x={48} y={566} wd={480} h={190} size={80} em={tO - 4}>Escuta</No>
			<No x={552} y={566} wd={480} h={190} size={80} em={tFa - 4}>Fala</No>
		</>
	);
};
export const Mapa2: React.FC = () => {
	const nos: [number, string, boolean?][] = [[w(678, 680.5, "subconsciente") - 20, "Subconsciente"], [w(682, 684.3, "treinar") - 4, "Treino"], [w(685, 687, "escuta") - 4, "Escuta + fala"], [w(690.5, 692.8, "repetição") - 6, "Repetição", true]];
	return (
		<>
			<svg width={1080} height={812} style={{ position: "absolute", left: 0, top: 0 }}>{[0, 1, 2].map((i) => <Traco key={i} d={`M 540 ${218 + i * 184} L 540 ${238 + i * 184}`} em={nos[i + 1][0] - 4} cor={COR.azul} larg={12} />)}</svg>
			{nos.map(([em, t, az], i) => <No key={i} x={48} y={60 + i * 184} wd={984} h={156} size={76} em={em} az={az}>{t}</No>)}
		</>
	);
};

// ── 500 palavras = 90 %
export const Quinhentas: React.FC = () => {
	const f = useCurrentFrame();
	const t500 = w(583.5, 585.6, "500"), t90 = w(586.5, 588.5, "90");
	const n = Math.round(500 * ap(f, t500, 26)), p90 = ap(f, t90, 30) * 0.9;
	return (
		<>
			<div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 290, letterSpacing: -11, lineHeight: 1, color: COR.azul, fontVariantNumeric: "tabular-nums" }}>{f >= t500 ? n : 0}</div>
			<div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center" }}><Frase size={104}>palavras</Frase></div>
			<Cartao y={500} h={250} em={t90 - 8}>
				<div style={{ position: "absolute", left: 44, top: 30, fontFamily: DISPLAY, fontWeight: 800, fontSize: 60, letterSpacing: -1.8, color: COR.ink, whiteSpace: "nowrap" }}>do inglês do dia a dia</div>
				<div style={{ position: "absolute", right: 44, top: 20, fontFamily: DISPLAY, fontWeight: 800, fontSize: 80, letterSpacing: -2.4, color: COR.azul }}>{Math.round(p90 * 100)}%</div>
				<Barra p={p90} h={40} style={{ position: "absolute", left: 44, right: 44, bottom: 44 }} />
			</Cartao>
		</>
	);
};

// ── calculadora de palavras (Friends)
export const Calculadora: React.FC = () => {
	const f = useCurrentFrame();
	const t800 = w(605.5, 608.3, "800"), t100 = w(612.5, 615.8, "100");
	const ps = [["you", w(608.3, 610, "you")], ["that", w(609.3, 609.9, "that")], ["me", w(609.8, 610.3, "me")], ["I", w(610.2, 610.7, "I")], ["who", w(610.6, 611.1, "who")], ["what", w(611, 611.5, "what")], ["how", w(611.5, 612.1, "how")]] as [string, number][];
	const n = Math.round(800 * ap(f, t800 - 6, 24));
	return (
		<Cartao y={50} h={712} style={{ background: NOITE }}>
			<Rot c="#A9B4C7" style={{ position: "absolute", left: 44, top: 34 }}>Friends · 1 temporada inteira</Rot>
			<div style={{ position: "absolute", left: 44, top: 96, fontFamily: DISPLAY, fontWeight: 800, fontSize: 200, letterSpacing: -7, lineHeight: 1, color: f >= t800 - 6 ? "#fff" : "#3A4660", fontVariantNumeric: "tabular-nums" }}>{f >= t800 - 6 ? n : 0}</div>
			<div style={{ position: "absolute", right: 44, top: 136, width: 400, fontFamily: SANS, fontWeight: 700, fontSize: 44, lineHeight: 1.16, color: "#C9D3E6", textAlign: "right" }}>palavras diferentes por episódio</div>
			<div style={{ position: "absolute", left: 44, right: 44, top: 350, display: "flex", flexWrap: "wrap", gap: 18 }}>
				{ps.map(([p, em]) => f >= em ? (
					<Entra key={p} em={em} dy={18}><div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 26px", borderRadius: 26, background: "#fff" }}>
						<span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 66, letterSpacing: -1.8, color: COR.ink }}>{p}</span>
						{f >= t100 ? <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 40, color: COR.azul }}>100+×</span> : null}
					</div></Entra>
				) : null)}
			</div>
		</Cartao>
	);
};

// ── método tradicional: as semanas passam, a fluência não sai do zero
export const Semana: React.FC = () => {
	const f = useCurrentFrame();
	const tSem = w(634.6, 636.5, "semana");
	const sem = f >= tSem ? Math.min(24, 1 + Math.floor((f - tSem) / 7)) : 1;
	return (
		<Cartao y={110} h={590}>
			<div style={{ position: "absolute", left: 48, top: 44, fontFamily: DISPLAY, fontWeight: 800, fontSize: 170, letterSpacing: -6, lineHeight: 1, color: COR.ink, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>Semana {sem}</div>
			<Rot style={{ position: "absolute", left: 50, top: 256 }} size={48}>assuntos novos</Rot>
			<Barra p={sem / 24} cor={COR.ink} h={38} style={{ position: "absolute", left: 48, right: 48, top: 330 }} />
			<Rot style={{ position: "absolute", left: 50, top: 410 }} size={48} c={COR.vermelho}>fluência no que já viu</Rot>
			<Barra p={0.03} cor={COR.vermelho} h={38} style={{ position: "absolute", left: 48, right: 48, top: 484 }} />
		</Cartao>
	);
};

// ── repetição continuada: a mesma frase ficando nítida a cada volta
export const Continuada: React.FC = () => {
	const f = useCurrentFrame();
	const tRep = w(713.5, 716, "repete"), fim = s(736.2);
	const N = 8; const k = Math.max(0, Math.min(N - 1, Math.floor(((f - tRep) / (fim - tRep)) * N)));
	const nit = f < tRep ? 0 : k / (N - 1);
	return (
		<Cartao y={150} h={510}>
			<Rot style={{ position: "absolute", left: 48, top: 40 }} size={48}>{f >= tRep ? `${k + 1}ª vez ouvindo` : "1ª vez ouvindo"}</Rot>
			<div style={{ position: "absolute", left: 0, right: 0, top: 180, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 100, letterSpacing: interpolate(nit, [0, 1], [-8, -2.8]), color: nit > 0.85 ? COR.azul : COR.ink, filter: `blur(${(1 - nit) * 12}px)`, whiteSpace: "nowrap" }}>{nit > 0.5 ? "What do you want?" : "whaddayawant"}</div>
			<div style={{ position: "absolute", left: 48, right: 48, bottom: 60, display: "flex", gap: 14 }}>{Array.from({ length: N }).map((_, i) => <div key={i} style={{ flex: 1, height: 26, borderRadius: 99, background: i <= k && f >= tRep ? COR.azul : "#EEF1F6" }} />)}</div>
		</Cartao>
	);
};
// ── repetição espaçada: hoje, +1, +3, +7 dias
export const Espacada: React.FC = () => {
	const f = useCurrentFrame();
	const tRev = w(739.5, 741.5, "revê");
	const dias = ["hoje", "+1 dia", "+3 dias", "+7 dias"];
	const pos = Math.min(3, Math.max(0, (f - tRev) / 22)); const aceso = f < tRev ? 0 : Math.floor(pos);
	return (
		<Cartao y={170} h={470}>
			<svg width={984} height={470} style={{ position: "absolute", inset: 0 }}><rect x={110} y={170} width={764} height={12} rx={6} fill="#E3E8F1" /><rect x={110} y={170} width={(764 * pos) / 3} height={12} rx={6} fill={COR.azul} /></svg>
			{dias.map((d, i) => (
				<div key={d} style={{ position: "absolute", left: 110 + i * 254.6 - 110, top: 116, width: 220, textAlign: "center" }}>
					<div style={{ width: 120, height: 120, margin: "0 auto", borderRadius: 99, background: i <= aceso ? COR.azul : "#EEF1F6" }} />
					<div style={{ marginTop: 30, fontFamily: DISPLAY, fontWeight: 800, fontSize: 56, letterSpacing: -1.6, color: i <= aceso ? COR.ink : "#B8C0CF", whiteSpace: "nowrap" }}>{d}</div>
				</div>
			))}
		</Cartao>
	);
};

// ── treino concentrado: o idioma inteiro → 1 episódio → 1 minuto
export const Funil: React.FC = () => {
	const f = useCurrentFrame();
	const tId = w(783.7, 786.2, "idioma"), tEp = w(789, 791.5, "episódio"), tMin = w(795, 797.8, "minuto");
	const linhas: [number, number, string][] = [[tId - 4, 984, "O idioma inteiro"], [tEp - 6, 660, "1 episódio"], [tMin - 6, 440, "1 minuto"]];
	return (
		<>
			{linhas.map(([em, wd, t], i) => f >= em ? (
				<Entra key={i} em={em} style={{ position: "absolute", left: (1080 - wd) / 2, top: 60 + i * 240, width: wd, height: 204, borderRadius: 44, background: i === 2 ? COR.azul : "#fff", boxShadow: i === 2 ? "0 22px 56px rgba(47,91,255,0.36)" : SOMBRA, display: "flex", alignItems: "center", justifyContent: "center" }}>
					<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 84, letterSpacing: -2.6, color: i === 2 ? "#fff" : i + 1 < 3 && f >= linhas[i + 1][0] ? "#B8C0CF" : COR.ink, whiteSpace: "nowrap" }}>{t}</div>
				</Entra>
			) : null)}
			<svg width={1080} height={812} style={{ position: "absolute", left: 0, top: 0 }}><Traco d="M 540 270 L 540 294" em={tEp - 8} cor={COR.azul} larg={12} /><Traco d="M 540 510 L 540 534" em={tMin - 8} cor={COR.azul} larg={12} /></svg>
		</>
	);
};

// ── o mesmo minuto em loop
export const LoopMinuto: React.FC = () => {
	const f = useCurrentFrame();
	const tEsc = w(819, 821.5, "escutando"), t0 = s(812.85);
	const volta = 1 + Math.floor(Math.max(0, f - tEsc) / 30);
	return (
		<Cartao y={90} h={630} style={{ background: NOITE }}>
			<div style={{ position: "absolute", left: 48, top: 44, fontFamily: DISPLAY, fontWeight: 800, fontSize: 84, letterSpacing: -2.6, color: "#fff", whiteSpace: "nowrap" }}>O mesmo minuto</div>
			<svg width={984} height={630} style={{ position: "absolute", inset: 0 }}>{Array.from({ length: 30 }).map((_, i) => { const hh = 20 + Math.abs(Math.sin(f / 3.3 + i * 0.9) * Math.sin(i * 0.37 + f / 17)) * 130; return <rect key={i} x={104 + i * 26} y={330 - hh / 2} width={14} height={hh} rx={7} fill="#fff" />; })}</svg>
			<div style={{ position: "absolute", left: 48, right: 48, bottom: 120, height: 16, borderRadius: 99, background: "rgba(255,255,255,0.2)" }}><div style={{ width: `${(((f - t0) % 30) / 30) * 100}%`, height: "100%", borderRadius: 99, background: "#fff" }} /></div>
			<div style={{ position: "absolute", left: 48, bottom: 40, fontFamily: SANS, fontWeight: 700, fontSize: 46, color: "#fff" }}>em loop</div>
			<div style={{ position: "absolute", right: 48, bottom: 28, fontFamily: DISPLAY, fontWeight: 800, fontSize: 68, letterSpacing: -2, color: "#9DB4FF", fontVariantNumeric: "tabular-nums" }}>{volta}ª vez</div>
		</Cartao>
	);
};

// ── o episódio dividido em trechos, um por vez, até 100 %
export const Trechos: React.FC = () => {
	const f = useCurrentFrame();
	const tTre = w(850.5, 853, "trecho"), t100 = w(853, 855.9, "100");
	const N = 10; const feitos = Math.min(N, Math.floor(Math.max(0, f - tTre) / ((t100 - tTre) / N)));
	return (
		<Cartao y={150} h={510}>
			<Rot style={{ position: "absolute", left: 48, top: 40 }} size={48}>seu primeiro episódio</Rot>
			<div style={{ position: "absolute", left: 48, right: 48, top: 140, display: "flex", gap: 12 }}>
				{Array.from({ length: N }).map((_, i) => <div key={i} style={{ flex: 1, height: 170, borderRadius: 20, background: i < feitos ? COR.verde : i === feitos && f >= tTre ? COR.azul : "#EEF1F6" }} />)}
			</div>
			<div style={{ position: "absolute", left: 48, bottom: 50, fontFamily: DISPLAY, fontWeight: 800, fontSize: 92, letterSpacing: -2.8, color: feitos >= N ? COR.verde : COR.ink, fontVariantNumeric: "tabular-nums" }}>{feitos * 10}% entendido</div>
		</Cartao>
	);
};
