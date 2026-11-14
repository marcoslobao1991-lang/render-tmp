// LOTE 1 (13/11, 3ª versão = SISTEMA v2): LEAD + "aprender não é treinar" (frases 1 a 82).
// A régua de AULA aprovada continua (1 quadro = 1 ponto, parado; desenho só onde ensina; partes entram na palavra).
// O que mudou na v2 ("bem melhor", Marcos): tudo centralizado ocupando o palco, um só tipo de cartão (branco, sombra, sem contorno),
// azul só na RESPOSTA do quadro. A versão anterior está em motion/_v1/lote1.tsx.bak.
import React from "react";
import { useCurrentFrame } from "remotion";
import { COR, PALCO, DISPLAY, SANS, SOMBRA, Pilula, Cartao, Frase, Apoio, Entra, Traco, ap, fr, fw, Cena } from "./base";

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;

// TÍTULO DA AULA (o título do docs dele). Fica parado; só a linha de apoio entra na palavra, num cartão.
const Titulo: React.FC<{ apoio: [number, string] }> = ({ apoio }) => (
	<>
		<Pilula>Aula</Pilula>
		<Centro top={180}>
			<Frase size={156} style={{ whiteSpace: "nowrap" }}>Como <Azul>eu</Azul></Frase>
			<Frase size={156} style={{ whiteSpace: "nowrap" }}>fiquei</Frase>
			<Frase size={156} style={{ whiteSpace: "nowrap" }}>fluente</Frase>
			<Frase size={156} style={{ whiteSpace: "nowrap" }}>em inglês</Frase>
		</Centro>
		<Cartao y={820} h={170} em={apoio[0]} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><Apoio size={54} c={COR.ink}>{apoio[1]}</Apoio></Cartao>
	</>
);
// 1-10 · abertura
export const C01: React.FC = () => <Titulo apoio={[fw(1, "ninguém"), "As coisas que ninguém fala pra você"]} />;

// 15-23 · PONTO: traduzir na cabeça. Desenho: inglês → português → ideia (bolinha lenta). "Fluência vem da velocidade": caminho direto.
const No: React.FC<{ x: number; y: number; t: string; em: number; cor?: string; apagado?: boolean }> = ({ x, y, t, em, cor = COR.ink, apagado }) => (
	<Entra em={em} style={{ position: "absolute", left: x - 170, top: y - 78, width: 340, height: 156, borderRadius: 40, background: "#fff", boxShadow: SOMBRA, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 62, letterSpacing: -1.6, color: apagado ? "#C9CED8" : cor }}>{t}</Entra>
);
const C15: React.FC = () => {
	const f = useCurrentFrame(); const tA = fw(15, "traduzindo"), tV = fw(18, "velocidade"), tX = fr(22);
	const lento = ((f - tA) % 75) / 75, rapido = ((f - tV) % 18) / 18; const fora = f >= tX + 8;
	return (
		<>
			<Pilula>Traduzir na cabeça</Pilula>
			<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}>
				<Traco d="M 238 400 Q 250 640 372 652" em={tA + 4} cor={fora ? COR.linha : COR.vermelho} larg={8} />
				<Traco d="M 708 652 Q 830 640 842 400" em={tA + 12} cor={fora ? COR.linha : COR.vermelho} larg={8} />
				{f >= tV ? <Traco d="M 404 312 Q 540 150 676 312" em={tV} cor={COR.azul} larg={13} /> : null}
			</svg>
			<No x={238} y={330} t="inglês" em={fr(15)} />
			<No x={540} y={652} t="português" em={tA} cor={COR.vermelho} apagado={fora} />
			<No x={842} y={330} t="ideia" em={tA + 8} />
			<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}>
				{f >= tA + 20 && !fora ? <circle cx={238 + lento * 604} cy={420 + Math.sin(lento * Math.PI) * 150} r={18} fill={COR.vermelho} /> : null}
				{f >= tV + 12 ? <circle cx={404 + rapido * 272} cy={312 - Math.sin(rapido * Math.PI) * 81} r={20} fill={COR.azul} /> : null}
				{f >= tX ? <><Traco d="M 440 572 L 640 732" em={tX} dur={7} cor={COR.vermelho} larg={15} /><Traco d="M 640 572 L 440 732" em={tX + 5} dur={7} cor={COR.vermelho} larg={15} /></> : null}
			</svg>
			<Cartao y={800} h={240} em={tV - 10} style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}><Frase size={88}>Fluência vem<br />da <Azul>velocidade</Azul></Frase></Cartao>
		</>
	);
};

// 24-34 · ele conta a história dele: volta o título da aula, parado (sem bullet novo)
const C24: React.FC = () => <Titulo apoio={[fw(34, "poupar"), "Vou te poupar uns caminhos"]} />;

// 38-61 · PONTO: aprender × treinar. UM quadro comparativo que se monta na fala:
//   esquerda (aprender): caderninho se escrevendo → nota 10 → "não é fluente"
//   direita (treinar): acende quando ele diz "treinar inglês" → processo automático → velocidade
const C38: React.FC = () => {
	const f = useCurrentFrame();
	const tC = fw(43, "caderninho"), t10 = fw(51, "10"), tNao = fr(53), tAuto = fw(58, "processo") - 10, tTre = fw(60, "treinar") - 6, tVel = fw(61, "velocidade");
	const linhas = [fw(44, "palavra"), fw(44, "frase"), fw(45, "regra"), fw(46, "outra", 0), fw(46, "outra", 2)];
	const aceso = f >= tTre; const giro = ((f - tTre) / 46) * 360;
	const col: React.CSSProperties = { position: "absolute", top: 170, width: 476, height: 830, borderRadius: 44, background: "#fff", boxShadow: SOMBRA };
	const tit: React.CSSProperties = { position: "absolute", left: 0, right: 0, top: 40, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 86, letterSpacing: -2.8 };
	const rod: React.CSSProperties = { position: "absolute", left: 24, right: 24, bottom: 48, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 46, lineHeight: 1.12, letterSpacing: -0.6 };
	return (
		<>
			<Pilula>A primeira coisa</Pilula>
			{/* APRENDER */}
			<Entra em={fw(39, "aprender")} style={{ ...col, left: 48 }}>
				<div style={{ ...tit, color: COR.ink }}>Aprender</div>
				{f >= tC ? (
					<Entra em={tC} style={{ position: "absolute", left: 88, top: 180, width: 300, height: 380, borderRadius: 22, border: `3px solid ${COR.linha}`, background: COR.gelo }}>
						<div style={{ position: "absolute", left: 44, top: 0, bottom: 0, width: 3, background: "rgba(229,56,59,0.45)" }} />
						{linhas.map((em, i) => <div key={i} style={{ position: "absolute", left: 66, top: 150 + i * 44, height: 9, borderRadius: 8, width: ap(f, em, 10) * (200 - (i % 3) * 36), background: COR.ink2 }} />)}
						{f >= t10 ? <Entra em={t10} style={{ position: "absolute", left: 62, top: 6, fontFamily: DISPLAY, fontWeight: 800, fontSize: 112, letterSpacing: -4, color: COR.vermelho }}>10</Entra> : null}
						<svg width={300} height={380} style={{ position: "absolute", inset: 0 }}><Traco d="M 56 76 C 56 14 246 14 246 78 C 246 146 56 146 58 78" em={t10 + 5} dur={12} cor={COR.vermelho} larg={6} len={700} /></svg>
					</Entra>
				) : null}
				{f >= tNao
					? <Entra key="n" em={tNao} style={{ ...rod, color: COR.vermelho, fontSize: 54 }}>Não é fluente</Entra>
					: f >= fr(48) ? <Entra key="p" em={fr(48)} style={{ ...rod, color: COR.ink2 }}>Passa na prova da escola</Entra> : null}
			</Entra>
			{/* TREINAR */}
			<Entra em={fw(39, "treinar")} style={{ ...col, left: 556, boxShadow: aceso ? `0 0 0 7px ${COR.azul}, 0 26px 70px rgba(47,91,255,0.28)` : SOMBRA }}>
				<div style={{ ...tit, color: aceso ? COR.azul : "#C9CED8" }}>Treinar</div>
				{aceso ? (
					<svg width={476} height={830} style={{ position: "absolute", inset: 0 }}>
						<g transform={`translate(13 20) rotate(${giro} 225 350)`}>
							<Traco d="M 225 230 A 120 120 0 1 1 121 290" em={tTre} dur={16} cor={COR.azul} larg={16} len={700} />
							{f >= tTre + 14 ? <path d="M 96 262 L 124 296 L 158 268" fill="none" stroke={COR.azul} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" /> : null}
						</g>
					</svg>
				) : null}
				{f >= tVel
					? <Entra key="v" em={tVel} style={{ ...rod, color: COR.azul, fontSize: 54 }}>Dá velocidade</Entra>
					: f >= tAuto ? <Entra key="a" em={tAuto} style={{ ...rod, color: aceso ? COR.ink : COR.ink2 }}>Falar é um processo automático</Entra> : null}
			</Entra>
			<Entra em={fw(39, "versus")} style={{ position: "absolute", left: 496, top: 520, width: 88, height: 88, borderRadius: 99, background: COR.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 56, lineHeight: 1 }}>×</Entra>
		</>
	);
};

// 62-79 · DEMONSTRAÇÃO: o ping pong. Explicar ("ah, entendi") não resolve; só repetir.
const C62: React.FC = () => {
	const f = useCurrentFrame(); const tP = fr(68), erros = [fr(75), fr(77), fr(78)], tR = fr(79);
	const ciclo = ((f - tP) % 34) / 34; const bx = 190 + (ciclo < 0.5 ? ciclo * 2 : 2 - ciclo * 2) * 700; const by = 640 - Math.abs(Math.sin(ciclo * Math.PI * 2)) * 170;
	return (
		<>
			<Pilula>Qualquer esporte</Pilula>
			<Centro top={185}>
				{f < tR ? <Frase size={112}>Só o <Azul>treino</Azul> resolve</Frase> : <Entra em={tR}><Frase size={112} c={COR.azul}>Só a repetição</Frase></Entra>}
			</Centro>
			<Cartao y={360} h={500} em={tP}>
				<svg width={984} height={500} viewBox="48 360 984 500" style={{ position: "absolute", inset: 0 }}>
					<Traco d="M 150 660 L 930 660" em={tP + 4} cor={COR.ink} larg={14} />
					<Traco d="M 540 660 L 540 560" em={tP + 8} dur={8} cor={COR.ink} larg={9} />
					<Traco d="M 310 660 L 310 790 M 770 660 L 770 790" em={tP + 10} dur={8} cor={COR.ink} larg={12} />
					{f >= tP + 16 ? <circle cx={bx} cy={by} r={24} fill={COR.azul} /> : null}
				</svg>
			</Cartao>
			<div style={{ position: "absolute", left: 0, right: 0, top: 905, display: "flex", alignItems: "center", justifyContent: "center", gap: 26 }}>
				{erros.map((em, i) => <Entra key={i} em={em}><svg width={96} height={96}><path d="M 16 16 L 80 80 M 80 16 L 16 80" stroke={COR.vermelho} strokeWidth={15} strokeLinecap="round" /></svg></Entra>)}
				<Entra em={fr(76)} style={{ marginLeft: 16 }}><Apoio size={60} c={COR.ink}>de novo</Apoio></Entra>
			</div>
		</>
	);
};

// 80-82 · O BULLET da parte: treinar = repetir (o que ele digita no docs). A resposta é o cartão azul.
const C80: React.FC = () => (
	<>
		<Pilula>A verdade dura e crua</Pilula>
		<Centro top={200}><Frase size={220}>Treinar</Frase></Centro>
		<Cartao y={455} h={290} em={fw(80, "igual")} style={{ background: COR.azul, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 26px 70px rgba(47,91,255,0.35)" }}><Frase size={196} c="#fff">= repetir</Frase></Cartao>
		<Entra em={fw(82, "sem") - 20} style={{ position: "absolute", left: 90, right: 90, top: 810, textAlign: "center" }}><Apoio size={56} c={COR.ink2}>Não tem como ficar fluente <b style={{ color: COR.ink }}>sem repetir várias vezes</b></Apoio></Entra>
	</>
);

export const LOTE1: Cena[] = [{ de: 1, C: C01 }, { de: 15, C: C15 }, { de: 24, C: C24 }, { de: 38, C: C38 }, { de: 62, C: C62 }, { de: 80, C: C80 }];
export const LOTE1_FIM = 86; // primeira frase depois do lote
