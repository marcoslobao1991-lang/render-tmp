// ROTEIRO do remake (3ª versão, 15/11): a linha do tempo inteira em UM lugar.
// Cada trecho = UM ponto da aula. `ponto` é a frase-guia (fica PARADA na faixa enquanto ele explica; só troca quando o ponto muda).
// S = LOUSA (remake do slide azul-marinho do original): tela cheia, só quando ELE não existe; substitui desenho, b-roll e faixa.
// D = desenho (só onde mostrar ensina mais que falar). broll = o que entra quando ELE não existe no original.
// Tela em cada instante = uma coisa só: ele em tela cheia · OU desenho em cima + ele embaixo · OU b-roll. E a faixa, sempre no mesmo lugar.
import React from "react";
import { COR } from "./motion/base";
import * as D from "./motion/desenhos";
import * as L from "./motion/lousa";

const A: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: COR.azul }}>{children}</span>;
export type Trecho = { de: number; ponto: React.ReactNode; D?: React.FC; S?: React.FC; broll?: string };

export const ROTEIRO: Trecho[] = [
	// ───── LEAD
	{ de: 0, ponto: <>Fiquei fluente do jeito mais <A>sem graça</A></>, broll: "estudo" },
	{ de: 9.4, ponto: <>Vendedor pra uma empresa <A>nos Estados Unidos</A></>, broll: "ligacao" },
	{ de: 19.15, ponto: <>A melhor forma de <A>destravar o inglês</A></> },
	{ de: 24.4, ponto: <>Imagina assistir uma série <A>sem legenda</A></>, broll: "friends" },
	{ de: 41.9, ponto: <>Depois do 1º episódio, o 2º fica <A>muito mais fácil</A></>, D: D.EpsLead, broll: "friends" },
	{ de: 60.3, ponto: <>Alunos largaram aula presencial <A>nos EUA</A> por isso</>, broll: "sala" },
	{ de: 73.9, ponto: <>O jeito sem graça: <A>sem truques</A></>, broll: "dormindo" },
	{ de: 88.7, ponto: <>O que é a fluência <A>de verdade</A></>, broll: "entrevista" },
	{ de: 111.1, ponto: <>Meu nome é <A>Marcos Lobão</A></> },
	{ de: 125.1, ponto: <>Fluência essencial: o inglês falado <A>90% do tempo</A></> },
	{ de: 135.5, ponto: <>“Isso é sem graça, mas <A>me deixou fluente</A>”</>, D: D.Youtube, broll: "celular" },
	{ de: 144.05, ponto: <>Alunos no <A>mundo inteiro</A></>, broll: "friends" },
	// ───── AULA 1 · as duas camadas
	{ de: 153.55, ponto: <>O mercado promete fluência <A>sem esforço</A></>, S: L.Mercado, broll: "dormindo" },
	{ de: 176.0, ponto: <><A>Por que</A> isso continua sendo falado?</> },
	{ de: 183.75, ponto: <>Seu cérebro aprende em <A>2 camadas</A></>, D: D.Camadas1, broll: "cerebro" },
	{ de: 204.65, ponto: <>Camada 1: você entende, mas <A>não usa</A></>, D: D.Camadas2, broll: "celular" },
	{ de: 228.85, ponto: <>Fluência é o que você faz <A>no automático</A></> },
	{ de: 240.05, ponto: <>Ver um tutorial não te faz <A>pousar um avião</A></>, broll: "aviao" },
	{ de: 256.45, ponto: <>Camada 2: onde tudo é <A>automático</A></>, D: D.Camadas3, broll: "cerebro" },
	{ de: 284.85, ponto: <>O subconsciente é <A>30 mil vezes</A> mais rápido</>, D: D.Corrida, broll: "foguete" },
	{ de: 313.35, ponto: <>Usar o consciente é ir pra Lua <A>de tartaruga</A></>, broll: "lua" },
	{ de: 327.8, ponto: <>Como colocar o inglês no <A>subconsciente</A>?</>, S: L.Pergunta, broll: "lua" },
	// ───── AULA 2 · habilidade e treino
	{ de: 348.95, ponto: <>Inglês não é matéria. É <A>habilidade</A></>, D: D.Materia, S: L.CHabilidades, broll: "sala" },
	{ de: 365.65, ponto: <>Bicicleta: o equilíbrio fica <A>automático</A></>, broll: "bike" },
	{ de: 380.55, ponto: <>Dirigir: depois você faz <A>sem pensar</A></>, broll: "dirigir" },
	{ de: 389.15, ponto: <>O músico toca <A>pensando em outra coisa</A></>, broll: "violao" },
	{ de: 416.35, ponto: <>No inglês é <A>exatamente igual</A></>, broll: "violao" },
	{ de: 430.8, ponto: <>Habilidade se adquire <A>com treino</A></>, broll: "violao2" },
	{ de: 437.2, ponto: <>Inglês é <A>habilidade</A>: precisa de treino</>, S: L.Habilidade, broll: "violao2" },
	{ de: 441.8, ponto: <>Ler tudo sobre violão <A>sem encostar nele</A></>, broll: "violao2" },
	{ de: 453.35, ponto: <>Dois treinos: <A>escuta</A> e <A>fala</A></>, S: L.Habilidade, broll: "fone" },
	{ de: 461.0, ponto: <>O embolado é <A>ouvido pouco treinado</A></>, D: D.Embolado0, broll: "fone" },
	{ de: 476.45, ponto: <>Violão desafinado: o iniciante <A>nem percebe</A></>, broll: "violao2" },
	{ de: 497.05, ponto: <>Ouvido treinado <A>separa as palavras</A></>, D: D.Embolado1, broll: "fone" },
	{ de: 516.6, ponto: <>Seus primeiros episódios, <A>100% em inglês</A></>, broll: "friends" },
	{ de: 526.95, ponto: <>Na fala, as palavras vêm <A>em blocos</A></>, D: D.Bloco, broll: "friends" },
	{ de: 550.0, ponto: <>Primeiro o <A>porquê</A>. Depois eu mostro o como</> },
	{ de: 560.65, ponto: <>Até aqui: habilidade se <A>treina</A></>, S: L.Habilidade, broll: "fone" },
	// ───── AULA 3 · fluência essencial
	{ de: 574.5, ponto: <>Mais um conceito: <A>fluência essencial</A></>, S: L.CEssencial },
	{ de: 582.4, ponto: <>500 palavras = <A>90%</A> do dia a dia</>, D: D.Quinhentas, broll: "friends" },
	{ de: 596.05, ponto: <>Friends: <A>800 palavras</A> por episódio</>, D: D.Calculadora, S: L.Calculo, broll: "friends" },
	{ de: 615.65, ponto: <>Por que se <A>sobrecarregar</A> com o resto?</>, broll: "sala" },
	{ de: 631.8, ponto: <>Tradicional: toda semana <A>um assunto novo</A></>, D: D.Semana, broll: "sala" },
	{ de: 642.15, ponto: <>Aqui: toda a energia <A>no essencial</A></>, broll: "tv" },
	{ de: 664.35, ponto: <>2ª parte: <A>o que você vai fazer</A></> },
	{ de: 677.4, ponto: <>Tudo isso é feito com <A>repetição</A></>, S: L.Subconsciente, broll: "fone" },
	// ───── AULA 4 · repetição
	{ de: 692.65, ponto: <>Tudo que ficou automático teve <A>repetição</A></>, S: L.Subconsciente, broll: "violao" },
	{ de: 706.6, ponto: <>Tipo 1: repetição <A>continuada</A></>, S: L.Repeticao, broll: "violao" },
	{ de: 720.54, ponto: <>O músico repete o <A>mesmo solo</A></>, broll: "violao" },
	{ de: 736.25, ponto: <>Tipo 2: repetição <A>espaçada</A></>, S: L.Repeticao, broll: "calendario" },
	// ───── AULA 5 · treinos concentrados
	{ de: 746.65, ponto: <>Lembra do seu <A>primeiro episódio</A>?</>, broll: "tv" },
	{ de: 758.3, ponto: <>Ver 3 temporadas inteiras <A>não é treino</A></>, broll: "tv" },
	{ de: 774.35, ponto: <>Treinos <A>concentrados</A></>, S: L.Concentrados, broll: "friends" },
	{ de: 812.85, ponto: <>Só escutar o mesmo minuto <A>já é treino</A></>, D: D.LoopMinuto, broll: "fone" },
	{ de: 830.0, ponto: <>Meu inglês deu um <A>salto gigante</A></>, broll: "fone" },
	{ de: 844.65, ponto: <>Cada trecho, até entender <A>100%</A></>, D: D.Trechos, broll: "violao" },
	{ de: 855.8, ponto: <>Os músicos treinam <A>trecho por trecho</A></>, broll: "violao" },
	{ de: 872.15, ponto: <>Cada novo episódio fica <A>mais fácil</A></>, D: D.EpsAula, broll: "rindo" },
	// ───── AULA 6 · discursos e a história dele
	{ de: 908.15, ponto: <>Séries: emendas, expressões, <A>ritmo real</A></>, S: L.CConversacionais, broll: "friends" },
	{ de: 922.85, ponto: <>Você também precisa treinar <A>discursos</A></>, S: L.CDiscursos, broll: "discurso" },
	{ de: 928.0, ponto: <>Você também precisa treinar <A>discursos</A></>, broll: "discurso" },
	{ de: 944.55, ponto: <>Nada de aeroporto: <A>inglês pesado</A></>, broll: "entrevista" },
	{ de: 966.85, ponto: <>Foi assim que <A>eu fiquei fluente</A></> },
	{ de: 980.3, ponto: <>A sacada: inglês se aprende <A>com treino</A></> },
	{ de: 984.5, ponto: <>Eu queria trabalhar <A>nos Estados Unidos</A></> },
	{ de: 997.5, ponto: <>Família de músicos: eu <A>conhecia o treino</A></> },
	{ de: 1007.3, ponto: <>Meu inglês tinha que ser <A>perfeito</A></>, broll: "ligacao" },
	{ de: 1029.55, ponto: <>Persisti e <A>consegui o emprego</A></> },
	{ de: 1040.0, ponto: <>Fluente <A>sem sair do país</A></> },
	{ de: 1044.8, ponto: <>Minha irmã: RH de uma <A>multinacional</A></> },
];
