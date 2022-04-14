
//Variaveis do jogo
let ALTURA, LARGURA //Largura e altura do cenário. (--> NÃO MEXER <--)
let canvas; //Canvas é o cenário do jogo
let principal;  //tag main
let ctx; //Tipo de cenário (2d)
let frames = 0; //Frames do jogo
const maxPulos = 3; //Quantos pulos o personagem pode dar no jogo
const corCenario = "#50beff";
const corChao = "#ffdf70";
const corPersonagem = "#ff4e4e";
const gravidadePersonagem = 1.5; //altera a velocidade do pulo


//Aqui serao criados todos os objetos do cenário. ex: Chão, personagem, obstaculo

const chao = {
    y: 550, //eixo y do cartesiano
    altura: 50, //altura em px no plano cartesiano
    cor:  corChao,
    desenha: function(){
        ctx.fillStyle = this.cor; //muda a cor do chao
        ctx.fillRect(0, this.y, LARGURA, this.altura); //coloca o chao no cenario
    }
}

const personagem = {
    x: 50, //eixo x do cartesiano
    y: 0, //eixo y do cartesiano
    altura: 50, //altura do personagem
    largura: 50, //largura do personagem
    cor: corPersonagem,

    desenha: function(){
        ctx.fillStyle = this.cor; //muda cor do personagem
        ctx.fillRect(this.x, this.y, this.largura, this.altura); //coloca o personagem no cenário
    },

    // ===== Física do personagem ======
    gravidade: gravidadePersonagem, //aceleração (o quão rapido ele pula e cai)
    velocidade: 0, //movimento constante
    forcaPulo: -15,
    qntPulos: 0,
    atualizaStatus: function(){
        
        //move o personagem pro chão
        this.velocidade += this.gravidade;
        this.y += this.velocidade;

        //colisão do personagem com o chão
        if(this.y > chao.y - this.altura)
            this.y = chao.y - this.altura; 
    },

    pula: function() {
        //pula  no máximo 3 vezes
        if(this.qntPulos < maxPulos){
            this.velocidade = this.forcaPulo;
            this.qntPulos++;
        }
        else   
            this.qntPulos = 0;//reseta os pulos pra que o jogador possa pular novamente
    },

}

const obstaculos = {
    _obs: [], //Obstaculos
    cores: ["#ffbc1c", "#ff1c1c","#ff85e1","#52a7ff", "#78ff5d" ], //Cor dos obstaculos

    colocaObstaculo: function() {
        this._obs.push({
            x: 200,
            largura: 30 + Math.floor(21*Math.random()), //Gera uma distancia aleatoria para os obstaculos
            altura: 30 + Math.floor(120*Math.random()), //Gera uma altura aleatoria para os obstaculos
            cor: this.cores[Math.floor(5 * Math.random())],  //Gera cor aleatoria para os obstaculos

        })
    },

    atualiza() {

    },

    desenha: function() {    
        for(let i =0, tam = this._obs.length; i < tam; i++){
            let obs = this._obs[i];
            ctx.fillStyle = obs.cor; 
            ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
        }
    },

}

// ======= COMPONENTES DE PROGRAMAÇÃO ======

//---> NÃO MEXER <-----
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
//----> NÃO MEXER EM HIPOTESE ALGUMA <------
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

// =========  COMPONENTES DO JOGO ===========

//Valida se o jogador clicou na tela.
function clique(evento) {
    personagem.pula();

}
//atualiza o status do personagem
function atualiza() {
    document.addEventListener("mousedown", clique); //repete o evento de click do usuario
    frames++;
    personagem.atualizaStatus();
}

function pintaCenario() {
    
    ctx.fillStyle = corCenario; //pinta o cenário
    ctx.fillRect(0,0, LARGURA, ALTURA);
    
}

//Desenha os objetos do cenário no jogo
function desenha() {
    pintaCenario();
    chao.desenha();
    obstaculos.desenha();
    personagem.desenha();
    
}
//Repete o jogo para que ele nao suma
function roda() {
    atualiza();
    desenha();
    window.requestAnimationFrame(roda);
}
//Inicia o jogo
function main() {  
    criaCenario();
    roda();
}

main();// ----> NÃO APAGAR ESTA LINHA <------