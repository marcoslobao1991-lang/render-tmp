// Gera o ÁUDIO da aula já cortado (trechos.json), num arquivo só, pro Studio rodar leve sem o vídeo.
// Cada trecho sai com EXATAMENTE a duração em frames que a composição usa (durTrecho × VEL / 30), então não dessincroniza.
// uso: node audio-aula.mjs   (precisa de bruto/audio-44k.wav: ffmpeg -i bruto/audio.m4a -ac 1 -ar 44100 bruto/audio-44k.wav)
import fs from "node:fs";
import { execFileSync } from "node:child_process";
const VEL = Number(fs.readFileSync("motion/base.tsx", "utf8").match(/export const VEL = ([\d.]+)/)[1]);
const SR = 44100;
if (!fs.existsSync("bruto/audio-44k.wav")) execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", "bruto/audio.m4a", "-ac", "1", "-ar", String(SR), "bruto/audio-44k.wav"]);
const T = JSON.parse(fs.readFileSync("trechos.json", "utf8"));
const buf = fs.readFileSync("bruto/audio-44k.wav");
const at = buf.indexOf(Buffer.from("data")) + 8;
const partes = [];
let frames = 0;
for (const t of T) {
	const fr = Math.round(((t.ate - t.de) / VEL) * 30);
	const n = Math.round(((fr * VEL) / 30) * SR);
	const ini = at + Math.round(t.de * SR) * 2;
	let p = buf.subarray(ini, ini + n * 2);
	if (p.length < n * 2) p = Buffer.concat([p, Buffer.alloc(n * 2 - p.length)]);
	partes.push(p); frames += fr;
}
const pcm = Buffer.concat(partes);
const h = Buffer.alloc(44);
h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVEfmt ", 8); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
fs.writeFileSync("_aula.wav", Buffer.concat([h, pcm]));
execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", "_aula.wav", "-c:a", "aac", "-b:a", "128k", "../../public/fluency-yt-rmkt-aula.m4a"]);
fs.rmSync("_aula.wav");
console.log("public/fluency-yt-rmkt-aula.m4a ·", frames, "frames ·", (pcm.length / 2 / SR / 60).toFixed(2), "min em 1× (toca a", VEL + "×)");
