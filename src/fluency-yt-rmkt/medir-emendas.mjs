// MEDE as emendas no áudio (não no Whisper): silêncio real em cada emenda, palavra mordida na borda, e a pausa NATURAL dele como régua.
// uso: node medir-emendas.mjs
import fs from "node:fs";
const T = JSON.parse(fs.readFileSync("trechos.json", "utf8"));
const VEL = Number(fs.readFileSync("motion/base.tsx", "utf8").match(/export const VEL = ([\d.]+)/)[1]);
const buf = fs.readFileSync("bruto/audio-16k.wav"); const at = buf.indexOf(Buffer.from("data")) + 8;
const pcm = new Int16Array(buf.buffer, buf.byteOffset + at, Math.floor((buf.length - at) / 2));
const HOP = 160, N = Math.floor(pcm.length / HOP); const db = new Float32Array(N);
for (let i = 0; i < N; i++) { let s = 0; for (let j = 0; j < HOP; j++) { const v = pcm[i * HOP + j] / 32768; s += v * v; } db[i] = 10 * Math.log10(s / HOP + 1e-10); }
const so = Float32Array.from(db).sort(); const THR = Math.max(so[Math.floor(N * 0.1)] + 9, so[Math.floor(N * 0.9)] - 30);
const voz = (i) => db[Math.max(0, Math.min(N - 1, i))] >= THR;
const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor((s.length - 1) * p)]; };
// 1) régua: pausas naturais DENTRO dos trechos (silêncio entre falas que eu não cortei), de 0,12 a 1,2 s
const nat = [];
for (const t of T) { let i = Math.round(t.de * 100) + 5; const fim = Math.round(t.ate * 100) - 5; while (i < fim) { if (!voz(i)) { let j = i; while (j < fim && !voz(j)) j++; const d = (j - i) / 100; if (j < fim && d >= 0.12 && d <= 1.2) nat.push(d); i = j; } else i++; } }
// 2) cada emenda: rabo de silêncio do trecho A + cabeça de silêncio do trecho B
const em = [];
for (let k = 0; k + 1 < T.length; k++) {
	const A = T[k], B = T[k + 1]; if (Math.abs(B.de - A.ate) < 0.05) continue;
	let r = 0; for (let i = Math.round(A.ate * 100) - 1; i > Math.round(A.de * 100) && !voz(i); i--) r++;
	let c = 0; for (let i = Math.round(B.de * 100); i < Math.round(B.ate * 100) && !voz(i); i++) c++;
	em.push({ k, n: B.n, t: B.de, rabo: r / 100, cab: c / 100, gap: (r + c) / 100 });
}
const g = em.map((e) => e.gap);
console.log(`limiar de silêncio: ${THR.toFixed(1)} dB · velocidade ${VEL}`);
console.log(`RÉGUA (pausa natural dele, ${nat.length} pausas): mediana ${q(nat, 0.5).toFixed(2)} s · p25 ${q(nat, 0.25).toFixed(2)} · p75 ${q(nat, 0.75).toFixed(2)}`);
console.log(`EMENDAS (${em.length}): mediana ${q(g, 0.5).toFixed(2)} s · p10 ${q(g, 0.1).toFixed(2)} · p90 ${q(g, 0.9).toFixed(2)}  (em 1×; no vídeo divide por ${VEL})`);
const curta = em.filter((e) => e.gap < 0.3), longa = em.filter((e) => e.gap > 0.7), mordA = em.filter((e) => e.rabo === 0), mordB = em.filter((e) => e.cab === 0);
console.log(`curtas (< 0,30 s): ${curta.length} · longas (> 0,70 s): ${longa.length} · fim de A em cima de voz: ${mordA.length} · começo de B em cima de voz: ${mordB.length}`);
const mm = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
const lista = (tit, arr) => { if (arr.length) console.log(tit + ": " + arr.slice(0, 40).map((e) => `f${e.n}@${mm(e.t)}(${e.rabo.toFixed(2)}+${e.cab.toFixed(2)})`).join(" ")); };
lista("FIM EM VOZ", mordA); lista("COMEÇO EM VOZ", mordB); lista("CURTAS", curta.filter((e) => e.rabo > 0 && e.cab > 0)); lista("LONGAS", longa);
fs.writeFileSync("emendas-medidas.json", JSON.stringify(em));
