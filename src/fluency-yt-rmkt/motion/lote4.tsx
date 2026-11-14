// LOTE 4 (13/11, SISTEMA v2): "Mas como?" · 2 tipos de repetição · legal × funciona · por que aula que ensina não resolve ·
// repetição continuada · o bebê · consciente × subconsciente · os 3 sintomas · escola tradicional · marcha e violão.
// Frases 286 a 451. Régua de AULA + v2 (centralizado, cartão único, azul só na resposta). Versão anterior em motion/_v1/lote4.tsx.bak.
import React from "react";
import { useCurrentFrame } from "remotion";
import { COR, PALCO, DISPLAY, SANS, SOMBRA, Pilula, Cartao, Frase, Apoio, Entra, Traco, fr, fw, Cena } from "./base";

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;
const Check: React.FC<{ em: number; size?: number }> = ({ em, size = 96 }) => <svg width={size} height={size} viewBox="0 0 84 84"><Traco d="M 14 44 L 34 64 L 70 22" em={em} dur={8} cor={COR.verde} larg={13} len={120} /></svg>;
const Xis: React.FC<{ em: number; size?: number }> = ({ em, size = 96 }) => <svg width={size} height={size} viewBox="0 0 84 84"><Traco d="M 16 16 L 68 68" em={em} dur={6} cor={COR.vermelho} larg={13} len={90} /><Traco d="M 68 16 L 16 68" em={em + 4} dur={6} cor={COR.vermelho} larg={13} len={90} /></svg>;
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };
const ANEL = `0 0 0 7px ${COR.azul}, 0 26px 70px rgba(47,91,255,0.28)`;
const LINHA: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 70px", boxSizing: "border-box" };

// OS 2 TIPOS DE REPETIÇÃO: o "mapa" desta parte da aula. `aceso` = qual tipo ele está explicando (0 nenhum, 1 continuada)
const DoisTipos: React.FC<{ em: number; aceso?: number; emAceso?: number; top?: number }> = ({ em, aceso = 0, emAceso = 0, top = 400 }) => {
	const f = useCurrentFrame();
	const slot = (i: number, x: number, nome: string) => {
		const on = aceso === i && f >= emAceso;
		return (
			<Cartao x={x} w={476} y={top} h={330} em={em + (i - 1) * 5} style={on ? { background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" } : undefined}>
				<div style={{ position: "absolute", left: 40, top: 20, fontFamily: DISPLAY, fontWeight: 800, fontSize: 150, letterSpacing: -4, color: on ? "#fff" : "#C9CED8" }}>{i}</div>
				{on ? <div style={{ position: "absolute", left: 40, right: 20, bottom: 34, fontFamily: DISPLAY, fontWeight: 800, fontSize: 60, letterSpacing: -1.8, color: "#fff" }}>{nome}</div> : null}
			</Cartao>
		);
	};
	return <>{slot(1, 48, "Continuada")}{slot(2, 556, "Espaçada")}</>;
};

// 286-291 · "Beleza, Marcos. Mas como?" → repetição: 2 tipos, e você precisa das duas
const C286: React.FC = () => {
	const f = useCurrentFrame(); const t2 = fr(290);
	return (
		<>
			<Pilula>Agora, o como</Pilula>
			{f < t2 ? <Centro top={320}><Entra em={fr(287)}><Frase size={230}>Mas</Frase><Frase size={230} c={COR.azul}>como?</Frase></Entra></Centro> : (
				<>
					<Centro top={185}><Entra em={t2}><Frase size={108}><Azul>2 tipos</Azul> de repetição</Frase></Entra></Centro>
					<DoisTipos em={t2 + 6} />
					<Entra em={fr(291)} style={{ position: "absolute", left: 48, right: 48, top: 810, textAlign: "center" }}><Apoio size={62} c={COR.ink}>Você precisa das duas</Apoio></Entra>
				</>
			)}
		</>
	);
};

// 293-311 · "Eu falei que ia ser legal? Não. Eu falei que ia FUNCIONAR."
const C293: React.FC = () => {
	const tF = fw(295, "funcionar");
	return (
		<>
			<Pilula>Chega de balela</Pilula>
			<Cartao y={200} h={250} em={fr(293)} style={LINHA}><Frase size={140} c={COR.ink2}>Legal?</Frase><Xis em={fr(294)} size={130} /></Cartao>
			<Cartao y={490} h={250} em={tF - 10} style={LINHA}><Frase size={140}>Funciona?</Frase><Check em={tF + 6} size={130} /></Cartao>
			<Entra em={fr(307)} style={{ position: "absolute", left: 70, right: 70, top: 810, textAlign: "center" }}><Apoio size={52}>No meu treinamento tem tudo pronto. <b style={{ color: COR.ink }}>Mas dá pra fazer sozinho.</b></Apoio></Entra>
		</>
	);
};

// 312-321 · por que curso que ENSINA não resolve: te dão a aula → "ah, tá bom" → vira as costas e não entende → porque não treinou
const C312: React.FC = () => {
	const passo = (y: number, em: number, t: string, cor = COR.ink) => (
		<Cartao x={110} w={860} y={y} h={140} em={em} style={{ ...MEIO, fontFamily: SANS, fontWeight: 700, fontSize: 50, letterSpacing: -0.8, color: cor }}>{t}</Cartao>
	);
	return (
		<>
			<Pilula tom={COR.vermelho}>Cursos que querem ensinar inglês</Pilula>
			{passo(170, fr(315), "Uma aula sobre tudo de inglês")}
			{passo(380, fr(316), "“Ah, tá bom.”")}
			{passo(590, fr(317), "Vira as costas e não entende", COR.vermelho)}
			<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}>
				<Traco d="M 540 322 L 540 368 M 518 348 L 540 370 L 562 348" em={fr(316) - 4} dur={8} cor={COR.ink2} larg={8} len={140} />
				<Traco d="M 540 532 L 540 578 M 518 558 L 540 580 L 562 558" em={fr(317) - 4} dur={8} cor={COR.ink2} larg={8} len={140} />
			</svg>
			<Entra em={fr(319)} style={{ position: "absolute", left: 40, right: 40, top: 810, textAlign: "center" }}><Frase size={118} c={COR.vermelho}>Porque não treinou</Frase></Entra>
		</>
	);
};

// 323-335 · TIPO 1: repetição continuada = a mesma coisa, várias vezes (o mesmo bloco se repetindo, com contador)
const C323: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(328); const n = Math.max(0, Math.min(12, Math.floor((f - t0) / 14) + 1));
	return (
		<>
			<Pilula>Tipo 1</Pilula>
			<Centro top={185}><Frase size={94} style={{ whiteSpace: "nowrap" }}>Repetição <Azul>continuada</Azul></Frase></Centro>
			<Cartao y={330} h={430} em={t0}>
				<div style={{ position: "absolute", left: 42, right: 42, top: 42, display: "flex", flexWrap: "wrap", gap: 20 }}>
					{Array.from({ length: n }, (_, i) => (
						<div key={i} style={{ width: 210, height: 102, borderRadius: 24, background: i === n - 1 ? COR.azul : "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
							{[0, 1, 2, 3, 4].map((k) => <div key={k} style={{ width: 12, height: 22 + ((k * 7) % 4) * 14, borderRadius: 6, background: i === n - 1 ? "#fff" : COR.azul }} />)}
						</div>
					))}
				</div>
			</Cartao>
			<Entra em={t0} style={{ position: "absolute", left: 0, right: 0, top: 815, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
				<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 120, letterSpacing: -4, lineHeight: 1, color: COR.azul }}>{n}×</div>
				<Apoio size={58} c={COR.ink}>A mesma coisa,<br /><b>várias vezes</b></Apoio>
			</Entra>
		</>
	);
};

// 336-345 · o bebê: o pai repete "papai" até o dia em que ele fala
const C336: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(338), tB = fr(340); const n = Math.max(0, Math.min(5, Math.floor((f - t0) / 9) + 1));
	return (
		<>
			<Pilula>E o bebê?</Pilula>
			<div style={{ position: "absolute", left: 60, top: 190, width: 700, display: "flex", flexWrap: "wrap", gap: 20 }}>
				{f >= t0 ? Array.from({ length: n }, (_, i) => <div key={i} style={{ padding: "18px 34px", borderRadius: 30, borderBottomLeftRadius: 8, background: "#fff", boxShadow: SOMBRA, fontFamily: SANS, fontWeight: 700, fontSize: 54, color: COR.ink2 }}>papai</div>) : null}
			</div>
			<Entra em={tB} style={{ position: "absolute", right: 60, top: 480, padding: "30px 56px", borderRadius: 44, borderBottomRightRadius: 10, background: COR.verde, boxShadow: "0 26px 70px rgba(14,159,79,0.35)", fontFamily: DISPLAY, fontWeight: 800, fontSize: 130, letterSpacing: -4, color: "#fff" }}>Papai.</Entra>
			<Cartao y={800} h={220} em={fr(344)} style={MEIO}><Frase size={120}>Tudo é <Azul>repetição</Azul></Frase></Cartao>
		</>
	);
};

// CONSCIENTE × SUBCONSCIENTE: duas pistas. Em cima a informação anda devagar (1x); o treino leva pra baixo, onde ela voa.
const Pistas: React.FC<{ rotulo: string; tCon: number; t1x?: number; tTreino?: number; tSub?: number; tVel?: number; cheio?: number; rodape?: [number, React.ReactNode][] }> = ({ rotulo, tCon, t1x = 1e9, tTreino = 1e9, tSub = 1e9, tVel = 1e9, cheio, rodape = [] }) => {
	const f = useCurrentFrame();
	const lento = ((f - tCon) % 150) / 150, rapido = ((f - tSub) % 14) / 14;
	let rod: [number, React.ReactNode] | null = null; for (const r of rodape) if (f >= r[0]) rod = r;
	const fichas = cheio !== undefined ? Math.max(0, Math.min(18, Math.floor((f - cheio) / 5))) : 0;
	const tit: React.CSSProperties = { position: "absolute", left: 44, top: 26, fontFamily: DISPLAY, fontWeight: 800, fontSize: 66, letterSpacing: -2 };
	const vel: React.CSSProperties = { position: "absolute", right: 44, top: 26, fontFamily: DISPLAY, fontWeight: 800, fontSize: 66, letterSpacing: -2 };
	const trilho: React.CSSProperties = { position: "absolute", left: 44, right: 44, top: 186, height: 10, borderRadius: 8, background: "#E6EAF1" };
	const sub = f >= tSub;
	return (
		<>
			<Pilula>{rotulo}</Pilula>
			<Cartao y={175} h={270} em={tCon}>
				<div style={{ ...tit, color: COR.ink }}>Consciente</div>
				{f >= t1x ? <Entra em={t1x} style={{ ...vel, color: COR.ink2 }}>1x</Entra> : null}
				<div style={trilho} />
				{cheio === undefined ? <div style={{ position: "absolute", left: 44 + lento * 850, top: 168, width: 46, height: 46, borderRadius: 23, background: COR.ink2 }} /> : null}
				{cheio !== undefined ? <div style={{ position: "absolute", left: 44, right: 44, top: 116, display: "flex", flexWrap: "wrap", gap: 10 }}>{Array.from({ length: fichas }, (_, i) => <div key={i} style={{ width: 88, height: 36, borderRadius: 10, background: COR.ink2 }} />)}</div> : null}
			</Cartao>
			{f >= tTreino ? (
				<>
					<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}><Traco d="M 540 462 L 540 540 M 514 514 L 540 542 L 566 514" em={tTreino} dur={10} cor={COR.azul} larg={13} len={200} /></svg>
					<Entra em={tTreino} style={{ position: "absolute", left: 590, top: 470, fontFamily: SANS, fontWeight: 700, fontSize: 48, color: COR.azul }}>treino</Entra>
				</>
			) : null}
			<Cartao y={560} h={270} em={Math.min(tSub, cheio ?? 1e9)} style={sub ? { boxShadow: ANEL } : undefined}>
				<div style={{ ...tit, color: sub ? COR.azul : "#C9CED8" }}>Subconsciente</div>
				{f >= tVel ? <Entra em={tVel} style={{ ...vel, color: COR.azul }}>30.000x</Entra> : null}
				<div style={trilho} />
				{sub ? <div style={{ position: "absolute", left: 44 + rapido * 850, top: 168, width: 46, height: 46, borderRadius: 23, background: COR.azul, boxShadow: "-28px 0 0 rgba(47,91,255,0.35), -56px 0 0 rgba(47,91,255,0.15)" }} /> : null}
			</Cartao>
			{rod ? <Entra key={rod[0]} em={rod[0]} style={{ position: "absolute", left: 60, right: 60, top: 885, textAlign: "center" }}><Apoio size={54} c={COR.ink}>{rod[1]}</Apoio></Entra> : null}
		</>
	);
};
// 346-374 · a explicação
const C346: React.FC = () => <Pistas rotulo="Por que funciona" tCon={fw(354, "consciente") - 8} t1x={fr(355)} tTreino={fr(357)} tSub={fr(358)} tVel={fr(366)} rodape={[[fr(359), "Eu li isso num livro"], [fr(371), <>O subconsciente é <b style={{ color: COR.azul }}>30 mil vezes mais veloz</b></>]]} />;

// 389-408 · quem só APRENDEU: 3 sintomas, 1 causa (está tudo no consciente)
const C389: React.FC = () => {
	const sint = (y: number, em: number, t: string) => <Cartao x={60} w={960} y={y} h={130} em={em} style={{ ...MEIO, fontFamily: SANS, fontWeight: 700, fontSize: 54, letterSpacing: -0.8, color: COR.ink }}>{t}</Cartao>;
	return (
		<>
			<Pilula tom={COR.vermelho}>Quem só aprendeu</Pilula>
			{sint(170, fr(394), "“Eu traduzo na cabeça”")}
			{sint(330, fr(396), "“Entendo, mas não crio frases”")}
			{sint(490, fr(404), "“Fico nervoso e dá branco”")}
			<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}><Traco d="M 540 650 L 540 740 M 514 714 L 540 742 L 566 714" em={fr(407)} dur={10} cor={COR.vermelho} larg={13} len={200} /></svg>
			<Cartao y={775} h={230} em={fr(407) + 6} style={{ ...MEIO, boxShadow: `0 0 0 7px ${COR.vermelho}, 0 26px 70px rgba(229,56,59,0.22)` }}><Frase size={92}>Está tudo no <span style={{ color: COR.vermelho }}>consciente</span></Frase></Cartao>
		</>
	);
};

// 409-427 · escola tradicional: enche o consciente de vocabulário; o subconsciente fica vazio
const C409: React.FC = () => <Pistas rotulo="Escolas tradicionais" tCon={fr(409)} t1x={fr(415)} cheio={fr(411)} rodape={[[fr(412), "Um vocabulário gigantesco que você não sabe usar"], [fr(414), <>Porque você <b style={{ color: COR.vermelho }}>não tem velocidade</b></>], [fr(426), "Você não treinou. Não levou pro subconsciente"]]} />;

// 428-451 · exemplos do que já está no subconsciente: mudar de marcha, tocar violão conversando
const C428: React.FC = () => {
	const f = useCurrentFrame(); const tM = fr(430), tV = fr(433), tS = fr(445), tI = fr(446);
	const pos = [[150, 110], [150, 250], [225, 110], [225, 250], [300, 110]]; const k = Math.floor((f - tM) / 18) % pos.length; const [kx, ky] = pos[Math.max(0, k)];
	const baixo = Math.floor((f - tV) / 8) % 2 === 0;
	const cartao = (x: number, em: number, t: string, des: React.ReactNode) => (
		<Cartao x={x} w={476} y={180} h={540} em={em}>
			<svg width={450} height={360} style={{ position: "absolute", left: 13, top: 30 }}>{des}</svg>
			<div style={{ position: "absolute", left: 10, right: 10, bottom: 46, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 52, letterSpacing: -1.6, whiteSpace: "nowrap", color: COR.ink }}>{t}</div>
		</Cartao>
	);
	return (
		<>
			<Pilula>Você já faz isso</Pilula>
			{cartao(48, tM, "Mudar de marcha", <><path d="M 150 110 V 250 M 225 110 V 250 M 300 110 V 180 M 150 180 H 300" fill="none" stroke="#DCE1EA" strokeWidth={16} strokeLinecap="round" /><circle cx={kx} cy={ky} r={32} fill={COR.azul} /></>)}
			{f >= tV ? cartao(556, tV, "Violão", <>{[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={70} x2={380} y1={90 + i * 36} y2={90 + i * 36} stroke="#DCE1EA" strokeWidth={6} />)}<path d={baixo ? "M 225 70 V 290 M 190 250 L 225 292 L 260 250" : "M 225 290 V 70 M 190 110 L 225 68 L 260 110"} fill="none" stroke={COR.azul} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" /></>) : null}
			{f >= tI
				? <Cartao key="i" y={770} h={250} em={tI} style={{ ...MEIO, padding: "0 30px", boxSizing: "border-box" }}><Frase size={82}>Conversar em inglês é<br /><Azul>a mesma coisa</Azul></Frase></Cartao>
				: <Cartao key="s" y={770} h={250} em={tS} style={MEIO}><Frase size={92}>Está no <Azul>subconsciente</Azul></Frase></Cartao>}
		</>
	);
};

export const LOTE4: Cena[] = [{ de: 283, C: C286 }, { de: 293, C: C293 }, { de: 312, C: C312 }, { de: 323, C: C323 }, { de: 336, C: C336 }, { de: 346, C: C346 }, { de: 389, C: C389 }, { de: 409, C: C409 }, { de: 428, C: C428 }];
export const LOTE4_FIM = 456; // primeira frase depois do lote
