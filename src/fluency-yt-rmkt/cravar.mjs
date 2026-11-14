// CRAVAR os cortes do roteiro no ÁUDIO (envelope RMS de 10 ms do wav 16 k), não no tempo do Whisper.
// 1) frases que ficam e são vizinhas viram uma região; 2) cada borda de região vai pro silêncio medido mais próximo;
// 3) pausa longa DENTRO da região (ele digitando) encolhe pra ~0,4 s. Borda sem silêncio por perto = ALERTA (conferir à mão).
import fs from "node:fs";
const R = JSON.parse(fs.readFileSync("roteiro.json", "utf8"));
const buf = fs.readFileSync("bruto/audio-16k.wav");
const dataAt = buf.indexOf(Buffer.from("data")) + 8;
const pcm = new Int16Array(buf.buffer, buf.byteOffset + dataAt, Math.floor((buf.length - dataAt) / 2));
const SR = 16000, HOP = 160; // 10 ms
const N = Math.floor(pcm.length / HOP);
const db = new Float32Array(N);
for (let i = 0; i < N; i++) { let s = 0; for (let j = 0; j < HOP; j++) { const v = pcm[i * HOP + j] / 32768; s += v * v; } db[i] = 10 * Math.log10(s / HOP + 1e-10); }
const sorted = Float32Array.from(db).sort();
const piso = sorted[Math.floor(N * 0.1)], voz = sorted[Math.floor(N * 0.9)];
const THR = Math.max(piso + 9, voz - 30);
// silêncios (>= 80 ms abaixo do limiar)
const SIL = [];
for (let i = 0; i < N; ) { if (db[i] < THR) { let j = i; while (j < N && db[j] < THR) j++; if (j - i >= 8) SIL.push([i / 100, j / 100]); i = j; } else i++; }
const perto = (t, antes, depois) => { let best = null, bd = 1e9; for (const s of SIL) { if (s[1] < t - antes) continue; if (s[0] > t + depois) break; const d = t < s[0] ? s[0] - t : t > s[1] ? t - s[1] : 0; if (d < bd) { bd = d; best = s; } } return best; };

// regiões: frases que ficam e são vizinhas na ordem do roteiro
const reg = [];
let cur = null;
for (const o of R) { if (o.s === "F") { if (cur && (o.q || cur.q)) { reg.push(cur); cur = null; } if (cur) { cur.b = o.b; cur.n2 = o.n; } else cur = { a: o.a, b: o.b, n1: o.n, n2: o.n, q: o.q, z: o.z ? 1 : 0 }; } else if (cur) { reg.push(cur); cur = null; } }
if (cur) reg.push(cur);

const alertas = [], trechos = [];
for (const r of reg) {
	const s1 = perto(r.a, 0.7, 0.4), s2 = perto(r.b, 0.3, 0.4);
	let de = s1 ? Math.max(s1[0], s1[1] - 0.22) : r.a - 0.03;
	let ate = s2 ? Math.min(s2[1], s2[0] + 0.28) : r.b + 0.08;
	if (!s1) alertas.push(`início da frase ${r.n1} (${r.a.toFixed(2)} s): sem silêncio por perto`);
	if (!s2) alertas.push(`fim da frase ${r.n2} (${r.b.toFixed(2)} s): sem silêncio por perto`);
	if (ate - de < 0.25) { alertas.push(`região ${r.n1}-${r.n2} ficou com ${(ate - de).toFixed(2)} s: conferir`); continue; }
	// pausas longas dentro da região
	let t = de;
	for (const s of SIL) {
		if (s[1] <= de || s[0] >= ate) continue;
		const a = Math.max(s[0], de), b = Math.min(s[1], ate);
		if (b - a >= 0.65) { trechos.push({ de: +t.toFixed(3), ate: +(a + 0.25).toFixed(3), n: r.n1, z: r.z }); t = b - 0.2; }
	}
	trechos.push({ de: +t.toFixed(3), ate: +ate.toFixed(3), n: r.n1, z: r.z });
}
for (let i = 1; i < trechos.length; i++) if (trechos[i].de < trechos[i - 1].ate && trechos[i].de > trechos[i - 1].de && trechos[i].z === trechos[i - 1].z) trechos[i].de = trechos[i - 1].ate;
const limpos = trechos.filter((t) => t.ate - t.de > 0.12);
const total = limpos.reduce((s, t) => s + t.ate - t.de, 0);
// AJUSTE FINO À MÃO (conferido por transcrição ISOLADA do pedaço): "um seriado" (frase 240) cola na frase 241 sem silêncio; o corte fica 0,03 s depois da palavra.
for (const t of limpos) if (Math.abs(t.ate - 724.98) < 0.03) t.ate = 724.93;
fs.writeFileSync("trechos.json", JSON.stringify(limpos));
fs.writeFileSync("trechos.ts", "// GERADO por cravar.mjs: trechos do ORIGINAL que tocam, cravados no envelope do áudio.\nexport const TRECHOS:{de:number;ate:number;n:number;z?:number}[]=" + JSON.stringify(limpos) + ";\n");
fs.writeFileSync("alertas.txt", alertas.join("\n"));
const mm = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
console.log(`piso ${piso.toFixed(1)} dB · voz ${voz.toFixed(1)} dB · limiar ${THR.toFixed(1)} dB · ${SIL.length} silêncios`);
console.log(`${reg.length} regiões → ${limpos.length} trechos · aula ${mm(total)} · alertas ${alertas.length}`);
console.log(alertas.slice(0, 40).join("\n"));
