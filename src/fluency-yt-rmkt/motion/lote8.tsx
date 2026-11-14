// LOTE 8 (14/11): cenas dos trechos de CONTEÚDO que voltaram na versão do doc do Marcos e na integral e estavam sem quadro próprio
// (a cena anterior ficava parada 56 a 94 s). Régua de AULA + sistema v2: 1 quadro = 1 ponto, o desenho se monta na fala dele,
// centralizado, cartão único, azul só na resposta, letra ≥ 36 px, texto vem do que ele diz.
//   612-617 · dentro do discurso: 90% essencial, 10% é o tema
//   618-626 · "I need to think about ___": muda uma palavra, a expressão é a mesma
//   627-637 · onde treinar: séries (rotina) · discursos (inglês polido) · palestras (assuntos do seu interesse)
//   638-645 · you · that · can · I am: essenciais, só que faladas rápido
//   646-658 · o que cada um treina: série = pergunta e resposta curta · discurso = fala longa, argumentação
//   877-893 · quem é melhor de violão? 1 música igual profissional × 100 músicas meia-boca
//   894-910 · quem está mais perto de tocar a música X (difícil)? o de 1 música: tem mais técnica
import React from "react";
import { useCurrentFrame } from "remotion";
import { COR, DISPLAY, SANS, SOMBRA, Pilula, Cartao, Troca, Frase, Apoio, Entra, ap, fr, Cena } from "./base";

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;
const B: React.FC<{ c?: string; children: React.ReactNode }> = ({ c = COR.azul, children }) => <b style={{ color: c }}>{children}</b>;
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };
const AZUL_CHEIO: React.CSSProperties = { background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" };
const ANEL = `0 0 0 8px ${COR.azul}, 0 26px 70px rgba(47,91,255,0.28)`;

// 612-617 · a barra do discurso: 90% azul (essencial) e os 10% do tema acendem quando ele fala deles
const C612: React.FC = () => {
	const f = useCurrentFrame(); const t10 = fr(614); const p = ap(f, fr(612), 26), q = ap(f, t10, 12);
	return (
		<>
			<Pilula>Dentro do discurso</Pilula>
			<Centro top={170}>{f < t10 ? <Frase size={132} style={{ whiteSpace: "nowrap" }}><Azul>90%</Azul> é essencial</Frase> : <Entra em={t10}><Frase size={132} style={{ whiteSpace: "nowrap" }}>E os outros <span style={{ color: COR.ink2 }}>10%?</span></Frase></Entra>}</Centro>
			<Cartao y={420} h={330}>
				<div style={{ position: "absolute", left: 40, right: 40, top: 46, height: 150, borderRadius: 30, background: "#E3E8F0", overflow: "hidden" }}>
					<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${90 * p}%`, background: COR.azul }} />
					<div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "10%", background: q > 0 ? COR.ink : "transparent", opacity: q }} />
					<div style={{ position: "absolute", left: 36, top: 0, bottom: 0, display: "flex", alignItems: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 88, letterSpacing: -3, color: "#fff", opacity: p }}>90%</div>
				</div>
				<div style={{ position: "absolute", left: 40, top: 222, fontFamily: SANS, fontWeight: 700, fontSize: 46, color: COR.azul }}>o essencial do inglês</div>
				<div style={{ position: "absolute", right: 40, top: 222, fontFamily: SANS, fontWeight: 700, fontSize: 46, color: COR.ink, opacity: q }}>o tema</div>
			</Cartao>
			<Troca top={820} size={58} itens={[[t10, <>Palavras <B c={COR.ink}>do assunto</B> daquele discurso</>], [fr(617), <>Uma coisinha ou outra sobre <B>todos os assuntos</B></>]]} />
		</>
	);
};

// 618-626 · a mesma expressão, uma palavra trocada: "it" → "this trip" (a tradução acompanha embaixo)
const C618: React.FC = () => {
	const f = useCurrentFrame(); const tTrip = fr(622), tPt = fr(619), tVoc = fr(625);
	const trip = f >= tTrip; const k = ap(f, tTrip, 9);
	const slot: React.CSSProperties = { display: "inline-block", padding: "6px 30px 12px", borderRadius: 26, background: trip ? COR.azul : "#EEF2FF", color: trip ? "#fff" : COR.azul, transform: `scale(${trip ? 0.94 + 0.06 * k : 1})` };
	return (
		<>
			<Pilula>Muda uma palavra</Pilula>
			<Cartao y={170} h={470} style={{ ...MEIO, flexDirection: "column", gap: 26 }}>
				<Frase size={104} style={{ whiteSpace: "nowrap" }}>I need to think</Frase>
				<Frase size={104} style={{ whiteSpace: "nowrap" }}>about <span style={slot}>{trip ? "this trip" : "it"}</span></Frase>
			</Cartao>
			<Entra em={tPt} style={{ position: "absolute", left: 48, right: 48, top: 690, textAlign: "center" }}>
				<Apoio size={52} style={{ whiteSpace: "nowrap" }}>Eu preciso pensar sobre <B c={trip ? COR.azul : COR.ink}>{trip ? "essa viagem" : "isso"}</B></Apoio>
			</Entra>
			<Troca top={850} size={58} itens={[[fr(621), <>Isso é <B c={COR.ink}>genérico</B></>], [tTrip, null], [tVoc, <>Aí entra <B>um pouquinho</B> de vocabulário</>], [fr(626), <>Ainda é vocabulário <B>essencial</B></>]]} />
		</>
	);
};

// 627-637 · três fontes de treino, cada uma acende quando ele aponta pra ela
const C627: React.FC = () => {
	const f = useCurrentFrame(); const t = [fr(628), fr(630), fr(632)];
	const itens: [string, string][] = [["Séries", "a rotina"], ["Discursos", "inglês mais polido"], ["Palestras", "assuntos do seu interesse"]];
	let atual = -1; t.forEach((x, i) => { if (f >= x) atual = i; });
	return (
		<>
			<Pilula>Onde treinar</Pilula>
			{itens.map(([nome, oque], i) => (
				<Cartao key={i} y={160 + i * 232} h={206} em={t[i]} style={{ display: "flex", alignItems: "center", gap: 34, padding: "0 44px", boxSizing: "border-box", ...(i === atual ? AZUL_CHEIO : {}) }}>
					<Frase size={92} c={i === atual ? "#fff" : COR.ink} style={{ width: 430, flexShrink: 0 }}>{nome}</Frase>
					<Apoio size={48} c={i === atual ? "#fff" : COR.ink2} style={{ lineHeight: 1.08 }}>{oque}</Apoio>
				</Cartao>
			))}
			<Troca top={880} size={56} itens={[[fr(635), <>Só uns <B>10%</B> das palavras são do tema</>]]} />
		</>
	);
};

// 638-645 · as quatro palavras essenciais; quando ele diz "faladas rápidas" elas colam uma na outra
const C638: React.FC = () => {
	const f = useCurrentFrame(); const tR = fr(641); const p = ap(f, tR, 14); const pal = ["you", "that", "can", "I am"];
	return (
		<>
			<Pilula>Os outros 90%</Pilula>
			<Cartao y={180} h={330} style={{ ...MEIO, gap: 34 - 26 * p }}>
				{pal.map((w, i) => <Entra key={i} em={fr(638) + i * 7}><Frase size={100} c={p > 0.5 ? COR.azul : COR.ink} style={{ whiteSpace: "nowrap", transform: `skewX(${-9 * p}deg)` }}>{w}</Frase></Entra>)}
			</Cartao>
			<Centro top={585}>{f < fr(640) ? <Entra em={fr(639)}><Frase size={124}>São <Azul>essenciais</Azul></Frase></Entra> : <Entra em={fr(640)}><Frase size={124}>Só que faladas <Azul>rápido</Azul></Frase></Entra>}</Centro>
			<Troca top={880} size={56} itens={[[tR, <>Porque vêm <B>dentro de expressão</B></>]]} />
		</>
	);
};

// 646-658 · série × discurso: dois balões curtos (pergunta e resposta) contra um bloco só de fala longa
const C646: React.FC = () => {
	const f = useCurrentFrame(); const tS = fr(649), tD = fr(651), tL = fr(652);
	const col: React.CSSProperties = { position: "absolute", top: 170, width: 476, height: 640, borderRadius: 44, background: "#fff", boxShadow: SOMBRA };
	const tit: React.CSSProperties = { position: "absolute", left: 0, right: 0, top: 36, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 84, letterSpacing: -2.8, color: COR.ink };
	const rod: React.CSSProperties = { position: "absolute", left: 22, right: 22, bottom: 40, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 44, lineHeight: 1.1 };
	const linha = (w: number, c: string) => <div style={{ height: 22, width: w, borderRadius: 11, background: c }} />;
	return (
		<>
			<Pilula>O que cada um treina</Pilula>
			<div style={{ ...col, left: 48, boxShadow: f >= tS && f < tD ? ANEL : SOMBRA }}>
				<div style={tit}>Série</div>
				{f >= tS ? (
					<>
						<Entra em={tS} style={{ position: "absolute", left: 40, top: 190, padding: "26px 30px", borderRadius: "30px 30px 30px 8px", background: "#EEF2FF" }}>{linha(210, COR.azul)}</Entra>
						<Entra em={tS + 12} style={{ position: "absolute", right: 40, top: 300, padding: "26px 30px", borderRadius: "30px 30px 8px 30px", background: COR.azul }}>{linha(150, "#fff")}</Entra>
						<Entra em={fr(650)} style={{ ...rod, color: COR.ink }}>pergunta e resposta <B>curtas</B></Entra>
					</>
				) : null}
			</div>
			<div style={{ ...col, left: 556, boxShadow: f >= tD ? ANEL : SOMBRA }}>
				<div style={tit}>Discurso</div>
				{f >= tD ? (
					<>
						<Entra em={tD} style={{ position: "absolute", left: 40, right: 40, top: 180, padding: "30px 30px", borderRadius: 30, background: "#EEF2FF", display: "flex", flexDirection: "column", gap: 17 }}>
							{[380, 340, 380, 300, 360, 250].map((w, i) => <div key={i} style={{ opacity: f >= tD + i * 5 ? 1 : 0 }}>{linha(Math.min(w, 336), COR.azul)}</div>)}
						</Entra>
						<Entra em={tL} style={{ ...rod, color: COR.ink }}>fala longa, <B>argumentação</B></Entra>
					</>
				) : null}
			</div>
			<Troca top={880} size={54} itens={[[fr(648), "Discurso não tem pergunta e resposta"], [tS, <>Na série tem <B>conversação</B> de verdade</>], [fr(653), "Uma pessoa só, falando por mais tempo"], [fr(654), <>Você deixa de ser a pessoa da <B>resposta curta</B></>]]} />
		</>
	);
};

// violão desenhado em linhas (corpo, boca, braço, cordas); n = quantas "músicas" aparecem como palhetas embaixo
const Violao: React.FC<{ cor: string; firme: boolean }> = ({ cor, firme }) => (
	<svg width={300} height={250} viewBox="0 0 300 250">
		<g fill="none" stroke={cor} strokeWidth={firme ? 13 : 9} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={firme ? undefined : "2 20"}>
			<path d="M 70 150 C 30 150 20 215 75 222 C 130 228 150 205 150 180 C 150 160 170 150 172 130 C 174 100 120 96 105 120 C 96 136 92 150 70 150 Z" />
			<path d="M 160 118 L 268 34" />
			<path d="M 252 22 L 282 46" />
		</g>
		<circle cx={98} cy={176} r={17} fill="none" stroke={cor} strokeWidth={firme ? 9 : 6} />
	</svg>
);

// 877-893 · quem é melhor? 1 música tocada igual profissional × 100 músicas meia-boca ("é discutível")
const C877: React.FC = () => {
	const f = useCurrentFrame(); const t1 = fr(881), t100 = fr(890), tDisc = fr(892);
	const col: React.CSSProperties = { position: "absolute", top: 410, width: 476, height: 430, borderRadius: 44, background: "#fff", boxShadow: SOMBRA };
	const num: React.CSSProperties = { fontFamily: DISPLAY, fontWeight: 800, fontSize: 150, lineHeight: 1, letterSpacing: -5 };
	const topo: React.CSSProperties = { position: "absolute", left: 0, right: 0, top: 24, height: 230, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 };
	const vio: React.CSSProperties = { width: 210, height: 175, transform: "scale(0.7)", transformOrigin: "left top", flexShrink: 0 };
	const rod: React.CSSProperties = { position: "absolute", left: 22, right: 22, bottom: 38, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 44, lineHeight: 1.1 };
	return (
		<>
			<Pilula>Um episódio dominado</Pilula>
			<Centro top={150}><Frase size={112}>Quem é <Azul>melhor</Azul></Frase><Frase size={112}>de violão?</Frase></Centro>
			{f >= t1 ? <Entra em={t1} style={{ ...col, left: 48 }}><div style={topo}><div style={{ ...num, color: COR.azul }}>1</div><div style={vio}><Violao cor={COR.azul} firme /></div></div><div style={{ ...rod, color: COR.ink }}>música, <B>igual profissional</B></div></Entra> : null}
			{f >= t100 ? <Entra em={t100} style={{ ...col, left: 556 }}><div style={topo}><div style={{ ...num, color: COR.ink2, fontSize: 120 }}>100</div><div style={vio}><Violao cor="#98A2B3" firme={false} /></div></div><div style={{ ...rod, color: COR.ink2 }}>músicas, <B c={COR.ink2}>meia-boca</B></div></Entra> : null}
			<Troca top={900} size={58} itens={[[fr(883), "Quem é melhor?"], [fr(891), "“100 músicas: ele dá um show”"], [tDisc, <>Tá, é <B c={COR.ink}>discutível</B></>]]} />
		</>
	);
};

// 894-910 · a pergunta muda: quem está mais perto da música X (difícil)? o de 1 música acende; o motivo é a técnica
const C894: React.FC = () => {
	const f = useCurrentFrame(); const tX = fr(899), tQ = fr(903), tEsse = fr(905), tRuim = fr(906), tTec = fr(908);
	const col: React.CSSProperties = { position: "absolute", top: 470, width: 476, height: 330, borderRadius: 44, background: "#fff" };
	const num: React.CSSProperties = { fontFamily: DISPLAY, fontWeight: 800, fontSize: 150, lineHeight: 1, letterSpacing: -5 };
	const leg: React.CSSProperties = { fontFamily: SANS, fontWeight: 700, fontSize: 44, lineHeight: 1.1, marginTop: 10 };
	const venceu = f >= tEsse;
	return (
		<>
			<Pilula>Agora a pergunta muda</Pilula>
			<Cartao y={160} h={250} em={tX} style={{ ...MEIO, gap: 30, background: COR.ink }}>
				<Frase size={110} c="#fff">Música <span style={{ color: "#8FA8FF" }}>X</span></Frase>
				{f >= fr(901) ? <Entra em={fr(901)} style={{ padding: "10px 28px 14px", borderRadius: 22, background: COR.vermelho, fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, letterSpacing: -2, color: "#fff" }}>difícil</Entra> : null}
			</Cartao>
			<div style={{ ...col, left: 48, ...MEIO, flexDirection: "column", boxShadow: venceu ? ANEL : SOMBRA }}>
				<div style={{ ...num, color: COR.azul }}>1</div>
				<div style={{ ...leg, color: COR.ink }}>{f >= tTec ? <>tem <B>mais técnica</B></> : "música, profissional"}</div>
			</div>
			<div style={{ ...col, left: 556, ...MEIO, flexDirection: "column", boxShadow: SOMBRA, opacity: venceu ? 0.8 : 1 }}>
				<div style={{ ...num, color: COR.ink2 }}>100</div>
				<div style={{ ...leg, color: f >= tRuim ? COR.vermelho : COR.ink2 }}>{f >= tRuim ? "mão sem postura" : "músicas, meia-boca"}</div>
			</div>
			<Troca top={870} size={58} itens={[[fr(897), "Nenhum dos dois tocou essa ainda"], [tQ, <>Quem está <B>mais perto</B> de tocar ela?</>], [tEsse, <>Eu acho que <B>esse</B></>], [tRuim, "Não sabe solo, não sabe dedilhar"], [tTec, <>Dominar um episódio é <B>isso</B></>]]} />
		</>
	);
};

export const LOTE8: Cena[] = [{ de: 612, C: C612 }, { de: 618, C: C618 }, { de: 627, C: C627 }, { de: 638, C: C638 }, { de: 646, C: C646 }, { de: 881, C: C877 }, { de: 894, C: C894 }];
