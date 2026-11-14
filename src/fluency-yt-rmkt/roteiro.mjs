// ROTEIRO FINAL (13/11, 3ª passada, régua Bencivenga: prova, admissão honesta e porquê ficam). Tudo que não está em SAI fica.
// Furos = fala que o Whisper do arquivo inteiro perdeu e a transcrição isolada recuperou (tempo aproximado; cravar no envelope).
import fs from "node:fs";
import { lerStatus, escreverTxt } from "./editavel.mjs";
const F = JSON.parse(fs.readFileSync("frases.json", "utf8"));
const W = JSON.parse(fs.readFileSync("words.json", "utf8"));
const R = {
	rec: "recomeço",
	bas: "bastidor da gravação",
	mul: "muleta",
	dup: "repetição da frase anterior (você digitando)",
	can: "“veja outros vídeos do canal” / pedido de like",
	anu: "anuncia de novo o que já anunciou",
	tan: "tangente: tira a pessoa da linha do argumento",
};
const SAI = [
	[11, 14, R.rec], [19, 19, R.dup], [28, 28, R.mul],
	[35, 37, R.can],
	[59, 59, R.rec], [63, 64, R.rec], [83, 85, R.rec], [92, 92, R.bas], [95, 97, R.can],
	[101, 108, "anuncia os 2 tipos de repetição e só explica 10 min depois; o anúncio certo é o da frase 290"],
	[118, 118, "frase quebrada (nem isolada dá pra entender)"], [123, 129, R.bas + " + repete o que acabou de dizer"], [145, 147, R.bas],
	[164, 164, R.bas], [167, 167, R.bas], [174, 175, R.mul], [180, 181, R.anu],
	[188, 188, R.dup], [197, 197, R.rec], [202, 202, R.mul], [206, 206, R.rec], [214, 215, R.rec], [217, 218, R.rec], [229, 229, R.rec], [235, 235, R.mul],
	[239, 239, "frase que não termina"], [241, 241, R.bas], [266, 266, R.rec], [268, 268, R.rec], [271, 271, R.rec], [274, 275, R.dup], [280, 282, R.anu],
	[289, 289, R.bas], [292, 292, R.dup], [301, 301, R.dup], [310, 311, R.dup], [322, 322, R.mul], [326, 327, R.mul], [334, 334, "enfraquece o exemplo"],
	[347, 347, R.dup], [352, 352, R.rec], [356, 356, R.dup],
	[360, 364, "“posso falar uma big besteira”: a fonte (o livro) fica, a autossabotagem sai"],
	[367, 370, R.dup], [373, 373, R.mul], [375, 388, "você digitando, fala picada; a ideia recomeça limpa na 389"],
	[397, 397, R.rec], [399, 399, R.mul], [401, 402, R.mul], [434, 435, R.rec],
	[452, 455, R.bas + " (procurando no docs)"], [466, 469, R.bas + " (elogio à própria aula)"], [475, 478, R.bas + " (esqueceu a frase)"], [494, 494, R.rec], [496, 496, R.rec],
	[504, 504, R.mul], [507, 510, R.rec], [515, 526, R.tan + " (crescimento de canal no YouTube)"], [538, 540, R.mul],
	[541, 562, R.anu + " + " + R.can], [564, 570, R.bas + " sobre o canal"], [597, 597, R.mul], [600, 600, R.mul], [605, 606, R.anu],
	[612, 637, R.tan + " (os 10% de vocabulário, tipos de material)"], [642, 658, R.tan + " (discurso × série, argumentação)"],
	[660, 660, R.rec], [668, 668, R.dup], [681, 681, R.bas], [683, 685, R.bas + " (títulos do canal)"], [697, 698, R.rec], [700, 700, R.bas], [702, 703, R.rec], [705, 705, R.rec], [735, 736, "detalhe que confunde"],
	[746, 746, R.dup], [750, 751, R.rec], [755, 759, "“põe uma sinfonia junto”: conselho estranho que enfraquece o método"],
	[766, 783, "repete o exemplo do solo (já usado 2 vezes) + pedido de comentário"], [788, 788, R.dup], [794, 794, R.rec], [796, 802, R.can], [810, 810, R.dup],
	[828, 828, R.dup], [842, 842, R.rec], [852, 855, "“vou fazer outro vídeo”"], [863, 863, R.mul], [867, 875, "decidindo em voz alta se é 2x ou 1,5x"],
	[877, 910, "comparação do violão (1 música × 100): 1:30 confuso pra chegar numa conclusão que a 876 e a 911 já dão"], [912, 912, R.dup],
	[915, 915, R.can], [922, 922, R.mul], [933, 938, R.can], [940, 940, R.rec], [945, 950, R.rec], [963, 964, R.bas + " (procurando no docs)"],
	[992, 993, R.mul],
	[1020, 1022, "frase quebrada"], [1027, 1027, R.mul], [1035, 1035, R.dup],
	[1040, 1048, "“vi num livro do Brian Tracy”: fecha fraco; a aula termina na 1039"], [1049, 1053, "like e link na descrição: entra a oferta da VSL"],
];
// frase aparada (fica só este pedaço)
const PARC = {
	150: ["Quanto melhor é o ouvido de um músico, se triscar um pouquinho diferente a nota,", "sai só o pedido de comentário no meio da frase"],
	5: ["E não, talvez aprender inglês não seja tão divertido quanto parece,", "o resto repete a frase 4"],
	6: ["com esse ponto de vista você pode tomar uma decisão de falar assim, cara, eu quero ficar fluente.", "tira o “E que” pra colar na frase 5"],
};
// texto corrigido pela transcrição isolada
const TXT = {
	513: "e não sabe elas em português.",
	260: "Ou seja, a lapidação acelerada do ouvido acontece quando você aumenta a velocidade.",
	314: "Porque, já falamos: ensinar inglês não adianta.",
	423: "Eu entendo um pouquinho mas não consigo criar frases.",
	824: "Quando eu vi isso daí eu falei, cara, as séries se repetem tanto,",
	826: "Eu sabia que eu precisava provar meu ponto sobre as palavras que se repetem em estruturas.",
	985: "Todas as temporadas de Friends, tenho todas as temporadas de Two and a Half Men, né?",
};
// fala recuperada nos buracos: [depois da frase n, texto]
const FURO = [
	[511, "A hora que você percebe que você está ficando bom mesmo: você sabe palavras"],
	[239, "Por exemplo, no meu treinamento eu falo muito sobre a primeira grande meta de você entender"],
	[392, "você vai lá, faz a prova e não significa bagaceira nenhuma, e você não sabe nada. Então vamos lá: pessoas que aprendem, sabe quem que é essa galera aqui que aprende? É a que fica assim:"],
	[563, "Funcional. Que é o essencial. Ou seja, o conversacional. É isso que você precisa. Aonde a gente consegue encontrar isso? Filmes, séries."],
	[596, "Filmes e séries é onde a gente tem o conversacional,"],
	[729, "E daí eu não preciso nem falar que você vai repetir isso com os outros minutos. Claro que esse 1 minuto não precisa ser exato, pode ser a quebra de uma frase. Certo?"],
];
// tempo corrigido à mão (transcrição isolada com tempo por palavra): [início, fim]
const AJUSTE = { 824: [2267.9, null], 432: [1216.42, null] }; // 240: "um ... seriado" tem hesitação de 0,65 s e "seriado" cola na 241 sem silêncio; a borda fica cravada em 724,92; 432: "Embreagem" começa em 1216,4, não em 1217,18
const ATO = [
	[1, "LEAD", "Promessa + inimigo (as falácias do mercado) + a pergunta que prende: como parar de traduzir na cabeça"],
	[38, "CRENÇA QUEBRADA: aprender não é treinar", "Tira a culpa do aluno: quem tira 10 na prova não é fluente"],
	[84, "A BASE: repetição", "Nomeia o mecanismo sem enrolar"],
	[109, "A META MENOR: fluência essencial", "Reduz o tamanho do problema: só ouvido e fala, só o essencial"],
	[148, "MECANISMO 1: o ouvido se lapida", "Analogia do músico + Bruce Lee + “é assim que o cérebro aprende”"],
	[176, "REDUÇÃO: expressões, não vocabulário", "500 a 1.000 palavras · você como prova (“converso sobre qualquer assunto”)"],
	[236, "MECANISMO 2: velocidade", "1x → 1,5x → 2x · 1º episódio como meta (a oferta cobra essa promessa)"],
	[283, "VIRADA: “Beleza, Marcos. Mas como?”", "Segundo inimigo: aula que ENSINA inglês · planta “no meu treinamento tem tudo pronto”"],
	[323, "MÉTODO, parte 1: repetição continuada", "O bebê e o “papai”"],
	[346, "POR QUE FUNCIONA: consciente × subconsciente", "Explica as 3 dores (traduzo na cabeça, não crio frase, dá branco) · escola tradicional · marcha e violão"],
	[456, "REDUÇÃO 2: 1% do vocabulário, 90% do tempo", ""],
	[563, "A GRANDE IDEIA: inglês rápido e difícil", "Séries = inglês para americanos · rápido e fácil não andam juntos"],
	[601, "O TREINO, passo a passo", "Discurso · 1 minuto por 20 a 30 min · nível hard 2x · fácil = fraco"],
	[747, "A PROMESSA: o salto", "Um discurso já muda · depois, a série"],
	[823, "A PROVA: contei as palavras de Friends", "700 a 900 palavras por episódio · “you” 200 vezes"],
	[911, "MÉTODO, parte 2: repetição espaçada + shadowing", "Frase por frase · ficam fluentes antes de zerar as temporadas"],
	[1002, "O FUTURO: imersão simulada", "“Se o inglês rápido e fácil existe, o nome dele é imersão simulada”"],
	[1037, "PONTE PRA OFERTA", "“...colocar o inglês no seu subconsciente” → VSL validada"],
];
const sai = new Map();
for (const [a, b, m] of SAI) for (let i = a; i <= b; i++) sai.set(i, m);
const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, "").split(/\s+/).filter(Boolean);
const out = [];
for (const f of F) {
	const t = TXT[f.n] || f.t, s = sai.has(f.n) ? "S" : "F", m = sai.get(f.n) || "";
	if (PARC[f.n]) {
		const ws = W.filter((w) => w.a >= f.a - 0.01 && w.b <= f.b + 0.01);
		const k = norm(PARC[f.n][0]);
		const wn = ws.map((w) => norm(w.w)[0] || "");
		let hit = -1;
		for (let i = 0; i + k.length <= wn.length; i++) if (k.every((x, j) => wn[i + j] === x)) { hit = i; break; }
		if (hit < 0) throw new Error("parcial " + f.n);
		out.push({ n: f.n, a: ws[hit].a, b: ws[hit + k.length - 1].b, t: PARC[f.n][0], s: "F", m: "aparada: " + PARC[f.n][1], orig: f.t, q: 1 });
	} else out.push({ n: f.n, a: AJUSTE[f.n]?.[0] ?? f.a, b: AJUSTE[f.n]?.[1] ?? f.b, t, s, m, q: AJUSTE[f.n] ? 1 : 0 });
	const fu = FURO.find((x) => x[0] === f.n);
	if (fu) { const prox = F[f.n]; out.push({ n: f.n + 0.5, a: f.b + 0.15, b: prox.a - 0.15, t: fu[1], s: "F", m: "fala recuperada (o Whisper tinha perdido)" }); }
}
lerStatus(out);
// ── QUEBRA-CABEÇA (13/11, pedido do Marcos: "pegar pedaço de um canto e soltar no outro pra ficar + amarrada como copy") ──
// ordem: gancho (abertura fria) → problema → o que treinar → PROVA colada na afirmação → por que funciona → "mas como?" colado no treino → resultado → tipo 2 → futuro
// [da frase, até a frase, 1 = abertura fria (o trecho toca aqui E no lugar dele)]
const ORDEM = [[589, 593, 1], [1, 100], [109, 279], [824, 876], [346, 604], [283, 345], [607, 823], [911, 1039]];
{
	const fin = [];
	for (const [a, b, z] of ORDEM) { const bl = out.filter((o) => o.n >= a && o.n <= b).map((o) => ({ ...o, z: z ? 1 : 0 })); if (bl.length) bl[0] = { ...bl[0], q: 1, bl: 1 }; fin.push(...bl); }
	const usados = new Set(fin.filter((o) => !o.z).map((o) => o.n));
	const resto = out.filter((o) => !usados.has(o.n));
	const orfas = resto.filter((o) => o.s === "F");
	if (orfas.length) console.log("ATENÇÃO: frases marcadas FICA fora de qualquer bloco da ORDEM (não vão tocar):", orfas.map((o) => o.n).join(", "));
	for (const o of resto) { o.s = "S"; o.r = 1; }
	out.length = 0; out.push(...fin, ...resto);
}
const mm = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const tot = { F: 0, S: 0 };
out.forEach((o) => (tot[o.s] += o.b - o.a));
// fala contínua estimada: pausas entre frases que ficam, limitadas a 0,45 s
let aula = 0;
const ks = out.filter((o) => o.s === "F");
ks.forEach((o, i) => { aula += o.b - o.a; if (i) aula += Math.min(0.45, Math.max(0, o.a - ks[i - 1].b)); });
const OFERTA = 1586.35 - (17 * 60 + 35);
let h = `<html><head><meta charset="utf-8"></head><body><h1>VSL de remarketing (aula do YouTube + oferta validada): roteiro frase a frase (3ª passada)</h1>
<p><b>Preto = fica.</b> <span style="color:#b00020"><s>Vermelho riscado = sai</s></span>, com o motivo. <span style="background:#d9f2d9">Verde = fala que a transcrição tinha perdido e eu recuperei.</span> Número cinza = número da frase e minuto no vídeo original.</p>
<p><b>Duração:</b> aula ${mm(aula)} + oferta da VSL atual ${mm(OFERTA)} = <b>${mm(aula + OFERTA)}</b> em velocidade normal (${mm((aula + OFERTA) / 1.1)} a 1,1×). Saíram ${mm(tot.S)} de fala e uns 10 min de digitação em silêncio.</p>
<h2>A estrutura que sobrou</h2><ol>${ATO.map((a) => `<li><b>${esc(a[1])}</b>${a[2] ? ": " + esc(a[2]) : ""}</li>`).join("")}<li><b>OFERTA (VSL no ar, a partir de 17:35)</b>: centenas de alunos → áudio do aluno dos EUA → o que você recebe → preço → garantias → fecho</li></ol>\n`;
let ai = 0;
const res = [];
for (const o of out) {
	while (ai < ATO.length && Math.floor(o.n) >= ATO[ai][0]) {
		const prox = ATO[ai + 1]?.[0] ?? 1e9;
		const d = out.filter((x) => x.n >= ATO[ai][0] && x.n < prox && x.s === "F").reduce((s, x) => s + x.b - x.a, 0);
		res.push([ATO[ai][1], mm(d)]);
		h += `<h2>${ai + 1}. ${esc(ATO[ai][1])} <span style="font-weight:normal;font-size:11pt">(${mm(d)} de fala)</span></h2>${ATO[ai][2] ? `<p><i>${esc(ATO[ai][2])}</i></p>` : ""}\n`;
		ai++;
	}
	const id = `<span style="color:#888;font-size:9pt">${o.n} · ${mm(o.a)}</span> `;
	if (o.s === "S") h += `<p>${id}<span style="color:#b00020"><s>${esc(o.t)}</s></span> <span style="color:#b00020;font-size:9pt">[${esc(o.m)}]</span></p>\n`;
	else if (!Number.isInteger(o.n)) h += `<p>${id}<span style="background:#d9f2d9">${esc(o.t)}</span></p>\n`;
	else if (o.orig) h += `<p>${id}${esc(o.t)} <span style="color:#b00020;font-size:9pt">[${esc(o.m)}]</span></p>\n`;
	else h += `<p>${id}${esc(o.t)}</p>\n`;
}
h += `<h2>${ATO.length + 1}. OFERTA: emenda com a VSL no ar (17:35 até o fim)</h2><p><i>A aula termina em “...colocar o inglês no seu subconsciente.” e a VSL entra em:</i></p>
<p><span style="color:#b00020"><s>Mas</s></span> hoje a Fluency Route conta com centenas de alunos no mundo inteiro, que estão destravando o inglês e de fato internalizando o idioma no subconsciente.</p>
<p>Olha o que esse aluno me mandou depois de começar os treinos concentrados. E detalhe: ele mora nos Estados Unidos e estava fazendo uma aula presencial lá.</p>
<p>[áudio do aluno, cerca de 1:10]</p><p>E esse é só um dos exemplos. [...] E agora que você já entendeu como que tudo funciona, talvez você esteja se perguntando: tá, mas o que eu posso esperar do treinamento da Fluency Route?</p>
<p>[segue a VSL validada até o fim: o que você recebe, por que tanta gente trava, R$49 no plano anual, duas garantias, fecho]</p></body></html>`;
fs.writeFileSync("Fluency YT - ROTEIRO FINAL frase a frase.html", h);
fs.writeFileSync("roteiro.json", JSON.stringify(out));
escreverTxt(out, ATO);
const d = out.filter((o) => !o.z).map((o) => ({ n: o.n, a: +o.a.toFixed(2), b: +o.b.toFixed(2), t: o.t, s: o.s, m: o.m }));
fs.writeFileSync("dados.ts", "// GERADO por roteiro.mjs (13/11, 2ª passada). F fica, S sai. n com ,5 = fala recuperada num buraco do Whisper.\nexport type Frase={n:number;a:number;b:number;t:string;s:\"F\"|\"S\"|\"D\";m:string};\nexport const FRASES:Frase[]=" + JSON.stringify(d) + ";\nexport const CAPS:[number,string,string][]=" + JSON.stringify(ATO) + ";\n");
console.log("fica", mm(tot.F), "sai", mm(tot.S), "aula contínua", mm(aula), "total", mm(aula + OFERTA), "frases ficam", ks.length, "saem", out.length - ks.length);
console.table(res);
