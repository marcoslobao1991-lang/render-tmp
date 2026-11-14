// LOTES 5 e 6 (13/11, SISTEMA v2): 1% do vocabulário = 90% do tempo · "aprender" × essencial · palavra que nunca traduzi ·
// onde está o essencial (filmes e séries) · "Hi, my name is" · rápido e DIFÍCIL · séries × discursos ·
// discurso de 15 min · O TREINO passo a passo · nível hard 2x · fácil = fraco · repete com os outros minutos.
// Frases 456 a 745. Régua de AULA + v2 (centralizado, cartão único, azul só na resposta). Versão anterior em motion/_v1/lote5.tsx.bak.
import React from "react";
import { C597N } from "./real";
import { useCurrentFrame } from "remotion";
import { COR, PALCO, DISPLAY, SANS, SOMBRA, Pilula, Cartao, Troca, Frase, Apoio, Entra, Riscada, Traco, ap, fr, Cena } from "./base";

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;
const B: React.FC<{ c?: string; children: React.ReactNode }> = ({ c = COR.azul, children }) => <b style={{ color: c }}>{children}</b>;
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };
const AZUL_CHEIO: React.CSSProperties = { background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" };

// 456-487 · 100 quadradinhos = o vocabulário; UM acende = 1%. Embaixo o cartão ENCHE até 90% = o tempo de conversa.
const C456: React.FC = () => {
	const f = useCurrentFrame(); const tA = fr(461), tB = fr(462) + 30, t1 = fr(465); const um = ap(f, t1, 12), enche = ap(f, tB, 24);
	return (
		<>
			<Pilula>O que é mais rápido?</Pilula>
			<Cartao y={170} h={440} em={tA}>
				<div style={{ position: "absolute", left: 44, top: 30, width: 380, height: 380, display: "grid", gridTemplateColumns: "repeat(10, 32px)", gap: 6.6 }}>
					{Array.from({ length: 100 }, (_, i) => {
						const alvo = i === 44;
						return <div key={i} style={{ width: 32, height: 32, borderRadius: 9, background: alvo && um > 0 ? COR.azul : um > 0 ? "#EDF0F5" : "#CBD2DE", transform: alvo ? `scale(${1 + 0.45 * um})` : undefined, boxShadow: alvo && um > 0 ? "0 0 0 8px rgba(47,91,255,0.18)" : undefined }} />;
					})}
				</div>
				<div style={{ position: "absolute", left: 470, right: 30, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
					{f < t1 ? <Frase size={84} c={COR.ink2}>O dicionário inteiro?</Frase> : (
						<Entra em={t1}><Frase size={230} c={COR.azul}>1%</Frase><Apoio size={52} c={COR.ink} style={{ marginTop: 6 }}>das palavras</Apoio></Entra>
					)}
				</div>
			</Cartao>
			<Cartao y={640} h={280} em={tB}>
				<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${90 * enche}%`, background: COR.azul }} />
				<div style={{ position: "absolute", left: 50, top: 0, bottom: 0, display: "flex", alignItems: "center", gap: 34, opacity: enche }}>
					<Frase size={200} c="#fff">90%</Frase>
					<Apoio size={54} c="#fff" style={{ lineHeight: 1.08 }}>do tempo<br />de conversa</Apoio>
				</div>
			</Cartao>
			<Troca top={965} size={52} itens={[[fr(461), "Aprender o dicionário inteiro?"], [fr(462), "Ou só o que é mais usado?"], [fr(485), <>Com 500 palavras <B>você conversa o resto da vida</B></>]]} />
		</>
	);
};

// 488-503 · a palavra "aprender" dá repulsa: primeiro, fluente no essencial
const C488: React.FC = () => (
	<>
		<Pilula tom={COR.vermelho}>“Meu vocabulário é uma bênção”</Pilula>
		<Centro top={195}><Entra em={fr(493)}><Frase size={196} c={COR.ink2}><Riscada em={fr(497)}>Aprender</Riscada></Frase></Entra></Centro>
		<Cartao y={450} h={310} em={fr(499)} style={MEIO}><Frase size={104}>Primeiro: fluente<br />no <Azul>essencial</Azul></Frase></Cartao>
		<Entra em={fr(502)} style={{ position: "absolute", left: 70, right: 70, top: 820, textAlign: "center" }}><Apoio size={52}>Aí sim: palavras novas, no impulso da expressão</Apoio></Entra>
	</>
);

// 505-537 · a prova de que parou de traduzir: palavra que ele sabe em inglês e NUNCA viu em português (o desenho do começo volta)
const No: React.FC<{ x: number; y: number; t: string; em: number; trac?: boolean }> = ({ x, y, t, em, trac }) => (
	<Entra em={em} style={{ position: "absolute", left: x - 170, top: y - 78, width: 340, height: 156, borderRadius: 40, boxSizing: "border-box", background: trac ? "transparent" : "#fff", boxShadow: trac ? undefined : SOMBRA, border: trac ? "5px dashed #C9CED8" : undefined, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 62, letterSpacing: -1.6, color: trac ? "#B5BDCB" : COR.ink }}>{t}</Entra>
);
const C505: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(505), rap = ((f - t0) % 18) / 18;
	return (
		<>
			<Pilula>Quando você está ficando bom</Pilula>
			<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}><Traco d="M 404 312 Q 540 150 676 312" em={t0 + 10} cor={COR.azul} larg={13} /></svg>
			<No x={238} y={330} t="inglês" em={t0} />
			<No x={842} y={330} t="ideia" em={t0 + 6} />
			<No x={540} y={620} t="português?" em={fr(513)} trac />
			<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}>
				{f >= t0 + 22 ? <circle cx={404 + rap * 272} cy={312 - Math.sin(rap * Math.PI) * 81} r={20} fill={COR.azul} /> : null}
			</svg>
			<Troca top={830} size={56} itens={[[fr(511), "Você sabe palavras em inglês..."], [fr(513), <>...e <B>não sabe elas em português</B></>], [fr(533), "No contexto, você fala: “saquei”"], [fr(536), <>“Nunca vi essa palavra <B>traduzida</B>”</>]]} />
		</>
	);
};

// 563-575 · onde está o essencial: filmes e séries. E por que o iniciante cai no "Hi, my name is"
const C563: React.FC = () => {
	const f = useCurrentFrame(); const tH = fr(573), tN = fr(575);
	return (
		<>
			<Pilula>Onde está o essencial</Pilula>
			{f < fr(571) ? (
				<>
					<Centro top={215}><Frase size={104} c={COR.ink2}>O conversacional</Frase></Centro>
					<Cartao y={400} h={420} em={fr(571) - 50} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={166} c="#fff">Filmes<br />e séries</Frase></Cartao>
				</>
			) : (
				<>
					<Cartao x={60} w={800} y={200} h={190} em={tH} style={{ ...MEIO, borderBottomLeftRadius: 10, fontFamily: SANS, fontWeight: 700, fontSize: 84, letterSpacing: -1.8, color: f >= tN ? "#C9CED8" : COR.ink }}>Hi, my name is…</Cartao>
					<Entra em={fr(574)} style={{ position: "absolute", left: 40, right: 40, top: 470, textAlign: "center" }}><Frase size={112}>Dá a <span style={{ color: COR.vermelho }}>sensação</span><br />de aprendizado</Frase></Entra>
					<Troca top={800} size={54} itens={[[fr(572), "Quem está começando é seduzido por uma frasezinha"]]} />
				</>
			)}
		</>
	);
};

// 576-596 · você quer rápido E fácil: não andam juntos. Novo conceito: RÁPIDO E DIFÍCIL
const C576: React.FC = () => {
	const f = useCurrentFrame(); const tF = fr(585), tX = fr(588), tD = fr(590);
	const chip = (x: number, em: number, t: string, cor: string, cheio: boolean) => (
		<Cartao x={x} w={476} y={220} h={280} em={em} style={{ ...MEIO, ...(cheio ? AZUL_CHEIO : {}), fontFamily: DISPLAY, fontWeight: 800, fontSize: 112, letterSpacing: -3.4, color: cheio ? "#fff" : cor }}>{t}</Cartao>
	);
	const neg = f >= tX && f < tD;
	return (
		<>
			<Pilula>Um novo conceito</Pilula>
			{chip(48, fr(584), "Rápido", COR.azul, f >= tD)}
			{f >= tD ? chip(556, tF, "Difícil", COR.azul, true) : chip(556, tF, "Fácil", f >= tX ? "#C9CED8" : COR.ink2, false)}
			<Entra em={tF} style={{ position: "absolute", left: 496, top: 316, width: 88, height: 88, borderRadius: 99, background: neg ? COR.vermelho : COR.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, lineHeight: 1 }}>{neg ? "≠" : "+"}</Entra>
			{f >= tD
				? <Entra key="d" em={tD} style={{ position: "absolute", left: 40, right: 40, top: 590, textAlign: "center" }}><Frase size={132}>Aprenda inglês</Frase><Frase size={132} c={COR.azul}>rápido e difícil</Frase></Entra>
				: <Entra key="x" em={tX} style={{ position: "absolute", left: 48, right: 48, top: 610, textAlign: "center" }}><Apoio size={62} c={COR.ink}>Duas coisas que <B c={COR.vermelho}>não andam juntas</B></Apoio></Entra>}
		</>
	);
};

// ── LOTE 6 ── o discurso de 15 minutos e O TREINO
// os 15 minutos do discurso, num cartão. Barra cinza = minuto; azul claro = essencial; azul = o minuto em foco; verde = feito.
const Minutos: React.FC<{ em: number; y: number; azulAte?: number; foco?: number; feitos?: number }> = ({ em, y, azulAte = 0, foco = -1, feitos = 0 }) => {
	const f = useCurrentFrame();
	return (
		<Cartao y={y} h={220} em={em}>
			<div style={{ position: "absolute", left: 40, right: 40, top: 55, height: 110, display: "flex", gap: 8 }}>
				{Array.from({ length: 15 }, (_, i) => {
					const feito = i < feitos, on = i === foco, ess = i < azulAte && f >= em;
					return <div key={i} style={{ flex: 1, height: on ? 150 : 110, marginTop: on ? -20 : 0, borderRadius: 14, background: feito ? COR.verde : on ? COR.azul : ess ? "rgba(47,91,255,0.32)" : "#E3E8F0" }} />;
				})}
			</div>
		</Cartao>
	);
};
// 607-641 · um discurso de 15 minutos: 90% dele é o essencial (you, that, can, I am, falados rápido)
const C607: React.FC = () => {
	const f = useCurrentFrame();
	return (
		<>
			<Pilula>Começando</Pilula>
			<Centro top={175}><Entra em={fr(609)}><Frase size={116}>Um discurso de</Frase><Frase size={116} c={COR.azul}>15 minutos</Frase></Entra></Centro>
			<Minutos em={fr(609) + 10} y={460} azulAte={f >= fr(611) ? 13.5 : 0} />
			<Troca top={760} size={60} itens={[[fr(611), <><B>90%</B> dele é o essencial do inglês</>], [fr(638), <>you · that · can · I am</>], [fr(640), <>Só que faladas <B>rápido</B>, dentro de expressão</>]]} />
		</>
	);
};
// 659-689 · O TREINO: pega 1 minuto → lê e ouve até entender sem legenda → (não vai pro minuto 2!) → repete ele por 20 a 30 minutos
const C659: React.FC = () => {
	const f = useCurrentFrame(); const t1 = fr(663), tErr = fr(671), tRep = fr(674), tTempo = fr(677);
	const erro = f >= tErr && f < tRep; const giro = ap(f, tTempo, 40);
	const num: React.CSSProperties = { width: 110, height: 110, borderRadius: 30, background: COR.azul, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 76, lineHeight: 1, flexShrink: 0 };
	const passo: React.CSSProperties = { display: "flex", alignItems: "center", gap: 30, padding: "0 36px", boxSizing: "border-box" };
	return (
		<>
			<Pilula>O treino</Pilula>
			<Minutos em={fr(661)} y={165} foco={f >= t1 ? 0 : -1} />
			{erro ? <svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}><Traco d="M 146 200 L 206 350" em={fr(672)} dur={6} cor={COR.vermelho} larg={14} len={220} /><Traco d="M 206 200 L 146 350" em={fr(672) + 4} dur={6} cor={COR.vermelho} larg={14} len={220} /></svg> : null}
			<Cartao y={425} h={180} em={fr(664)} style={passo}><div style={num}>1</div><Apoio size={50} c={COR.ink}>Ler e ouvir <B>até entender sem legenda</B></Apoio></Cartao>
			{f >= tRep ? (
				<Cartao y={630} h={180} em={tRep} style={passo}>
					<div style={num}>2</div>
					<Apoio size={50} c={COR.ink} style={{ flex: 1 }}>Repetir esse mesmo minuto{f >= tTempo ? <> por <B>20 a 30 minutos</B></> : null}</Apoio>
					{f >= tTempo ? <svg width={120} height={120} style={{ flexShrink: 0 }}><circle cx={60} cy={60} r={48} fill="none" stroke="#E3E8F0" strokeWidth={13} /><circle cx={60} cy={60} r={48} fill="none" stroke={COR.azul} strokeWidth={13} strokeLinecap="round" strokeDasharray={302} strokeDashoffset={302 * (1 - giro)} transform="rotate(-90 60 60)" /></svg> : null}
				</Cartao>
			) : erro ? <Entra em={fr(672)} style={{ position: "absolute", left: 40, right: 40, top: 650, textAlign: "center" }}><Frase size={96} c={COR.vermelho}>Ir pro minuto 2?<br />Tá errado.</Frase></Entra> : null}
			<Troca top={880} size={56} itens={[[fr(680), "Chato? Eu falei que ia ser chato"], [fr(688), <>Isso é <B>lapidação do ouvido</B></>]]} />
		</>
	);
};
// 690-716 · NÍVEL HARD: depois dos 20–30 min, solta em 2x. A escada: 0,75 → 1 → 1,5 → 2
const C690: React.FC = () => {
	const f = useCurrentFrame(); const deg = [fr(711), fr(712), fr(713), fr(714)]; const rot = ["0,75x", "1x", "1,5x", "2x"];
	let at = f >= fr(694) ? 3 : -1; if (f >= deg[0]) { at = 0; deg.forEach((d, i) => { if (f >= d) at = i; }); }
	return (
		<>
			<Pilula>Nível hard</Pilula>
			<Centro top={180}><Entra em={fr(694)}><Frase size={106}>Depois, solta em <Azul>2x</Azul></Frase></Entra></Centro>
			<Cartao y={330} h={480} em={fr(694)}>
				<div style={{ position: "absolute", left: 40, right: 40, bottom: 40, display: "flex", alignItems: "flex-end", gap: 18 }}>
					{rot.map((t, i) => { const on = i === at; return <div key={i} style={{ flex: 1, height: 160 + i * 80, borderRadius: 28, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 24, boxSizing: "border-box", fontFamily: DISPLAY, fontWeight: 800, fontSize: 70, letterSpacing: -2, background: on ? COR.azul : "#EEF2FF", color: on ? "#fff" : COR.ink2, boxShadow: on ? "0 20px 50px rgba(47,91,255,0.35)" : undefined }}>{t}</div>; })}
				</div>
			</Cartao>
			<Troca top={865} size={54} itens={[[fr(699), "O solo do guitarrista não é a velocidade máxima dele"], [fr(706), <>Ele treina <B>mais rápido que o normal</B></>], [fr(708), "Aí fazer em 1x fica fácil"], [fr(711), "Tá rápido? Começa no 0,75"], [fr(712), <>Mas depois <B>tem que subir</B></>]]} />
		</>
	);
};
// 717-729 · O BULLET: fácil = fraco (a academia)
const C717: React.FC = () => (
	<>
		<Pilula>A vida se resume nisso</Pilula>
		<Centro top={195}><Frase size={226} c={COR.ink2}>Fácil</Frase></Centro>
		<Cartao y={450} h={290} style={{ ...MEIO, background: COR.vermelho, boxShadow: "0 26px 70px rgba(229,56,59,0.32)" }}><Frase size={196} c="#fff">= fraco</Frase></Cartao>
		<Entra em={fr(725)} style={{ position: "absolute", left: 80, right: 80, top: 805, textAlign: "center" }}><Apoio size={54}>Na academia é assim: <b style={{ color: COR.ink }}>na última, você quase não consegue</b></Apoio></Entra>
	</>
);
// 729.5-745 · repete com os outros minutos (a barra vai ficando verde) · é a parte 1 do treinamento
const C730: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(729.5); const feitos = Math.max(1, Math.min(15, 1 + Math.floor((f - t0) / 12)));
	return (
		<>
			<Pilula>E depois</Pilula>
			<Centro top={175}><Frase size={112}>Repete com os</Frase><Frase size={112} c={COR.azul}>outros minutos</Frase></Centro>
			<Minutos em={t0} y={460} feitos={feitos} />
			<Troca top={760} size={58} itens={[[fr(730), <>É exatamente isso que tem <B>no treinamento</B></>], [fr(731), "Essa é a parte 1"], [fr(741), <>“Aprenda fácil”: <B c={COR.vermelho}>não vai ter velocidade</B></>], [fr(745), "Você fica no 1x do consciente"]]} />
		</>
	);
};

export const LOTE5: Cena[] = [{ de: 456, C: C456 }, { de: 488, C: C488 }, { de: 505, C: C505 }, { de: 563, C: C563 }, { de: 576, C: C576 }, { de: 596.5, C: C597N },
	{ de: 607, C: C607 }, { de: 659, C: C659 }, { de: 690, C: C690 }, { de: 717, C: C717 }, { de: 729.5, C: C730 }];
export const LOTE5_FIM = 747; // primeira frase depois do lote
