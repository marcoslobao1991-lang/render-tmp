// REMAKE da VSL oficial da Fluency ("Eu fiquei fluente do jeito mais sem graça…", 26:26). Áudio contínuo em 1× (frame = segundo × 30).
// 3ª versão (15/11, Marcos: "a edição tem que reduzir o esforço cognitivo… você empilha um monte de coisa… repensa tudo"):
// em cada instante a tela tem UMA coisa só + a frase-guia do ponto, parada, sempre no mesmo lugar.
//   • ELE em tela cheia (padrão, onde ele existe no original)
//   • DESENHO em cima + ele embaixo (só nos pontos em que mostrar ensina mais que falar)
//   • LOUSA (motion/lousa.tsx): remake do slide azul-marinho do original, tela cheia, nos 10 momentos em que ele existia
//   • B-ROLL novo onde ele não existe (inteiro, ou embaixo do desenho)
// Cortes secos, sem deslizar nem fade. De 17:34 em diante entra a OFERTA (mesmo áudio da fluency-yt-rmkt).
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, CalculateMetadataFunction } from "remotion";
import { COR, DISPLAY, Fundo, s } from "./motion/base";
import { ELE } from "./ele";
import { ROTEIRO, Trecho } from "./roteiro";
import { Oferta } from "../fluency-yt-rmkt/motion/oferta";

export type Props = { semVideo?: boolean; semAudio?: boolean; src?: string; audio?: string; broll?: string }; // broll = pasta dos b-rolls por URL (render fora da máquina)
export const FLUENCY_REMAKE_DEFAULTS: Props = { semVideo: false, semAudio: false };
const TOTAL_S = 1586.34, OFERTA_DE = 1054.28;
export const FLUENCY_REMAKE_FRAMES = Math.round(TOTAL_S * 30);
export const calculateFluencyRemake: CalculateMetadataFunction<Props> = () => ({ durationInFrames: FLUENCY_REMAKE_FRAMES });

const ZONA = 812; // altura da zona do desenho; embaixo dela ficam 1108 px pra ele (cabeça + peito) ou pro b-roll
export const trechoEm = (frame: number): Trecho | null => { let c: Trecho | null = null; for (const x of ROTEIRO) if (frame >= s(x.de)) c = x; return c; };
// janelas (em frames) em que ELE existe no original. O mapa foi medido a 5 fps (erra a borda em até 0,2 s): 9 quadros de folga de cada lado.
const JANELAS: [number, number][] = ELE.filter(([a]) => a < OFERTA_DE).map(([a, b]) => [s(a) + 9, b >= OFERTA_DE ? s(OFERTA_DE) : s(b) - 9] as [number, number]).filter(([a, b]) => b - a >= 60);
// o original tem ele de 0 a 0,5 s (a 1ª janela de ele.ts só começa em 3,4 s): a abertura entra à parte
const ABRE_ATE = 12; // o original tem ele limpo até o quadro 13; no 14 já entra o borrão da transição antiga
// BURACOS: dentro das janelas, trechos em que a edição antiga pôs título amarelo/cartão POR CIMA dele (work/fluency-copia/_tit.mjs, 10 fps). Ali ele não entra: vai a lousa do conceito.
const BURACOS: [number, number][] = ([[350.9, 355.8], [576.8, 581.9], [776.6, 781.4], [912.3, 917.1], [925.6, 928.1], [885.0, 885.7]] as [number, number][]).map(([a, b]) => [s(a), s(b)]);

// B-ROLL novo (Mixkit + cenas reais de Friends), mudo. 15/11, Marcos: "não quero b-roll que roda em loop, é muito feio".
// AGENDA: cada entrada toca UMA vez, de `inicio` em diante, e nenhum pedaço de imagem se repete no vídeo inteiro (quando o mesmo clipe volta, continua de onde parou).
// [de, ate, clipe, inicio no clipe (s), velocidade]. Os limites têm folga: quem decide se o b-roll aparece é o mapa do ELE, a agenda só diz QUAL clipe.
const AGENDA: [number, number, string, number, number?][] = [
	[0, 5, "estudo", 0], [14.5, 20, "ligacao", 0], [25.5, 29.7, "tv", 0], [29.7, 43, "friends", 0], [44.4, 53, "friends2", 0], [56.6, 60.3, "friends2", 8.2], [60.3, 73, "sala2", 0],
	[97, 105, "entrevista", 0], [139.4, 145, "celular", 0], [183, 190.5, "cerebro", 0], [208, 220.5, "celular2", 0], [240.6, 257, "aviao2", 0],
	[284, 299.5, "foguete", 0, 0.8], [305.2, 315, "foguete2", 0], [325, 328.5, "lua", 0], [368, 376.6, "bike", 0], [381.4, 390, "dirigir", 0],
	[392.6, 404, "violao", 0], [412.7, 419.6, "violao", 11], [441.3, 454, "violao2", 0], [481.4, 490, "violao3", 0], [491.2, 496.2, "violao3", 8.2], [505.2, 517.5, "fone", 0],
	[582.3, 587.2, "friends2", 12, 0.9], [634.2, 639.8, "sala", 0], [720, 731, "violao4", 0], [761.2, 769, "tv", 4.6], [875.1, 881.4, "rindo", 0], [884.9, 891.6, "rindo", 5.8, 0.95],
	[927.5, 936, "discurso", 0], [940.4, 945, "discurso", 8.1], [1019.8, 1030, "ligacao", 5.1],
];
const brollEm = (frame: number) => AGENDA.find(([a, b]) => frame >= s(a) && frame < s(b));
// O clipe é deitado: inteiro no meio, com ele mesmo desfocado enchendo o fundo. Embaixo de um desenho ocupa só a caixa entre o desenho e a faixa.
const Broll: React.FC<{ item: [number, number, string, number, number?]; caixa?: number; base?: string }> = ({ item, caixa, base }) => {
	const [de, , nome, inicio, vel] = item; const src = base ? `${base}/${nome}.mp4` : staticFile(`fluency-remake/broll/${nome}.mp4`); const p = { muted: true, src, startFrom: s(inicio), playbackRate: vel || 1 };
	return (
		<Sequence from={s(de)} layout="none">
			<OffthreadVideo {...p} style={{ position: "absolute", left: "-12%", top: "-12%", width: "124%", height: "124%", objectFit: "cover", filter: "blur(38px) brightness(0.6)" }} />
			{caixa ? <OffthreadVideo {...p} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: caixa, objectFit: "cover" }} /> : <OffthreadVideo {...p} style={{ position: "absolute", left: 0, top: "50%", width: "100%", transform: "translateY(-50%)" }} />}
		</Sequence>
	);
};
// FAIXA: a frase-guia do ponto. Mesma posição em todas as telas (e cobre a legenda queimada do original, y ≈ 1450–1600).
const Faixa: React.FC<{ de: number; children: React.ReactNode }> = ({ de, children }) => {
	const f = useCurrentFrame(); const p = Math.min(1, Math.max(0, (f - de) / 6));
	return (
		<div style={{ position: "absolute", left: 40, right: 40, top: 1436, height: 290, borderRadius: 44, background: "#fff", boxShadow: "0 24px 60px rgba(11,13,18,0.30)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 44px", boxSizing: "border-box" }}>
			<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 74, lineHeight: 1.03, letterSpacing: -2.5, color: COR.ink, opacity: 0.35 + 0.65 * p }}>{children}</div>
		</div>
	);
};

// o que a tela mostra em cada quadro (uma coisa só): ele · lousa · b-roll (com ou sem desenho em cima)
export const telaEm = (frame: number) => {
	const naOferta = frame >= s(OFERTA_DE);
	const t = naOferta ? null : trechoEm(frame);
	const ele = !naOferta && (frame < ABRE_ATE || JANELAS.some(([a, b]) => frame >= a && frame < b)) && !BURACOS.some(([a, b]) => frame >= a && frame < b);
	const br = !ele && !naOferta ? brollEm(frame) : undefined;
	// lousa: tela cheia, sozinha. Sobra de menos de 1 s entre a lousa e ele (folga do mapa) não vira flash de b-roll: a lousa vizinha segura.
	const Slide = ele || naOferta ? undefined : t?.S || (br ? undefined : trechoEm(frame + 21)?.S || trechoEm(frame - 21)?.S);
	return { naOferta, t, ele, br, Slide, Desenho: Slide ? undefined : t?.D };
};
export const FluencyRemake: React.FC<Props> = ({ semVideo, semAudio, src, audio, broll }) => {
	const frame = useCurrentFrame();
	const { naOferta, t, ele, br, Slide, Desenho } = telaEm(frame);
	const baixo: React.CSSProperties = { position: "absolute", left: 0, top: Desenho ? ZONA : 0, width: 1080, height: Desenho ? 1920 - ZONA : 1920, overflow: "hidden" };
	return (
		<AbsoluteFill style={{ background: Desenho ? COR.gelo : "#0B0D12" }}>
			{Desenho ? <><Fundo /><div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: ZONA }}><Desenho /></div></> : null}
			{/* b-roll: tela inteira, ou só a parte de baixo quando há desenho */}
			{Slide ? <Slide /> : null}
			{br && !Slide && !semVideo ? <div style={{ ...baixo, background: "#0B0D12" }}><Broll key={br[0]} item={br} base={broll} caixa={Desenho ? 1436 - ZONA : undefined} /></div> : null}
			{/* ELE: um vídeo só (o quadro cheio do original), sempre montado até a oferta; só muda a moldura. Embaixo do desenho aparece cabeça + peito. */}
			{!semVideo && frame < s(OFERTA_DE) + 5 ? (
				<div style={{ ...baixo, visibility: ele ? "visible" : "hidden" }}>
					<OffthreadVideo muted src={src || staticFile("fluency-remake/ele-cheio.mp4")} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920 }} />
				</div>
			) : null}
			{t && !Slide ? <><div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 700, background: "linear-gradient(to bottom, rgba(11,13,18,0), rgba(11,13,18,0.5))" }} /><Faixa de={s(t.de)}>{t.ponto}</Faixa></> : null}
			{!semAudio ? <Audio src={audio || staticFile("fluency-remake/audio.m4a")} /> : null}
			{naOferta ? <Sequence from={s(OFERTA_DE)}><Oferta /></Sequence> : null}
		</AbsoluteFill>
	);
};
