// LOTES 7 e 8 (13/11, SISTEMA v2): o discurso inteiro sem legenda · o salto · depois a série · A PROVA (contagem do Friends) ·
// mesmas expressões o tempo todo · 1 episódio dominado × 1 temporada sem entender · TIPO 2: repetição espaçada (Anki) ·
// 100% das temporadas + shadowing · por que ninguém chega ao fim · IMERSÃO SIMULADA · a fórmula (ponte pra oferta).
// Frases 747 a 1039. Régua de AULA + v2 (centralizado, cartão único, azul só na resposta). Versão anterior em motion/_v1/lote7.tsx.bak.
import React from "react";
import { C814N, C824N } from "./real";
import { useCurrentFrame } from "remotion";
import { COR, PALCO, DISPLAY, SANS, SOMBRA, Pilula, Cartao, Troca, Frase, Apoio, Entra, Traco, ap, fr, Cena } from "./base";

const Azul: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;
const B: React.FC<{ c?: string; children: React.ReactNode }> = ({ c = COR.azul, children }) => <b style={{ color: c }}>{children}</b>;
const MEIO: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" };
const AZUL_CHEIO: React.CSSProperties = { background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" };
const ANEL = `0 0 0 7px ${COR.azul}, 0 26px 70px rgba(47,91,255,0.28)`;
const Bola: React.FC<{ em: number; top: number; children: React.ReactNode }> = ({ em, top, children }) => (
	<Entra em={em} style={{ position: "absolute", left: 496, top, width: 88, height: 88, borderRadius: 99, background: COR.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 60, lineHeight: 1 }}>{children}</Entra>
);

// 747-765 · o resultado do treino: o discurso inteiro, sem legenda
const C747: React.FC = () => (
	<>
		<Pilula>No final disso</Pilula>
		<Centro top={175}><Frase size={112}>O discurso inteiro,</Frase><Frase size={112} c={COR.azul}>sem legenda</Frase></Centro>
		<Cartao y={460} h={220}>
			<div style={{ position: "absolute", left: 40, right: 40, top: 55, height: 110, display: "flex", gap: 8 }}>{Array.from({ length: 15 }, (_, i) => <div key={i} style={{ flex: 1, borderRadius: 14, background: COR.verde }} />)}</div>
		</Cartao>
		<Troca top={760} size={58} itens={[[fr(749), <>Você ouviu cada minuto umas <B>20 vezes</B></>], [fr(753), "Dá pra fazer outra coisa nessa hora"], [fr(760), <>O que importa é <B>lapidar o ouvido</B></>], [fr(762), "“Isso de novo? Entendi já.”"], [fr(765), <>É <B>agora</B> que começa</>]]} />
	</>
);

// 784-813 · o salto: com um discurso só, o gráfico do seu inglês dá um degrau
const C784: React.FC = () => {
	const tS = fr(795);
	return (
		<>
			<Pilula>O que acontece com o seu inglês</Pilula>
			<Cartao y={170} h={610}>
				<svg width={984} height={610} viewBox="48 170 984 610" style={{ position: "absolute", inset: 0 }}>
					<Traco d="M 130 710 L 130 240 M 130 710 L 960 710" em={fr(784)} cor="#DCE1EA" larg={8} />
					<Traco d="M 130 640 L 480 620" em={fr(784) + 8} dur={16} cor={COR.ink2} larg={12} />
					<Traco d="M 480 620 L 530 340" em={tS} dur={10} cor={COR.azul} larg={16} len={400} />
					<Traco d="M 530 340 L 950 300" em={tS + 10} dur={16} cor={COR.azul} larg={12} />
				</svg>
				<Entra em={tS + 6} style={{ position: "absolute", left: 530, top: 250 }}><Frase size={104} c={COR.azul}>um salto</Frase></Entra>
			</Cartao>
			<Troca top={840} size={58} itens={[[fr(785), <>Nível hard: o discurso inteiro <B>em 2x</B></>], [fr(795), <>Com <B>apenas 1 discurso</B></>], [fr(805), "“Esse cara falou a real pra mim”"], [fr(812), "O próximo discurso vai ser fichinha"]]} />
		</>
	);
};

// 856-866 · a conclusão da contagem: as mesmas expressões, o tempo todo
const C856: React.FC = () => (
	<>
		<Pilula>A base de repetição</Pilula>
		<Centro top={190}><Frase size={150}>As mesmas</Frase><Frase size={150}>expressões</Frase></Centro>
		<Cartao y={540} h={270} em={fr(861)} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={140} c="#fff">o tempo todo</Frase></Cartao>
		<Entra em={fr(865)} style={{ position: "absolute", left: 70, right: 70, top: 870, textAlign: "center" }}><Apoio size={52}>Muda o tema do capítulo. <b style={{ color: COR.ink }}>A base é sempre a mesma</b></Apoio></Entra>
	</>
);

// 876-912 · 1 episódio treinado massivamente > 1 temporada inteira sem entender quase nada
const C876: React.FC = () => {
	const f = useCurrentFrame(); const t2 = fr(876) + 150;
	const rod: React.CSSProperties = { position: "absolute", left: 24, right: 24, bottom: 46, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 46, lineHeight: 1.12 };
	return (
		<>
			<Pilula>A conclusão</Pilula>
			<Cartao x={48} w={476} y={190} h={540} em={fr(876)} style={{ boxShadow: ANEL }}>
				<div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 240, lineHeight: 1, letterSpacing: -6, color: COR.azul }}>1</div>
				<div style={{ ...rod, color: COR.ink }}>episódio treinado massivamente</div>
			</Cartao>
			<Bola em={t2 - 10} top={416}>&gt;</Bola>
			<Cartao x={556} w={476} y={190} h={540} em={t2}>
				<div style={{ position: "absolute", left: 44, right: 44, top: 70, display: "flex", flexWrap: "wrap", gap: 10 }}>{Array.from({ length: 24 }, (_, i) => <div key={i} style={{ width: 56, height: 42, borderRadius: 9, background: "#DCE1EA" }} />)}</div>
				<div style={{ ...rod, color: COR.ink2 }}>temporada inteira sem entender</div>
			</Cartao>
			{f >= fr(911) ? <Troca top={810} size={58} itens={[[fr(911), <>No próximo episódio, <B>muito mais facilidade</B></>]]} /> : null}
		</>
	);
};

// 911 · dominou 1 episódio → o próximo já começa quase todo conhecido (79% das palavras do ep. 2 de Friends estão no ep. 1: conta do app)
const C911: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(911), t2 = t0 + 70; const p = ap(f, t2 + 8, 34);
	const barra: React.CSSProperties = { position: "absolute", left: 44, right: 44, bottom: 44, height: 44, borderRadius: 16, background: "#E3E8F0", overflow: "hidden" };
	const tit: React.CSSProperties = { position: "absolute", left: 44, top: 34, fontFamily: DISPLAY, fontWeight: 800, fontSize: 70, letterSpacing: -2.2, color: COR.ink };
	return (
		<>
			<Pilula>A conclusão</Pilula>
			<Cartao y={175} h={230} em={t0}>
				<div style={tit}>Episódio 1</div>
				<div style={{ position: "absolute", right: 44, top: 44, fontFamily: SANS, fontWeight: 700, fontSize: 46, color: COR.verde }}>dominado</div>
				<div style={barra}><div style={{ width: "100%", height: "100%", background: COR.verde }} /></div>
			</Cartao>
			<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}><Traco d="M 540 425 L 540 500 M 512 474 L 540 502 L 568 474" em={t2 - 6} dur={8} cor={COR.ink2} larg={12} len={200} /></svg>
			<Cartao y={525} h={330} em={t2} style={{ boxShadow: ANEL }}>
				<div style={tit}>Episódio 2</div>
				<div style={{ position: "absolute", right: 44, top: 14, fontFamily: DISPLAY, fontWeight: 800, fontSize: 130, letterSpacing: -4, color: COR.azul }}>{Math.round(p * 79)}%</div>
				<div style={{ position: "absolute", left: 46, top: 150, fontFamily: SANS, fontWeight: 700, fontSize: 44, color: COR.ink2 }}>das palavras você já conhece</div>
				<div style={barra}><div style={{ width: `${p * 79}%`, height: "100%", background: COR.azul }} /></div>
			</Cartao>
			<Entra em={t2 + 40} style={{ position: "absolute", left: 48, right: 48, top: 905, textAlign: "center" }}><Apoio size={58} c={COR.ink}>A base do inglês <B>é a mesma</B></Apoio></Entra>
		</>
	);
};

// 913-959 · TIPO 2: repetição espaçada (Anki). Play → resposta → fácil / médio / difícil → quando a frase volta
const C913: React.FC = () => {
	const f = useCurrentFrame(); const tPlay = fr(939), tResp = fr(941), tBot = fr(943);
	const volta: [number, number, string][] = [[0, fr(952), "5 dias"], [2, fr(955), "5 minutos"], [1, fr(957), "30 minutos"]];
	let sel = -1, quando = ""; for (const [i, em, q] of volta) if (f >= em) { sel = i; quando = q; }
	const cor = [COR.verde, COR.azul, COR.vermelho], nome = ["Fácil", "Médio", "Difícil"];
	return (
		<>
			<Pilula>Tipo 2</Pilula>
			<Centro top={185}><Frase size={98} style={{ whiteSpace: "nowrap" }}>Repetição <Azul>espaçada</Azul></Frase></Centro>
			{f < tPlay ? <><Cartao y={370} h={320} em={fr(914)} /><Troca top={488} size={58} itens={[[fr(914), "Com o Anki"], [fr(918), <>É onde você treina a pronúncia: <B>shadowing</B></>], [fr(925), "Todas as temporadas de Friends e Two and a Half Men"], [fr(929), <>Divididas <B>frase por frase</B></>]]} /></> : (
				<>
					<Cartao y={340} h={250} em={tPlay} style={{ display: "flex", alignItems: "center", gap: 40, paddingLeft: 56, boxSizing: "border-box" }}>
						<svg width={140} height={140}><circle cx={70} cy={70} r={66} fill={COR.azul} /><path d="M 54 38 L 104 70 L 54 102 Z" fill="#fff" /></svg>
						<div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 60, letterSpacing: -1, color: f >= tResp ? COR.ink : "#B5BDCB" }}>{f >= tResp ? "a frase e a resposta" : "ouve a frase"}</div>
					</Cartao>
					<Entra em={tBot} style={{ position: "absolute", left: 48, right: 48, top: 630, display: "flex", gap: 18 }}>
						{nome.map((n, i) => <div key={i} style={{ flex: 1, height: 150, borderRadius: 34, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 66, letterSpacing: -2, background: sel === i ? cor[i] : "#fff", color: sel === i ? "#fff" : cor[i], boxShadow: SOMBRA }}>{n}</div>)}
					</Entra>
					{sel >= 0 ? <Entra key={sel} em={volta.find((v) => v[0] === sel)![1]} style={{ position: "absolute", left: 40, right: 40, top: 850, textAlign: "center" }}><Frase size={96} style={{ whiteSpace: "nowrap" }}>volta em <span style={{ color: cor[sel] }}>{quando}</span></Frase></Entra> : null}
				</>
			)}
		</>
	);
};

// 960-982 · imagina: 100% de todas as temporadas + shadowing
const C960: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(975) - 20; const p = ap(f, t0, 50);
	return (
		<>
			<Pilula>Imagina</Pilula>
			<Centro top={170}><Frase size={84}>Sempre as mesmas expressões.</Frase><Frase size={84} c={COR.azul} style={{ marginTop: 14 }}>Sempre uma coisa nova.</Frase></Centro>
			<Cartao y={555} h={270} em={t0}>
				<div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${100 * p}%`, background: COR.azul }} />
				<div style={{ position: "absolute", left: 50, top: 0, bottom: 0, display: "flex", alignItems: "center", gap: 30, opacity: Math.min(1, p * 3) }}>
					<Frase size={180} c="#fff">{Math.round(p * 100)}%</Frase>
					<Apoio size={50} c="#fff" style={{ lineHeight: 1.08 }}>de todas as<br />temporadas</Apoio>
				</div>
			</Cartao>
			<Troca top={870} size={54} itens={[[fr(976), <>E treinar o <B>shadowing</B>: repetir o que acabou de ouvir</>], [fr(977), "O que acontece com o seu inglês?"], [fr(982), "Aí você está aprendendo do jeito certo"]]} />
		</>
	);
};

// 983-1001 · por que quase ninguém zera todas as temporadas: porque fica fluente antes
const C983: React.FC = () => {
	const f = useCurrentFrame(); const tF = fr(1000); const ate = 4;
	return (
		<>
			<Pilula>Por que ninguém chega até o final?</Pilula>
			<div style={{ position: "absolute", left: 0, right: 0, top: 200, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 46, color: COR.ink2 }}>temporadas</div>
			<Cartao y={280} h={250}>
				<div style={{ position: "absolute", left: 30, right: 30, top: 50, height: 150, display: "flex", gap: 10 }}>
					{Array.from({ length: 10 }, (_, i) => <div key={i} style={{ flex: 1, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontWeight: 800, fontSize: 54, background: i < ate ? COR.azul : "#EEF1F6", color: i < ate ? "#fff" : "#B5BDCB" }}>{i + 1}</div>)}
				</div>
			</Cartao>
			{f >= tF ? (
				<>
					<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}><Traco d="M 445 300 L 445 610" em={tF} dur={8} cor={COR.verde} larg={13} len={320} /></svg>
					<Entra em={tF + 4} style={{ position: "absolute", left: 290, top: 590, padding: "18px 44px", borderRadius: 30, background: COR.verde, boxShadow: "0 26px 70px rgba(14,159,79,0.35)", fontFamily: DISPLAY, fontWeight: 800, fontSize: 92, letterSpacing: -2.6, color: "#fff" }}>fluente</Entra>
				</>
			) : null}
			<Troca top={830} size={56} itens={[[fr(986), "É muito difícil alguém zerar tudo"], [fr(991), "Tem que tirar o tempo do TikTok pra ficar naquilo"], [fr(1000), <>Porque fica <B c={COR.verde}>fluente antes disso</B></>], [fr(1001) + 60, "E assiste sem picotear frase por frase"]]} />
		</>
	);
};

// 1002-1016 · IMERSÃO SIMULADA: o caminho tem espinho, buraco, pedra e montanha; depois, o terreno plano
const C1002: React.FC = () => {
	const f = useCurrentFrame(); const tT = fr(1012), tPl = fr(1013);
	return (
		<>
			<Pilula>Depois disso</Pilula>
			<Centro top={180}><Frase size={120}>Imersão <Azul>simulada</Azul></Frase></Centro>
			{f >= tT ? (
				<Cartao y={350} h={440} em={tT}>
					<svg width={984} height={440} viewBox="30 420 1020 440" style={{ position: "absolute", inset: 0 }}>
						<Traco d="M 60 760 L 130 700 L 170 760 L 230 640 L 280 760 L 330 800 L 380 760 L 450 560 L 520 760 L 580 620 L 640 520" em={tT + 6} dur={50} cor={COR.ink2} larg={12} len={1900} />
						<Traco d="M 640 520 L 1020 520" em={tPl} dur={16} cor={COR.azul} larg={16} len={400} />
						{f >= tPl + 14 ? <circle cx={900} cy={470} r={34} fill={COR.azul} /> : null}
					</svg>
				</Cartao>
			) : null}
			<Troca top={f >= tT ? 850 : 500} size={f >= tT ? 54 : 62} itens={[[fr(1005), <>Eu <B>nunca saí do país</B></>], [fr(1008), "Tudo o que eu escutava no dia era em inglês"], [fr(1011), <>Se o inglês <B>rápido e fácil</B> existe, o nome dele é esse</>], [fr(1012), "Antes: espinho, buraco, pedra, montanha"], [fr(1013), <>Depois, <B>sua vida nunca mais é a mesma</B></>]]} />
		</>
	);
};

// 1017-1036 · o mundo abre: conteúdo em inglês, só escutar o que você gosta
const C1017: React.FC = () => (
	<>
		<Pilula>Imersão simulada</Pilula>
		<Centro top={190}><Frase size={176}>O mundo</Frase><Frase size={176} c={COR.azul}>abre</Frase><Frase size={176}>as portas</Frase></Centro>
		<Troca top={800} size={60} itens={[[fr(1023), "Um leque de conteúdo em inglês"], [fr(1024), "O que você tem que fazer?"], [fr(1025), <><B>Nada.</B> Só escutar o assunto que você gosta</>], [fr(1034), <>Esquece que está em inglês</>]]} />
	</>
);

// 1037-1039 · A FÓRMULA (ponte pra oferta): continuada + espaçada, dentro do essencial → subconsciente
const C1037: React.FC = () => {
	const chip = (x: number, em: number, t: React.ReactNode) => <Cartao x={x} w={476} y={190} h={230} em={em} style={{ ...MEIO, fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, lineHeight: 1.02, letterSpacing: -2, color: COR.azul }}>{t}</Cartao>;
	return (
		<>
			<Pilula>A fórmula</Pilula>
			{chip(48, fr(1037), <>Repetição<br />continuada</>)}
			{chip(556, fr(1037) + 40, <>Repetição<br />espaçada</>)}
			<Bola em={fr(1037) + 30} top={261}>+</Bola>
			<Entra em={fr(1038)} style={{ position: "absolute", left: 0, right: 0, top: 455, textAlign: "center" }}><Apoio size={54}>dentro do essencial</Apoio></Entra>
			<svg width={1080} height={PALCO.h} style={{ position: "absolute", inset: 0 }}><Traco d="M 540 545 L 540 640 M 510 610 L 540 642 L 570 610" em={fr(1039)} dur={10} cor={COR.azul} larg={14} len={220} /></svg>
			<Cartao y={670} h={300} em={fr(1039) + 8} style={{ ...AZUL_CHEIO, ...MEIO }}><Frase size={104} c="#fff">Inglês no<br />subconsciente</Frase></Cartao>
		</>
	);
};

export const LOTE7: Cena[] = [{ de: 747, C: C747 }, { de: 784, C: C784 }, { de: 814, C: C814N }, { de: 824, C: C824N }, { de: 856, C: C856 }, { de: 876, C: C876 },
	{ de: 911, C: C911 }, { de: 913, C: C913 }, { de: 960, C: C960 }, { de: 983, C: C983 }, { de: 1002, C: C1002 }, { de: 1017, C: C1017 }, { de: 1037, C: C1037 }];
