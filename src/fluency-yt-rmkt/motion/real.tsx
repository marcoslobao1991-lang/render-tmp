// SHOW, DON'T TELL (13/11, cobrança do Marcos: "quando fala de séries, vc colocou cenas reais que temos?").
// Onde a fala é sobre série, a tela mostra a SÉRIE: cortes reais de Friends do banco de cenas (Supabase `scenes` / VPS).
// Substituem os desenhos de: cumprimentos (190), velocidade 1x/2x/1,5x (236), "com uma série" (814),
// a contagem do "you" (824, com falas reais do S01E01) e o cartão de séries (596.5).
// Vídeos remotos e mudos (ele está falando por cima). Os .mp4 não entram no git.
import React from "react";
import { OffthreadVideo, Sequence, useCurrentFrame } from "remotion";
import { COR, PALCO, DISPLAY, SANS, FPS, Rotulo, Frase, Apoio, Entra, ap, fr, fw, Pilula, Cartao } from "./base";

const P = PALCO.pad;
const SUPA = "https://petrtewismhpzidcmmwb.supabase.co/storage/v1/object/public/media/friends/";
const VPS = "https://media.srv1198551.hstgr.cloud/friends/";
type Clipe = { src: string; dur: number; en: string };
// cumprimentos reais (duração = fim − início no nome do arquivo)
const OI: Clipe[] = [
	{ src: SUPA + "friends-s01e07/Friends_S01_E07_0.05.05.972-0.05.07.014.mp4", dur: 1.042, en: "What’s up, man?" },
	{ src: SUPA + "friends-s01e13/Friends_S01_E13_0.21.27.244-0.21.28.536.mp4", dur: 1.292, en: "How’s it going?" },
	{ src: SUPA + "friends-s01e14/Friends_S01_E14_0.08.44.982-0.08.46.274.mp4", dur: 1.292, en: "How you doing?" },
];
const ACHA: Clipe[] = [{ src: SUPA + "friends-s01e06/Friends_S01_E06_0.12.15.196-0.12.17.277.mp4", dur: 2.081, en: "What do you think?" }];
// uma cena contínua (Chandler e Joey), a mesma usada na lead da Fluency
const CENA: Clipe[] = [
	{ src: VPS + "friends-1.mp4", dur: 2.294, en: "" }, { src: VPS + "friends-2.mp4", dur: 1.627, en: "" }, { src: VPS + "friends-3.mp4", dur: 2.044, en: "" },
];

// toca a lista em loop de `de` até `ate` na velocidade `rate`; devolve as Sequences e sabe qual clipe está na tela em f
const montar = (clipes: Clipe[], de: number, ate: number, rate = 1, repete = 1) => {
	const itens: { from: number; dur: number; c: Clipe }[] = [];
	let t = de;
	for (let guard = 0; t < ate && guard < 400; guard++) {
		for (const c of clipes) for (let r = 0; r < repete; r++) { const d = Math.max(2, Math.round((c.dur / rate) * FPS)); if (t >= ate) break; itens.push({ from: t, dur: Math.min(d, ate - t), c }); t += d; }
	}
	return itens;
};
const Tela: React.FC<{ y: number; h: number; itens: { from: number; dur: number; c: Clipe }[]; rate?: number; selo?: React.ReactNode; em: number }> = ({ y, h, itens, rate = 1, selo, em }) => {
	const f = useCurrentFrame();
	return (
		<Entra em={em} style={{ position: "absolute", left: 60, top: y, width: 960, height: h, borderRadius: 34, background: "#0F172A", padding: 14, boxSizing: "border-box", boxShadow: "0 30px 70px rgba(11,13,18,0.28)" }}>
			<div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 22, overflow: "hidden", background: "#0B1220" }}>
				{itens.filter((i) => f >= i.from - 30 && f < i.from + i.dur + 2).map((i) => (
					<Sequence key={i.from} from={i.from} durationInFrames={i.dur} layout="none">
						<OffthreadVideo muted playbackRate={rate} src={i.c.src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
					</Sequence>
				))}
				{selo ? <div style={{ position: "absolute", right: 22, top: 22 }}>{selo}</div> : null}
			</div>
		</Entra>
	);
};
const atual = (itens: { from: number; dur: number; c: Clipe }[], f: number) => itens.find((i) => f >= i.from && f < i.from + i.dur)?.c;
const Selo: React.FC<{ children: React.ReactNode; cor?: string }> = ({ children, cor = COR.azul }) => <div style={{ padding: "10px 26px", borderRadius: 18, background: cor, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, letterSpacing: -2 }}>{children}</div>;

// 190-213 · os cumprimentos: cortes reais de Friends, um atrás do outro; depois "What do you think?" e a palavrinha que muda
export const C190R: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(191), tM = fw(199, "muda") - 10, fim = fr(216);
	const a = montar(OI, t0, tM, 1, 2), b = montar(ACHA, tM, fim, 1, 1); const itens = [...a, ...b];
	const c = atual(itens, f); const trocas = ["it", "that", "this trip"]; const k = Math.max(0, Math.floor((f - tM) / 26)) % trocas.length;
	return (
		<>
			<Rotulo>É sempre a mesma expressão</Rotulo>
			<Tela y={180} h={540} itens={itens} em={t0} />
			{f < tM ? (c ? <div key={c.en} style={{ position: "absolute", left: P, right: P, top: 770 }}><Frase size={112}>{c.en}</Frase></div> : null) : (
				<>
					<Entra em={tM} style={{ position: "absolute", left: P, right: P, top: 760 }}>
						<div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 78, lineHeight: 1.14, letterSpacing: -2.4, color: COR.ink }}>What do you think about <span key={k} style={{ display: "inline-block", padding: "0 22px", borderRadius: 18, background: COR.azul, color: "#fff" }}>{trocas[k]}</span>?</div>
					</Entra>
					<Entra em={tM + 6} style={{ position: "absolute", left: P, right: P, top: 990 }}><Apoio size={50} c={COR.ink}>O que muda é <b style={{ color: COR.azul }}>uma palavrinha</b> ou outra</Apoio></Entra>
				</>
			)}
		</>
	);
};

// 190-213 (v2) · a cena real ocupa a largura toda; a fala vira legenda grande num cartão; a palavrinha que muda troca numa "vaga" azul
export const C190N: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(191), tM = fw(199, "muda") - 10, fim = fr(216);
	const itens = [...montar(OI, t0, tM, 1, 2), ...montar(ACHA, tM, fim, 1, 1)];
	const c = atual(itens, f); const trocas = ["it", "that", "this trip"]; const k = Math.max(0, Math.floor((f - tM) / 26)) % trocas.length;
	return (
		<>
			<Pilula>É sempre a mesma expressão</Pilula>
			<Cartao y={160} h={566} x={24} w={1032} em={t0} style={{ background: "#0B1220" }}>
				{itens.filter((i) => f >= i.from - 30 && f < i.from + i.dur + 2).map((i) => (
					<Sequence key={i.from} from={i.from} durationInFrames={i.dur} layout="none">
						<OffthreadVideo muted src={i.c.src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
					</Sequence>
				))}
			</Cartao>
			{f < tM ? (c ? (
				<Cartao key={c.en} y={762} h={250} style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 40px", boxSizing: "border-box" }}><Frase size={100}>{c.en}</Frase></Cartao>
			) : null) : (
				<>
					<Cartao y={762} h={250} em={tM} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
						<Frase size={72}>What do you think about</Frase>
						<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
							<div key={k} style={{ padding: "6px 34px 12px", borderRadius: 22, background: COR.azul, color: "#fff", fontFamily: DISPLAY, fontWeight: 800, fontSize: 84, letterSpacing: -2.6, lineHeight: 1 }}>{trocas[k]}</div>
							<Frase size={84}>?</Frase>
						</div>
					</Cartao>
					<Entra em={tM + 6} style={{ position: "absolute", left: 48, right: 48, top: 1040, textAlign: "center" }}><Apoio size={48} c={COR.ink}>Só muda <b style={{ color: COR.azul }}>uma palavrinha</b></Apoio></Entra>
				</>
			)}
		</>
	);
};

// 236-252 · a primeira meta e a velocidade: a MESMA cena tocando em 1x, depois 2x, depois 1,5x
export const C236R: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(240) - 20, t2 = fw(249, "2x") - 4, t15 = fr(251), fim = fr(253);
	const fases: [number, number, number, string][] = [[t0, t2, 1, "1x"], [t2, t15, 2, "2x"], [t15, fim, 1.5, "1,5x"]];
	const fase = fases.find(([a, b]) => f >= a && f < b) ?? fases[0];
	return (
		<>
			<Rotulo>A primeira grande meta</Rotulo>
			<div style={{ position: "absolute", left: P, right: P, top: 160 }}><Entra em={t0}><Frase size={88}>Entender o seu <span style={{ color: COR.azul }}>primeiro episódio</span></Frase></Entra></div>
			{fases.map(([a, b, r]) => (f >= a - 30 && f < b + 2 ? <Tela key={a} y={380} h={540} itens={montar(CENA, a, b, r)} rate={r} em={t0} selo={<Selo>{fase[3]}</Selo>} /> : null))}
			<Entra em={fr(252)} style={{ position: "absolute", left: P, right: P, top: 950 }}><Apoio size={50} c={COR.ink}>Força o ouvido no que você <b style={{ color: COR.azul }}>já entendeu</b></Apoio></Entra>
		</>
	);
};

// (v2) tela LARGA: a cena real ocupa a largura toda do palco, sem moldura
const TelaL: React.FC<{ y: number; h: number; itens: { from: number; dur: number; c: Clipe }[]; rate?: number; selo?: React.ReactNode; em: number }> = ({ y, h, itens, rate = 1, selo, em }) => {
	const f = useCurrentFrame();
	return (
		<Cartao y={y} h={h} x={24} w={1032} em={em} style={{ background: "#0B1220" }}>
			{itens.filter((i) => f >= i.from - 30 && f < i.from + i.dur + 2).map((i) => (
				<Sequence key={i.from} from={i.from} durationInFrames={i.dur} layout="none">
					<OffthreadVideo muted playbackRate={rate} src={i.c.src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
				</Sequence>
			))}
			{selo ? <div style={{ position: "absolute", right: 26, top: 26 }}>{selo}</div> : null}
		</Cartao>
	);
};
const Meio: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => <div style={{ position: "absolute", left: 40, right: 40, top, textAlign: "center" }}>{children}</div>;

// 236-252 (v2) · a primeira meta e a velocidade: a MESMA cena tocando em 1x, depois 2x, depois 1,5x
export const C236N: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(240) - 20, t2 = fw(249, "2x") - 4, t15 = fr(251), fim = fr(253);
	const fases: [number, number, number, string][] = [[t0, t2, 1, "1x"], [t2, t15, 2, "2x"], [t15, fim, 1.5, "1,5x"]];
	const fase = fases.find(([a, b]) => f >= a && f < b) ?? fases[0];
	return (
		<>
			<Pilula>A primeira grande meta</Pilula>
			<Meio top={165}><Entra em={t0}><Frase size={88}>Entender o seu <span style={{ color: COR.azul }}>primeiro episódio</span></Frase></Entra></Meio>
			{fases.map(([a, b, r]) => (f >= a - 30 && f < b + 2 ? <TelaL key={a} y={372} h={566} itens={montar(CENA, a, b, r)} rate={r} em={t0} selo={<Selo>{fase[3]}</Selo>} /> : null))}
			<Entra em={fr(252)} style={{ position: "absolute", left: 48, right: 48, top: 972, textAlign: "center" }}><Apoio size={48} c={COR.ink}>Força o ouvido no que você <b style={{ color: COR.azul }}>já entendeu</b></Apoio></Entra>
		</>
	);
};

// 814-823 · "aí você faz a mesma coisa com uma série": a série na tela
export const C814R: React.FC = () => {
	const t0 = fr(816) + 10;
	return (
		<>
			<Rotulo>Depois</Rotulo>
			<div style={{ position: "absolute", left: P, right: P, top: 160 }}><Frase size={96}>A mesma coisa, <span style={{ color: COR.azul }}>com uma série</span></Frase></div>
			<Tela y={390} h={540} itens={montar(CENA, t0, fr(913), 1)} em={t0} />
			<Entra em={fr(818)} style={{ position: "absolute", left: P, right: P, top: 960 }}><Apoio size={54} c={COR.ink}>1 episódio. 20 minutos.</Apoio></Entra>
		</>
	);
};

// 824-851 · A PROVA: falas REAIS do S01E01 de Friends passando, cada "you" marcado, e o contador
const FALAS = ["Are you okay, sweetie?", "Let me get you some coffee.", "...you might be here and you are, you are!", "Can I get you some coffee?", "You can see where he'd have trouble.", "This is probably for the best, you know?", "He finally asked you out?", "So, Rachel, what are you up to tonight?", "Ross, let me ask you a question.", "What did you get? You guys.", "Oh, my God. You got screwed.", "How did you get through it?", "You actually broke her watch?", "What are you talking about?"];
const marca = (s: string) => s.split(/(\byou\b)/i).map((p, i) => (/^you$/i.test(p) ? <span key={i} style={{ background: COR.azul, color: "#fff", borderRadius: 10, padding: "0 10px" }}>{p}</span> : <span key={i}>{p}</span>));
export const C824R: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(829), tP = fr(837), tY = fr(840), tM = fr(844);
	const rola = Math.max(0, f - t0) * 1.5; const LH = 74; const total = FALAS.length * LH;
	const n = Math.round(ap(f, tY, 40) * 200);
	return (
		<>
			<Rotulo>Eu precisava provar</Rotulo>
			<Entra em={t0} style={{ position: "absolute", left: 60, top: 180, width: 960, height: 400, borderRadius: 30, background: "#fff", border: `5px solid ${COR.ink}`, overflow: "hidden" }}>
				<div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 62, background: COR.ink, color: "#fff", fontFamily: SANS, fontWeight: 700, fontSize: 30, letterSpacing: 2.4, display: "flex", alignItems: "center", paddingLeft: 30 }}>FRIENDS · TEMPORADA 1 · EPISÓDIO 1 · SCRIPT</div>
				<div style={{ position: "absolute", left: 30, right: 30, top: 62, bottom: 0, overflow: "hidden" }}>
					{[0, 1].map((v) => FALAS.map((s, i) => <div key={v + "-" + i} style={{ position: "absolute", left: 0, top: 18 + ((i + v * FALAS.length) * LH - (rola % total)), height: LH, fontFamily: SANS, fontWeight: 600, fontSize: 40, color: COR.ink, whiteSpace: "nowrap" }}>{marca(s)}</div>))}
				</div>
			</Entra>
			<Entra em={tP} style={{ position: "absolute", left: 60, top: 610, width: 470, height: 250, borderRadius: 30, background: "#fff", border: `5px solid ${COR.linha}` }}>
				<div style={{ position: "absolute", left: 28, top: 14, fontFamily: DISPLAY, fontWeight: 800, fontSize: 84, letterSpacing: -3, color: COR.ink, whiteSpace: "nowrap" }}>{f >= fr(838) ? "700 a 900" : "700"}</div>
				<div style={{ position: "absolute", left: 30, right: 20, bottom: 24, fontFamily: SANS, fontWeight: 700, fontSize: 36, lineHeight: 1.1, color: COR.ink2 }}>palavras por episódio</div>
			</Entra>
			<Entra em={tY} style={{ position: "absolute", left: 550, top: 610, width: 470, height: 250, borderRadius: 30, background: COR.azul, boxShadow: "0 24px 70px rgba(47,91,255,0.3)" }}>
				<div style={{ position: "absolute", left: 28, top: 6, fontFamily: DISPLAY, fontWeight: 800, fontSize: 110, letterSpacing: -4, color: "#fff" }}>{n}×</div>
				<div style={{ position: "absolute", left: 30, right: 20, bottom: 24, fontFamily: SANS, fontWeight: 700, fontSize: 36, lineHeight: 1.1, color: "#fff" }}>{f >= tM ? "you: 10 vezes por minuto" : "só a palavra you"}</div>
			</Entra>
			{f >= fr(848) ? <Entra em={fr(848)} style={{ position: "absolute", left: P, right: P, top: 900 }}><Apoio size={48} c={COR.ink}>E a pessoa ouve “what’s going on with you?” e: “hã?”</Apoio></Entra> : null}
		</>
	);
};

// 596.5-604 · o material do treino: a série aparece de verdade; discurso segue em cartão (ainda sem arquivo real no projeto)
export const C597R: React.FC = () => {
	const t0 = fr(596.5), tD = fr(601), fim = fr(607);
	return (
		<>
			<Rotulo>O material do treino</Rotulo>
			<Tela y={180} h={470} itens={montar(CENA, t0, fim, 1)} em={t0} selo={<Selo>Séries</Selo>} />
			<Entra em={t0 + 8} style={{ position: "absolute", left: P, right: P, top: 680 }}><Apoio size={52} c={COR.ink}>Inglês falado <b style={{ color: COR.azul }}>para americanos</b>, não para alunos</Apoio></Entra>
			<Entra em={tD} style={{ position: "absolute", left: 60, right: 60, top: 850, padding: "26px 36px", borderRadius: 30, background: "#fff", border: `5px solid ${COR.verde}` }}>
				<span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 60, letterSpacing: -1.8, color: COR.verde }}>Discursos </span>
				<span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 44, color: COR.ink }}>inglês mais polido: é por onde eu começo</span>
			</Entra>
		</>
	);
};

// ───────── v2 das cenas reais (13/11): tela larga, cartão único, centralizado ─────────
// 814-823 · "aí você faz a mesma coisa com uma série": a série na tela
export const C814N: React.FC = () => {
	const t0 = fr(816) + 10;
	return (
		<>
			<Pilula>Depois</Pilula>
			<Meio top={165}><Frase size={88}>A mesma coisa,<br /><span style={{ color: COR.azul }}>com uma série</span></Frase></Meio>
			<TelaL y={372} h={566} itens={montar(CENA, t0, fr(913), 1)} em={t0} />
			<Entra em={fr(818)} style={{ position: "absolute", left: 48, right: 48, top: 968, textAlign: "center" }}><Apoio size={54} c={COR.ink}>1 episódio. 20 minutos.</Apoio></Entra>
		</>
	);
};

// 824-851 · A PROVA: falas REAIS do S01E01 de Friends passando, cada "you" marcado, e o contador
export const C824N: React.FC = () => {
	const f = useCurrentFrame(); const t0 = fr(829), tP = fr(837), tY = fr(840), tM = fr(844);
	const rola = Math.max(0, f - t0) * 1.5; const LH = 78; const total = FALAS.length * LH;
	const n = Math.round(ap(f, tY, 40) * 200);
	const leg: React.CSSProperties = { position: "absolute", left: 36, right: 20, bottom: 30, fontFamily: SANS, fontWeight: 700, fontSize: 38, lineHeight: 1.1 };
	return (
		<>
			<Pilula>Eu precisava provar</Pilula>
			<Cartao y={160} h={420} em={t0}>
				<div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 70, background: COR.ink, color: "#fff", fontFamily: SANS, fontWeight: 700, fontSize: 30, letterSpacing: 2.2, display: "flex", alignItems: "center", paddingLeft: 36 }}>FRIENDS · TEMPORADA 1 · EPISÓDIO 1 · SCRIPT</div>
				<div style={{ position: "absolute", left: 36, right: 30, top: 70, bottom: 0, overflow: "hidden" }}>
					{[0, 1].map((v) => FALAS.map((s, i) => <div key={v + "-" + i} style={{ position: "absolute", left: 0, top: 22 + ((i + v * FALAS.length) * LH - (rola % total)), height: LH, fontFamily: SANS, fontWeight: 600, fontSize: 42, color: COR.ink, whiteSpace: "nowrap" }}>{marca(s)}</div>))}
				</div>
			</Cartao>
			<Cartao x={48} w={476} y={612} h={270} em={tP}>
				<div style={{ position: "absolute", left: 34, top: 22, fontFamily: DISPLAY, fontWeight: 800, fontSize: 92, letterSpacing: -3.2, color: COR.ink, whiteSpace: "nowrap" }}>{f >= fr(838) ? "700 a 900" : "700"}</div>
				<div style={{ ...leg, color: COR.ink2 }}>palavras por episódio</div>
			</Cartao>
			<Cartao x={556} w={476} y={612} h={270} em={tY} style={{ background: COR.azul, boxShadow: "0 26px 70px rgba(47,91,255,0.35)" }}>
				<div style={{ position: "absolute", left: 34, top: 8, fontFamily: DISPLAY, fontWeight: 800, fontSize: 124, letterSpacing: -4, color: "#fff" }}>{n}×</div>
				<div style={{ ...leg, color: "#fff" }}>{f >= tM ? "you: 10 vezes por minuto" : "só a palavra you"}</div>
			</Cartao>
			{f >= fr(848) ? <Entra em={fr(848)} style={{ position: "absolute", left: 60, right: 60, top: 925, textAlign: "center" }}><Apoio size={48} c={COR.ink}>E a pessoa ouve “what’s going on with you?” e: “hã?”</Apoio></Entra> : null}
		</>
	);
};

// 596.5-604 · o material do treino: a série aparece de verdade; discurso segue em cartão (ainda sem arquivo real no projeto)
export const C597N: React.FC = () => {
	const t0 = fr(596.5), tD = fr(601), fim = fr(607);
	return (
		<>
			<Pilula>O material do treino</Pilula>
			<TelaL y={160} h={500} itens={montar(CENA, t0, fim, 1)} em={t0} selo={<Selo>Séries</Selo>} />
			<Entra em={t0 + 8} style={{ position: "absolute", left: 60, right: 60, top: 695, textAlign: "center" }}><Apoio size={50} c={COR.ink}>Inglês falado <b style={{ color: COR.azul }}>para americanos</b>, não para alunos</Apoio></Entra>
			<Cartao y={835} h={220} em={tD} style={{ boxShadow: `0 0 0 7px ${COR.verde}, 0 26px 70px rgba(14,159,79,0.22)` }}>
				<div style={{ position: "absolute", left: 16, top: 16, width: 334, height: 188, borderRadius: 30, overflow: "hidden", background: "#0B1220" }}>
					<Sequence from={tD} layout="none"><OffthreadVideo muted src="https://petrtewismhpzidcmmwb.supabase.co/storage/v1/object/public/media/discursos/denzel/denzel_01_fall_forward.mp4" startFrom={240} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /></Sequence>
				</div>
				<div style={{ position: "absolute", left: 380, right: 24, top: 30, fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, letterSpacing: -2, color: COR.verde }}>Discursos</div>
				<div style={{ position: "absolute", left: 382, right: 24, top: 112, fontFamily: SANS, fontWeight: 700, fontSize: 38, lineHeight: 1.12, color: COR.ink }}>inglês mais polido: é por onde eu começo</div>
			</Cartao>
		</>
	);
};
