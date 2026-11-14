// VSL de remarketing a partir do vídeo do YouTube "isso é sem graça mas me deixou fluente" (LeSeXm9XeZk).
// LAYOUT (13/11, pedido do Marcos): fundo BRANCO; a edição ocupa o PALCO em cima (1080×1130) e ele fica num cartão embaixo
// (960×684, menos da metade da tela). Onde ainda não existe cena, o palco mostra o docs original como referência.
// modo "roteiro" = aula cortada (trechos.ts, cravados no envelope) + oferta da VSL no ar · modo "tudo" = vídeo original inteiro.
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig, CalculateMetadataFunction } from "remotion";
import { FRASES, CAPS, Frase } from "./dados";
import { TRECHOS } from "./trechos";
import { COR, PALCO, SANS, Fundo, fr, Cena, VEL, durTrecho, FRIA, Pilula, Cartao, Frase as FraseG } from "./motion/base";
import { LOTE1 } from "./motion/lote1";
import { LOTE2 } from "./motion/lote2";
import { LOTE3 } from "./motion/lote3";
import { LOTE4 } from "./motion/lote4";
import { LOTE5 } from "./motion/lote5";
import { LOTE7 } from "./motion/lote7";
import { Oferta } from "./motion/oferta";

// semVideo (13/11, Marcos: "tira o vídeo meu por enquanto pra eu conseguir dar play"): sem decodificar vídeo; toca só o áudio já cortado
// (public/fluency-yt-rmkt-aula.m4a, gerado por audio-aula.mjs: RODAR DE NOVO sempre que os cortes ou a velocidade mudarem).
export type Props = { modo: "roteiro" | "tudo"; faixa: boolean; semVideo?: boolean; semAudio?: boolean; src?: string; audioAula?: string; audioOferta?: string };
export const FLUENCY_YT_RMKT_DEFAULTS: Props = { modo: "roteiro", faixa: true, semVideo: true, semAudio: false };
const FPS = 30, FIM = 3073.4;
const OFERTA_S = 532.06; // public/fluency-yt-rmkt-oferta.mp4 = VSL no ar a partir de 17:34,28 ("E não só isso, mas hoje a Fluency Route conta...")
const CARTAO = { x: 60, y: 1176, w: 960, h: 684, r: 40 };

type Trecho = { de: number; ate: number };
export const trechosDe = (modo: Props["modo"]): Trecho[] => (modo === "tudo" ? [{ de: 0, ate: FIM }] : TRECHOS);
const aulaFrames = (modo: Props["modo"]) => trechosDe(modo).reduce((s, t) => s + durTrecho(t), 0);
export const calcFluencyYtRmktDuration = (modo: Props["modo"]) => aulaFrames(modo) + (modo === "roteiro" ? Math.round(OFERTA_S * FPS) : 0);
export const calculateFluencyYtRmkt: CalculateMetadataFunction<Props> = ({ props }) => ({ durationInFrames: calcFluencyYtRmktDuration(props.modo) });

// cenas registradas: cada uma vale do começo da frase `de` até o começo da próxima cena
// ABERTURA FRIA: o gancho ("aprenda inglês rápido e difícil") toca antes da lead; um quadro só, parado
const ABERTURA: Cena = { de: -1, C: () => (
	<>
		<Pilula>Um novo conceito</Pilula>
		<div style={{ position: "absolute", left: 40, right: 40, top: 235, textAlign: "center" }}>
			<FraseG size={124} c={COR.ink2} style={{ whiteSpace: "nowrap" }}>Aprenda inglês</FraseG>
		</div>
		<Cartao y={420} h={300} style={{ background: COR.azul, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 26px 70px rgba(47,91,255,0.35)" }}><FraseG size={230} c="#fff">rápido</FraseG></Cartao>
		<div style={{ position: "absolute", left: 40, right: 40, top: 770, textAlign: "center" }}><FraseG size={230}>e difícil</FraseG></div>
	</>
) };
const CENAS: Cena[] = [...LOTE1, ...LOTE2, ...LOTE3, ...LOTE4, ...LOTE5, ...LOTE7];
const FIM_CENAS = 99999; // as cenas cobrem a aula inteira
export const cenaEm = (frame: number): Cena | null => {
	if (FIM_CENAS < 9999 && frame >= fr(FIM_CENAS)) return null;
	if (frame < FRIA) return ABERTURA;
	let c: Cena | null = null, melhor = -1;
	for (const x of CENAS) { const q = fr(x.de); if (frame >= q && q >= melhor) { melhor = q; c = x; } }
	return c;
};

const mm = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const Tarja: React.FC<{ tOrig: number }> = ({ tOrig }) => {
	let f: Frase | undefined;
	for (const x of FRASES) { if (x.s === "F" && x.a - 0.3 <= tOrig && tOrig <= x.b + 0.6) { f = x; break; } }
	if (!f) return null;
	let cap = CAPS[0];
	for (const c of CAPS) if (c[0] <= f.n) cap = c;
	return (
		<div style={{ position: "absolute", left: CARTAO.x, right: CARTAO.x, top: 1134, height: 38, display: "flex", alignItems: "center", gap: 18, fontFamily: SANS, fontSize: 28, color: COR.ink2, whiteSpace: "nowrap", overflow: "hidden" }}>
			<b style={{ color: COR.ink }}>frase {f.n}</b><span>{mm(tOrig)} do original</span><span>{cap[1]}</span>
		</div>
	);
};

export const FluencyYtRmkt: React.FC<Props> = ({ modo, faixa, semVideo, semAudio, src, audioAula, audioOferta }) => {
	const VIDEO = src || staticFile("fluency-yt-rmkt-proxy.mp4");
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const trechos = trechosDe(modo);
	const cena = modo === "roteiro" ? cenaEm(frame) : null;
	let ac = 0, tOrig = -1;
	// ZOOM NA EMENDA (13/11, Marcos): binário 1,00 ↔ 1,07, troca SÓ onde houve corte de verdade (trechos contíguos não trocam),
	// seco, só no cartão dele. Origem no rosto (62% × 30% do cartão).
	let perto = false;
	const seqs = trechos.map((t, i) => {
		if (i > 0 && Math.abs(t.de - trechos[i - 1].ate) > 0.05) perto = !perto;
		const zoom = perto ? 1.07 : 1;
		const dur = durTrecho(t), from = ac;
		if (frame >= from && frame < from + dur) tOrig = t.de + ((frame - from) / fps) * VEL;
		ac += dur;
		// só monta o trecho atual e os vizinhos (centenas de vídeos montados juntos travam o Studio)
		if (semVideo || frame < from - 45 || frame > from + dur + 45) return null;
		const ini = Math.round(t.de * fps);
		return (
			<Sequence key={i} from={from} durationInFrames={dur} premountFor={30}>
				{/* palco: docs original (referência) só onde ainda não há cena; sem som */}
				{!cena ? (
					<div style={{ position: "absolute", left: 0, top: 0, width: PALCO.w, height: PALCO.h, overflow: "hidden" }}>
						<OffthreadVideo muted playbackRate={VEL} src={VIDEO} startFrom={ini} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920 }} />
						<div style={{ position: "absolute", left: 0, right: 0, top: 960, bottom: 0, background: COR.gelo }} />
					</div>
				) : null}
				{/* cartão do apresentador: recorte da webcam (metade de baixo do proxy), linhas 151–919 */}
				<div style={{ position: "absolute", left: CARTAO.x, top: CARTAO.y, width: CARTAO.w, height: CARTAO.h, borderRadius: CARTAO.r, overflow: "hidden", boxShadow: "0 24px 60px rgba(11,13,18,0.18)" }}>
					<OffthreadVideo playbackRate={VEL} src={VIDEO} startFrom={ini} style={{ position: "absolute", left: 0, top: -987, width: 960, height: 1707, transform: `scale(${zoom})`, transformOrigin: `${0.62 * 960}px ${987 + 0.3 * 684}px` }} />
				</div>
			</Sequence>
		);
	});
	const naOferta = modo === "roteiro" && frame >= ac;
	return (
		<AbsoluteFill style={{ background: COR.gelo }}>
			<Fundo />
			{cena ? <div style={{ position: "absolute", left: 0, top: 0, width: PALCO.w, height: PALCO.h, overflow: "hidden" }}><cena.C /></div> : null}
			{seqs}
			{semVideo && frame < ac + 12 ? <div style={{ position: "absolute", left: CARTAO.x, top: CARTAO.y, width: CARTAO.w, height: CARTAO.h, borderRadius: CARTAO.r, background: "#C9CED8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 700, fontSize: 40, color: "#667085" }}>seu vídeo entra aqui</div> : null}
			{semVideo && !semAudio && modo === "roteiro" ? <Sequence durationInFrames={ac}><Audio src={audioAula || staticFile("fluency-yt-rmkt-aula.m4a")} playbackRate={VEL} /></Sequence> : null}
			{/* OFERTA: só o ÁUDIO da VSL validada; a imagem é toda nova (motion/oferta.tsx) */}
			{!semAudio && modo === "roteiro" ? <Sequence from={ac}><Audio src={audioOferta || staticFile("fluency-yt-rmkt-oferta.m4a")} /></Sequence> : null}
			{modo === "roteiro" && naOferta ? <Sequence from={ac}><Oferta /></Sequence> : null}
			{faixa && tOrig >= 0 ? <Tarja tOrig={tOrig} /> : null}
		</AbsoluteFill>
	);
};
