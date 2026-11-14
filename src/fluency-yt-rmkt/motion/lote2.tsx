// LOTE 2 (13/11, SISTEMA v2): repetição é a base · fluência essencial · só 2 coisas (ouvido e fala) · o ouvido se lapida · Bruce Lee.
// Frases 86 a 179. Régua de AULA (1 quadro = 1 ponto, parado; desenho só onde ensina) + v2: centralizado, cartão único, azul só na resposta.
// Versão anterior em motion/_v1/lote2.tsx.bak.
import React from "react";
import { useCurrentFrame } from "remotion";
import { COR, DISPLAY, SANS, SOMBRA, Pilula, Cartao, Frase, Apoio, Entra, Traco, ap, fr, fw, Cena } from "./base";

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;
const Check: React.FC<{ em: number; size?: number; cor?: string }> = ({ em, size = 84, cor = COR.verde }) => (
	<svg width={size} height={size} viewBox="0 0 84 84"><Traco d="M 14 44 L 34 64 L 70 22" em={em} dur={8} cor={cor} larg={13} len={120} /></svg>
);
const AZUL_CHEIO: React.CSSProperties = { background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" };
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };

// 86-100 · "Então eu tenho que treinar? Sim. E repetir? Sim." → REPETIÇÃO, a base de todo o método
const C86: React.FC = () => {
	const f = useCurrentFrame(); const tR = fr(91);
	const linha = (y: number, txt: string, emT: number, emS: number) => (
		<Cartao y={y} h={250} em={emT} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 70px", boxSizing: "border-box" }}>
			<Frase size={130}>{txt}</Frase><Check em={emS} size={130} />
		</Cartao>
	);
	return (
		<>
			<Pilula>A base</Pilula>
			{f < tR ? <>{linha(220, "Treinar?", fr(86), fr(87))}{linha(510, "Repetir?", fr(88), fr(89))}</> : (
				<>
					<Cartao y={260} h={340} em={tR} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={184} c="#fff">Repetição</Frase></Cartao>
					<Entra em={fw(94, "base")} style={{ position: "absolute", left: 48, right: 48, top: 690, textAlign: "center" }}><Apoio size={60} c={COR.ink}>É a base de todo o método</Apoio></Entra>
				</>
			)}
		</>
	);
};

// 109-114 · fluência = fluir sem pensar: a palavra gigante e, no cartão, a linha que FLUI sem parar
const C109: React.FC = () => {
	const f = useCurrentFrame(); const tF = fw(109, "fluir");
	const onda = (amp: number, fase: number) => Array.from({ length: 83 }, (_, i) => `${i ? "L" : "M"} ${i * 12} ${90 + Math.sin(i / 7 - f / 10 + fase) * amp}`).join(" ");
	return (
		<>
			<Pilula>O que é fluência</Pilula>
			<Centro top={205}><Frase size={236}>Fluência</Frase></Centro>
			<Cartao y={490} h={400} em={tF}>
				<div style={{ position: "absolute", left: 0, right: 0, top: 62, textAlign: "center" }}><Frase size={118} c={COR.azul}>fluir sem pensar</Frase></div>
				<svg width={984} height={180} style={{ position: "absolute", left: 0, top: 205 }}>
					<path d={onda(30, 1.4)} fill="none" stroke="rgba(47,91,255,0.22)" strokeWidth={10} strokeLinecap="round" />
					<path d={onda(44, 0)} fill="none" stroke={COR.azul} strokeWidth={12} strokeLinecap="round" />
				</svg>
			</Cartao>
			<Entra em={fw(112, "português")} style={{ position: "absolute", left: 48, right: 48, top: 945, textAlign: "center" }}><Apoio size={56} c={COR.ink}>Como a gente fala <b>português</b></Apoio></Entra>
		</>
	);
};

// 115-122 · fluência ESSENCIAL: o círculo grande é "tudo do inglês"; o essencial é o miolo, e é ele que você treina primeiro
const C115: React.FC = () => {
	const f = useCurrentFrame(); const tE = fw(115, "funcional"), tM = fr(117);
	const pulso = 1 + Math.sin((f - tM) / 9) * 0.03; const r = 132 * ap(f, tE, 12) * (f >= tM ? pulso : 1);
	return (
		<>
			<Pilula>Antes de saber tudo</Pilula>
			<div style={{ position: "absolute", left: 225, top: 150, width: 630, height: 630, borderRadius: "50%", background: "#fff", boxShadow: SOMBRA }} />
			<div style={{ position: "absolute", left: 0, right: 0, top: 212, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 42, color: COR.ink2 }}>tudo do inglês</div>
			{f >= tE ? <div style={{ position: "absolute", left: 540 - r, top: 480 - r, width: r * 2, height: r * 2, borderRadius: "50%", background: COR.azul, boxShadow: "0 0 0 18px rgba(47,91,255,0.14)" }} /> : null}
			<Entra em={tE + 6} style={{ position: "absolute", left: 0, right: 0, top: 450, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 50, letterSpacing: -1, color: "#fff" }}>essencial</Entra>
			<Cartao y={826} h={224} em={tE} style={{ ...MEIO, flexDirection: "column", gap: 10 }}>
				<Frase size={96}>Fluência <Azul>essencial</Azul></Frase>
				<Entra em={tM}><Apoio size={46}>Fluente no essencial do inglês</Apoio></Entra>
			</Cartao>
		</>
	);
};

// 130-144 · só 2 coisas: OUVIDO e FALA. "É só essas duas? Sim!" → "no começo, só o essencial? Sim!"
const C130: React.FC = () => {
	const f = useCurrentFrame(); const tO = fw(131, "ouvido"), tF = fw(131, "fala"), tSo = fr(136);
	const cartao = (x: number, em: number, t: string, des: React.ReactNode) => (
		<Cartao x={x} w={476} y={350} h={500} em={em}>
			<svg width={450} height={300} style={{ position: "absolute", left: 13, top: 40 }}>{des}</svg>
			<div style={{ position: "absolute", left: 0, right: 0, bottom: 50, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 92, letterSpacing: -2.8, color: COR.ink }}>{t}</div>
		</Cartao>
	);
	const onda = (k: number) => 0.55 + 0.45 * Math.sin(f / 5 + k);
	return (
		<>
			<Pilula>O que você treina</Pilula>
			<Centro top={180}><Frase size={124}>Só <Azul>2</Azul> coisas</Frase></Centro>
			{cartao(48, tO, "Ouvido", <>{[0, 1, 2, 3, 4, 5, 6].map((i) => { const h = 40 + onda(i) * (i % 2 ? 150 : 90); return <rect key={i} x={96 + i * 40} y={150 - h / 2} width={18} height={h} rx={9} fill={COR.azul} />; })}</>)}
			{cartao(556, tF, "Fala", <><path d="M 110 60 H 340 a 30 30 0 0 1 30 30 V 190 a 30 30 0 0 1 -30 30 H 220 L 160 270 V 220 H 110 a 30 30 0 0 1 -30 -30 V 90 a 30 30 0 0 1 30 -30 Z" fill="none" stroke={COR.azul} strokeWidth={12} strokeLinejoin="round" />{[0, 1, 2].map((i) => <circle key={i} cx={170 + i * 55} cy={140} r={12 + onda(i * 2) * 5} fill={COR.azul} />)}</>)}
			<div style={{ position: "absolute", left: 0, right: 0, top: 910, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
				{f >= fr(138) ? <Entra key="e" em={fr(138)}><Apoio size={56} c={COR.ink}>No começo: só o essencial</Apoio></Entra> : <Entra key="s" em={tSo}><Apoio size={56} c={COR.ink}>É só essas duas coisas?</Apoio></Entra>}
				{f >= fr(139) ? <Check key="c2" em={fr(139)} /> : f >= fr(137) && f < fr(138) ? <Check key="c1" em={fr(137)} /> : null}
			</div>
		</>
	);
};

// 148-159 e 176-179 · O OUVIDO SE LAPIDA: a mesma onda, bruta no começo, vai ficando limpa conforme ele repete
const Lapida: React.FC<{ de: number; ate: number; apoio?: [number, React.ReactNode]; fim?: [number, string] }> = ({ de, ate, apoio, fim }) => {
	const f = useCurrentFrame(); const p = Math.max(0, Math.min(1, (f - de) / (ate - de))); const ruido = 1 - p;
	const pts: string[] = [];
	for (let i = 0; i <= 120; i++) {
		const x = 90 + i * 7.5; const base = Math.sin(i / 9 + f / 14) * 96;
		const suja = (Math.sin(i * 1.9 + 3) * 54 + Math.sin(i * 4.3) * 38 + Math.sin(i * 7.7 + 1) * 26) * ruido;
		pts.push(`${i ? "L" : "M"} ${x.toFixed(1)} ${(595 + base + suja).toFixed(1)}`);
	}
	const vezes = Math.round(1 + p * 99);
	return (
		<>
			<Pilula>Como um músico</Pilula>
			<Centro top={180}><Frase size={110}>O ouvido se <Azul>lapida</Azul></Frase></Centro>
			<Cartao y={340} h={470}>
				<svg width={984} height={470} viewBox="48 340 984 470" style={{ position: "absolute", inset: 0 }}>
					<path d={pts.join(" ")} fill="none" stroke={p > 0.85 ? COR.azul : COR.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				<div style={{ position: "absolute", right: 34, top: 24, padding: "8px 22px", borderRadius: 99, background: COR.gelo, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: COR.ink2 }}>ouviu {vezes}×</div>
			</Cartao>
			{fim && f >= fim[0] ? <Entra key="f" em={fim[0]} style={{ position: "absolute", left: 48, right: 48, top: 860, textAlign: "center" }}><Frase size={140} c={COR.verde}>{fim[1]}</Frase></Entra>
				: apoio ? <Entra key="a" em={apoio[0]} style={{ position: "absolute", left: 70, right: 70, top: 870, textAlign: "center" }}><Apoio size={54}>{apoio[1]}</Apoio></Entra> : null}
		</>
	);
};
export const C148: React.FC = () => <Lapida de={fw(148, "lapidação")} ate={fr(159)} apoio={[fr(158), <>Só ouvir não basta. <b style={{ color: COR.ink }}>Por isso existe a repetição</b></>]} />;
const C176: React.FC = () => <Lapida de={fr(176) - 600} ate={fr(176)} apoio={[fw(177, "mais"), "Quanto mais você escuta, mais o ouvido fica treinado"]} fim={[fr(179), "“Peguei.”"]} />;

// 160-168 · BRUCE LEE: 10 mil chutes diferentes × o MESMO chute 10 mil vezes
const C160: React.FC = () => {
	const f = useCurrentFrame(); const tA = fw(161, "chutes") - 20, tB = fw(162, "mesmo") - 26;
	const n = Math.round(ap(f, tB + 4, 50) * 10000);
	const pontos = Array.from({ length: 36 }, (_, i) => [60 + ((i * 97) % 330), 50 + ((i * 53) % 320)]);
	const rod: React.CSSProperties = { position: "absolute", left: 20, right: 20, bottom: 44, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 46, lineHeight: 1.1 };
	return (
		<>
			<Pilula>Bruce Lee</Pilula>
			<Cartao x={48} w={476} y={190} h={640} em={tA}>
				<svg width={450} height={420} style={{ position: "absolute", left: 13, top: 30 }}>{pontos.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={10} fill="#B5BDCB" opacity={ap(f, tA + i, 6)} />)}</svg>
				<div style={{ ...rod, color: COR.ink2 }}>10 mil chutes diferentes</div>
			</Cartao>
			<Cartao x={556} w={476} y={190} h={640} em={tB} style={{ boxShadow: `0 0 0 7px ${COR.azul}, 0 26px 70px rgba(47,91,255,0.28)` }}>
				<div style={{ position: "absolute", left: 0, right: 0, top: 110, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 124 + Math.sin(f / 3) * 12, height: 124 + Math.sin(f / 3) * 12, borderRadius: "50%", background: COR.azul }} /></div>
				<div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 96, letterSpacing: -3.4, color: COR.azul }}>{n.toLocaleString("pt-BR")}×</div>
				<div style={{ ...rod, color: COR.ink }}>o mesmo chute</div>
			</Cartao>
			<Entra em={fr(163)} style={{ position: "absolute", left: 48, right: 48, top: 900, textAlign: "center" }}><Apoio size={60} c={COR.ink}>Isso é a base do treino</Apoio></Entra>
		</>
	);
};

// 169-173 · a promessa honesta: não é divertido, mas é o que funciona
const C169: React.FC = () => (
	<>
		<Pilula>Chega de balela</Pilula>
		<Entra em={fw(170, "nunca")} style={{ position: "absolute", left: 40, right: 40, top: 215, textAlign: "center" }}>
			<Frase size={150}>Nunca vi nada</Frase><Frase size={150} c={COR.azul}>funcionar</Frase><Frase size={150}>como isso</Frase>
		</Entra>
		<Cartao y={780} h={170} em={fw(173, "cérebro") - 10} style={MEIO}><Apoio size={52} c={COR.ink}>É assim que o nosso cérebro aprende</Apoio></Cartao>
	</>
);

export const LOTE2: Cena[] = [{ de: 86, C: C86 }, { de: 109, C: C109 }, { de: 115, C: C115 }, { de: 130, C: C130 }, { de: 148, C: C148 }, { de: 160, C: C160 }, { de: 169, C: C169 }, { de: 176, C: C176 }];
export const LOTE2_FIM = 182; // primeira frase depois do lote
