
//Variaveis do jogo
let ALTURA, LARGURA //Largura e altura da tela do jogador.
let canvas; //Canvas é o cenário do jogo
let principal;  //tag main
let ctx; //Tipo de cenário (2d)
let frames = 0; //Frames do jogo

// ======= COMPONENTES DE PROGRAMAÇÃO ======



function criaCenario() {
    
    tamanhoCenario();
    canvas = document.createElement("canvas"); // a tag canvas é o cenário do jogo
    canvas.width = LARGURA;
    canvas.height = ALTURA; 
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d"); //Diz que o cenário vai ser 2d
    principal = document.createElement("main"); //cria a tag main pra centralizar o cenário na tela
    document.body.appendChild(principal).appendChild(canvas); //Coloca a tag canvas dentro da main
    

}

function tamanhoCenario() {
    //Define o tamanho do canvas
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    //600px é o tamanho ideal pro tamanho do cenário
    if (LARGURA >= 500) {
        LARGURA = 600; 
        ALTURA = 600;
    }
}


// =========  COMPONENTES DO JOGO DO JOGO ===========

//Valida se o jogador clicou na tela.
function clique(evento) {

}
//atualiza o status do personagem
function atualiza() {
    document.addEventListener("mousedown", clique); //repete o evento de click do usuario
    frames++;
}


//Aqui serao criados todos os objetos do cenário. ex: Chão, personagem, obstaculo
function desenha() {
    /*eixo X e Y do plano cartesiano,começa do canto superior esquerdo(0,0) 
    e vai até o inferior direito do cenario(LARGURA, ALTURA)*/
    ctx.fillRect(0,0, LARGURA, ALTURA);
    ctx.fillStyle = "#50beff"; //cor do cenário
}
//Repete o jogo para que ele nao suma
function roda() {
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}

function main() {  
    criaCenario();
    roda();
}

main();