// ROTEIRO.txt = o arquivo que o MARCOS edita. Na frente de cada frase tem [FICA] ou [SAI ]; ele troca, salva e roda aplicar.bat.
// Se o arquivo existe, o status de cada frase vem DELE (as listas do roteiro.mjs só valem na primeira geração).
import fs from "node:fs";
const ARQ = "ROTEIRO.txt";

export function lerStatus(out) {
	if (!fs.existsSync(ARQ)) return;
	const st = new Map();
	for (const l of fs.readFileSync(ARQ, "utf8").split(/\r?\n/)) {
		const m = l.match(/^\s*\[\s*(FICA|SAI)\s*\]\s+(\d+(?:[.,]5)?)\s/i);
		if (m) st.set(+m[2].replace(",", "."), m[1].toUpperCase() === "FICA" ? "F" : "S");
	}
	let mud = 0;
	for (const o of out) {
		const s = st.get(o.n);
		if (s && s !== o.s) { o.s = s; o.m = s === "S" ? "tirada pelo Marcos" : "devolvida pelo Marcos"; mud++; }
	}
	console.log("ROTEIRO.txt lido:", mud, "frase(s) diferente(s) da minha proposta");
}

export function escreverTxt(out, ATO) {
	const mm = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
	const L = [
		"ROTEIRO DA VSL DE REMARKETING (aula do YouTube)",
		"Pra mudar: troque [FICA] por [SAI ] (ou o contrário) no começo da linha, salve e dê dois cliques em aplicar.bat.",
		"Não mexa no número da frase. O texto é só pra leitura (mudar o texto aqui não muda o áudio).",
	];
	L.push("A ordem abaixo é a ORDEM DO VÍDEO FINAL (quebra-cabeça), não a do vídeo original. As frases que saíram e não pertencem a nenhum bloco ficam no fim.");
	const atoDe = (n) => { let k = 0; ATO.forEach((a, i) => { if (Math.floor(n) >= a[0]) k = i; }); return k; };
	let ult = -1;
	for (const o of out) {
		const k = atoDe(o.n);
		if (o.r) { if (ult !== -3) { L.push("", "", "======== FRASES QUE SAÍRAM E NÃO PERTENCEM A NENHUM BLOCO ========", ""); ult = -3; } }
		else if (o.z) { if (ult !== -2) { L.push("", "", "======== ABERTURA FRIA (este trecho toca aqui e também no lugar dele, mais adiante) ========", ""); ult = -2; } }
		else if (o.bl || k !== ult) { L.push("", "", `======== ${ATO[k][1]} ========${o.bl && o.n !== 1 ? "   (BLOCO MOVIDO: começa na frase " + o.n + " do original)" : ""}`, ""); ult = k; }
		L.push(`${o.s === "F" ? "[FICA]" : "[SAI ]"} ${String(o.n).padEnd(6)} ${mm(o.a).padStart(5)}  ${o.t}${o.s === "S" && o.m ? "   <<< " + o.m : ""}`);
	}
	fs.writeFileSync(ARQ, "﻿" + L.join("\r\n") + "\r\n");
}
