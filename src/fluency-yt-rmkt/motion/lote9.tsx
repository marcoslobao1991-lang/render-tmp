// LOTE 9 (14/11, versão FULL INTEGRAL): telas dos maiores trechos de TELA PARADA (parados.mjs full), no SISTEMA v2.
// Marcos: "poxa pq vc n criou mais telas". Régua: 1 quadro = 1 ponto, texto vem das palavras DELE, azul só na resposta, letra ≥ 36 px.
// Lead 3–14 (67 s no título) · músico 149–154 · fluência essencial 119–128 · "aula chata" 469–484 · conclusão 2x 866–875 · imagina 960–974.
import React from "react";
import { useCurrentFrame } from "remotion";
import { COR, DISPLAY, SANS, SOMBRA, Pilula, Cartao, Frase, Apoio, Entra, Troca, Riscada, ap, fr, fw, Cena } from "./base";
import { C01 } from "./lote1";
import { C148 } from "./lote2";
import { C456 } from "./lote5";
import { C960 } from "./lote7";

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;
const B: React.FC<{ c?: string; children: React.ReactNode }> = ({ c = COR.azul, children }) => <b style={{ color: c }}>{children}</b>;
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };
const AZUL_CHEIO: React.CSSProperties = { background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" };

// 3-5 · o que este vídeo vai fazer: quebrar crenças, dar outro ponto de vista
const C03: React.FC = () => (
	<>
		<Pilula>Neste vídeo</Pilula>
		<Centro top={200}><Frase size={170}>Quebrar</Frase><Frase size={170}>crenças</Frase></Centro>
		<Cartao y={590} h={250} em={fr(4)} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={92} c="#fff">Um outro ponto de vista</Frase></Cartao>
		<Entra em={fw(5, "divertido")} style={{ position: "absolute", left: 70, right: 70, top: 900, textAlign: "center" }}><Apoio size={54}>Talvez aprender inglês <B c={COR.ink}>não seja tão divertido</B> quanto parece</Apoio></Entra>
	</>
);
// 6-8 · com esse ponto de vista você decide: "eu quero ficar fluente" ou "não é pra mim"
const C06: React.FC = () => {
	const f = useCurrentFrame(); const tA = fw(6, "quero"), tB = fr(7);
	const lado = (x: number, em: number, t: React.ReactNode, azul: boolean) => (
		<Cartao x={x} w={476} y={380} h={420} em={em} style={{ ...MEIO, padding: "0 30px", boxSizing: "border-box", ...(azul ? AZUL_CHEIO : {}) }}><Frase size={84} c={azul ? "#fff" : COR.ink2}>{t}</Frase></Cartao>
	);
	return (
		<>
			<Pilula>A decisão é sua</Pilula>
			<Centro top={180}><Frase size={110}>Você <Azul>decide</Azul></Frase></Centro>
			{lado(48, tA, <>“Eu quero ficar fluente”</>, true)}
			{lado(556, tB, <>“Isso não é pra mim”</>, false)}
			{f >= tB ? <Entra em={tB + 10} style={{ position: "absolute", left: 495, top: 545, width: 90, height: 90, borderRadius: 99, background: COR.ink, color: "#fff", ...MEIO, fontFamily: SANS, fontWeight: 700, fontSize: 38 }}>ou</Entra> : null}
			<Entra em={fr(8)} style={{ position: "absolute", left: 70, right: 70, top: 880, textAlign: "center" }}><Apoio size={54}>Seja lá qual for</Apoio></Entra>
		</>
	);
};
// 9-12 · as falácias do mercado: "fluente em 6 meses" riscado; as 3 perguntas que vêm antes
const C09: React.FC = () => {
	const tS = fw(9, "seis"), tR = fw(9, "precisa");
	return (
		<>
			<Pilula tom={COR.vermelho}>As falácias do mercado</Pilula>
			<Cartao y={200} h={330} em={tS - 20} style={{ ...MEIO, flexDirection: "column" }}>
				<Apoio size={46}>“Fique</Apoio>
				<Frase size={92} style={{ whiteSpace: "nowrap" }}><Riscada em={tR}>fluente em 6 meses</Riscada>”</Frase>
			</Cartao>
			<Centro top={600}><Entra em={tR}><Apoio size={46}>Antes, você precisa entender</Apoio></Entra></Centro>
			<Troca top={690} size={76} itens={[[fw(9, "entender"), <B>O que é ser fluente?</B>], [fw(9, "quer"), <B>O que você quer com isso?</B>], [fw(9, "disposto"), <B>O que você está disposto a fazer?</B>], [fr(10), <span style={{ color: COR.ink }}>Muitos falam <B c={COR.vermelho}>o que você quer ouvir</B></span>]]} />
		</>
	);
};

// 149-154 · o ouvido do músico: a mesma frase de notas, muitas vezes; UMA nota fora e ele percebe na hora
const NOTAS = [0, 2, 1, 3, 2, 4, 3, 1];
const C149: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fw(149, "escuta"), tE = fw(149, "errada"), tD = fr(153), tL = fw(154, "lapidar");
	const errada = f >= tE && f < tD; const vezes = Math.min(99, 1 + Math.floor(Math.max(0, f - t0) / 9));
	return (
		<>
			<Pilula>Como um músico</Pilula>
			<Centro top={185}><Frase size={84} style={{ whiteSpace: "nowrap" }}>O ouvido de um <Azul>músico</Azul></Frase></Centro>
			<Cartao y={320} h={440}>
				{[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ position: "absolute", left: 60, right: 60, top: 130 + i * 50, height: 4, borderRadius: 2, background: COR.linha }} />)}
				{NOTAS.map((n, i) => {
					const em = t0 + i * 5; if (f < em) return null; const alvo = i === 5; const fora = alvo && errada; const p = ap(f, em, 8);
					const toca = Math.floor((f - t0) / 9) % NOTAS.length === i && f >= t0 + 40 && f < tL;
					const y = 330 - n * 50 - (fora ? 38 * ap(f, tE, 6) : 0);
					return <div key={i} style={{ position: "absolute", left: 130 + i * 98, top: y - 27, width: 62, height: 54, borderRadius: "50%", background: fora ? COR.vermelho : toca ? COR.azul : COR.ink, opacity: p, transform: `rotate(-18deg) scale(${toca || fora ? 1.14 : 1})`, boxShadow: fora ? "0 0 0 12px rgba(229,56,59,0.16)" : undefined }} />;
				})}
				<div style={{ position: "absolute", right: 34, top: 24, padding: "8px 22px", borderRadius: 99, background: COR.gelo, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: COR.ink2 }}>ouviu {vezes}×</div>
			</Cartao>
			<Troca top={830} size={62} itens={[[t0, "O mesmo acorde, muitas vezes"], [tE, <B c={COR.vermelho}>“Opa, tá errado”</B>], [tD, "Ele escutou muitas vezes"], [fw(153, "super"), <>Não é <B c={COR.ink}>superpoder</B></>], [tL, <>É <B>lapidar o ouvido</B></>]]} />
		</>
	);
};

// 119-128 · fluência essencial na prática: frases básicas, treinadas ATÉ mais rápido que a velocidade normal
const C119: React.FC = () => {
	const f = useCurrentFrame(); const tV = fw(120, "rápido"), tR = fr(126); const p = ap(f, tV, 26);
	return (
		<>
			<Pilula>Fluência essencial</Pilula>
			<Centro top={180}><Frase size={104}>Frases <Azul>básicas</Azul></Frase><Frase size={104}>do inglês</Frase></Centro>
			<Cartao y={470} h={300} em={fr(120)}>
				<div style={{ position: "absolute", left: 50, top: 34, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: COR.ink2 }}>velocidade do seu treino</div>
				<div style={{ position: "absolute", left: 50, right: 50, top: 150, height: 34, borderRadius: 99, background: "#EEF1F6" }} />
				<div style={{ position: "absolute", left: 50, top: 150, height: 34, borderRadius: 99, background: COR.azul, width: 440 + 380 * p }} />
				<div style={{ position: "absolute", left: 50 + 440 - 3, top: 118, width: 6, height: 98, borderRadius: 3, background: COR.ink }} />
				<div style={{ position: "absolute", left: 50 + 440 - 200, width: 400, top: 222, textAlign: "center", whiteSpace: "nowrap", fontFamily: SANS, fontWeight: 700, fontSize: 38, color: COR.ink }}>velocidade normal</div>
				{f >= tV ? <Entra em={tV} style={{ position: "absolute", right: 50, top: 222, fontFamily: SANS, fontWeight: 700, fontSize: 38, color: COR.azul }}>mais rápido</Entra> : null}
			</Cartao>
			<Troca top={850} size={64} itens={[[tR, <>Treinar = <B>repetir</B></>], [fr(127), <>Isso é a <B>fluência</B></>], [fr(128), <>Existe a <B>fluência essencial</B></>]]} />
		</>
	);
};

// 469-478 · "eu avisei que essa aula ia ser chata, mas que mudava o jogo"
const C469: React.FC = () => (
	<>
		<Pilula>Eu avisei</Pilula>
		<Centro top={210}><Frase size={150}>Aula</Frase><Frase size={150} c={COR.ink2}>chata</Frase></Centro>
		<Cartao y={590} h={270} em={fr(474)} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={96} c="#fff">mas muda o jogo<br />pra você</Frase></Cartao>
	</>
);
// 479-484 · a frase que ele escreve: 1% do vocabulário (e pode ser menos)
const C479: React.FC = () => (
	<>
		<Pilula>A frase</Pilula>
		<Centro top={190}><Frase size={300} c={COR.azul}>1%</Frase><Frase size={96}>do vocabulário</Frase></Centro>
		<Troca top={720} size={62} itens={[[fr(480), "Pode estar errada essa frase?"], [fr(481), "Pode."], [fr(483), <>Porque pode ser <B>menos de 1%</B></>], [fr(484), <B>Muito provavelmente é</B>]]} />
	</>
);

// 866-875 · a conclusão: treinar 1 episódio massivamente; o desafio de velocidade (2x é supremo; pra Friends, 1,5x já é hard)
const C866: React.FC = () => {
	const f = useCurrentFrame(); const tM = fw(870, "massivamente"), t2 = fw(870, "2x"), t15 = fw(871, "1.5"), t1 = fr(873), tH = fw(874, "hard");
	const sel = f >= tH ? 1 : f >= t1 ? 0 : f >= t15 ? 1 : f >= t2 ? 2 : -1;
	const chips: [string, string][] = [["1x", "já tá legal"], ["1,5x", "nível hard"], ["2x", "o supremo"]];
	return (
		<>
			<Pilula>A conclusão</Pilula>
			<Centro top={170}><Frase size={104}>Treinar <Azul>1 episódio</Azul></Frase></Centro>
			<Cartao y={320} h={200} em={tM} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={112} c="#fff">massivamente</Frase></Cartao>
			{f >= t2 - 14 ? <Entra em={t2 - 14} style={{ position: "absolute", left: 48, right: 48, top: 580, textAlign: "center" }}><Apoio size={46}>O desafio: entender o episódio em</Apoio></Entra> : null}
			{chips.map(([v, leg], i) => {
				if (f < t2) return null; const on = sel === i; const p = ap(f, t2 + i * 4, 9);
				return (
					<div key={v} style={{ position: "absolute", left: 48 + i * 336, top: 670, width: 312, height: 290, borderRadius: 44, background: on ? COR.azul : "#fff", boxShadow: on ? "0 26px 70px rgba(47,91,255,0.35)" : SOMBRA, opacity: p, transform: `translateY(${(1 - p) * 26}px) scale(${on ? 1.04 : 1})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
						<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 124, letterSpacing: -4, lineHeight: 1, color: on ? "#fff" : COR.ink2 }}>{v}</div>
						<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 38, color: on ? "#fff" : COR.ink2 }}>{leg}</div>
					</div>
				);
			})}
		</>
	);
};

// 960-968 · frase a frase, o que se repete: perguntas e respostas, estruturas, expressões
const C960B: React.FC = () => {
	const itens: [number, string][] = [[fw(961, "perguntas"), "Perguntas e respostas"], [fw(962, "estruturas"), "Estruturas"], [fw(965, "expressões"), "Expressões"]];
	return (
		<>
			<Pilula>Frase a frase</Pilula>
			<Centro top={170}><Frase size={104}>Sempre <Azul>se repetem</Azul></Frase></Centro>
			{itens.map(([em, t], i) => (
				<Cartao key={t} y={330 + i * 176} h={150} em={em} style={{ display: "flex", alignItems: "center", gap: 28, paddingLeft: 44, boxSizing: "border-box" }}>
					<svg width={64} height={64} viewBox="0 0 64 64"><path d="M52 32a20 20 0 1 1-6-14.3" fill="none" stroke={COR.azul} strokeWidth={7} strokeLinecap="round" /><path d="M48 6v13H35" fill="none" stroke={COR.azul} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" /></svg>
					<Frase size={72}>{t}</Frase>
				</Cartao>
			))}
			<Troca top={900} size={60} itens={[[fr(966), <>Sempre vendo <B c={COR.ink}>as expressões</B></>], [fr(967), <>E sempre vendo <B>uma coisa nova</B></>]]} />
		</>
	);
};
// 969-974 · imagina pegar todas as temporadas (palavras dele): Friends, Two and a Half Men
const C969: React.FC = () => {
	const serie = (x: number, em: number, t: React.ReactNode) => (
		<Cartao x={x} w={476} y={400} h={330} em={em} style={{ ...MEIO, flexDirection: "column", gap: 14, padding: "0 24px", boxSizing: "border-box" }}>
			<Frase size={78}>{t}</Frase>
			<Apoio size={40}>todas as temporadas</Apoio>
		</Cartao>
	);
	return (
		<>
			<Pilula>Imagina</Pilula>
			<Centro top={180}><Frase size={104}>Imagina <Azul>pegar</Azul></Frase></Centro>
			{serie(48, fw(969, "Friends"), "Friends")}
			{serie(556, fr(970), <>Two and a<br />Half Men</>)}
			<Troca top={820} size={62} itens={[[fr(972), "“E eu ainda chamo isso de difícil”"], [fr(974), <>O que vai acontecer com <B>o seu inglês?</B></>]]} />
		</>
	);
};

// as cenas antigas voltam depois das novas (registradas de novo na frase em que retomam)
export const LOTE9: Cena[] = [
	{ de: 3, C: C03 }, { de: 6, C: C06 }, { de: 9, C: C09 }, { de: 13, C: C01 },
	{ de: 119, C: C119 },
	{ de: 149, C: C149 }, { de: 155, C: C148 },
	{ de: 469, C: C469 }, { de: 479, C: C479 }, { de: 485, C: C456 },
	{ de: 866, C: C866 },
	{ de: 960, C: C960B }, { de: 969, C: C969 }, { de: 975, C: C960 },
];
