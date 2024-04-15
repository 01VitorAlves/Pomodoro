const html = document.querySelector('html');

const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const timer = document.querySelector('#timer');

const botoes = document.querySelectorAll('.app__card-button');

const botaoMusica = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3')  //lendo a pasta e colocando a musica em variavel
musica.loop = true; //função nativa do JS, a musica fica em loop

const somPlay = new Audio('/sons/play.wav')
const somPause = new Audio('/sons/pause.mp3')
const alarme = new Audio('/sons/beep.mp3')

const BotoesComecarPausar = document.querySelector('#start-pause span'); //veja que aqui eu pego o ID e depois pego mais especifico uma tag
const iconePlayPause = document.querySelector('.app__card-primary-butto-icon');


const botaoComecar = document.querySelector('#start-pause');
let tempo = 1500;
let intervaloID = null;

//Primeiro criamos as variaveis que identicam:
//1. A pagina inteira (queremos especialmente mexer no fundo)
//2. Os botões que alteram as paginas, usando o querySelector e selecionando as classes que identificam os botões

botaoMusica.addEventListener('change', () => {    //esse botao do html do tipo toggle, tem dentro dele o atributo change, sempre q ele for trocado
    if(musica.paused){  //play e pause são funções nativas
        musica.play()
    }
    else{
        musica.pause()
    }
}

);



botaoFoco.addEventListener('click', ()=> {
    tempo = 1500;
    background ('foco')
    botaoFoco.classList.add('active');
    
})

botaoCurto.addEventListener('click', ()=> {
    tempo = 300;
    background ('descanso-curto')
    botaoCurto.classList.add('active');
    
})

botaoLongo.addEventListener('click', ()=> {
    tempo = 900;
    background ('descanso-longo')
    botaoLongo.classList.add('active');
})


function background (contexto) {
    mostrarTempo()
    botoes.forEach(contexto => {

        contexto.classList.remove('active')
    });

    

    html.setAttribute('data-contexto', `${contexto}`);

    banner.setAttribute('src', `./imagens/${contexto}.png`)

    switch (contexto) {
        case 'foco': 
            titulo.innerHTML =`
             Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            
            break;

            case 'descanso-curto': 
            titulo.innerHTML =
            `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `             
            break;

            case 'descanso-longo': 
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break;
    
        default:
            break;
    }
}




//pedindo para uma variavel que indentifica um botão, fazer algo:
//
//Passo 1. Selecione a variavel e use a função .addEventListener

//A parametrização dela funciona da seguinte forma: addEventListener(1.click, 2.()=> {})
//1. Ação que será feita
//2. simbolo de função


//Passo 2.
//Fale o que a função deve fazer: variavel HTML.setAttribute()

//setAttribute() pede 2 parametros, o primeiro para selecionar o atributo o segundo para ser atribuido 
//


const contagemRegressiva = () => {
    if (tempo <= 0){
        alarme.play()
        alert('tempo finalizado')
        zerar()
        return
       
    }
    tempo -=1  //-=1 significa decrementação, pego o tempo e diminuo 1 a cada iteração
    mostrarTempo() 
    
}

botaoComecar.addEventListener('click', ()=> {
    if(intervaloID !=null) {
        
        somPause.play()
    } 
    else {
        somPlay.play()
    }

    iniciarOuPausar()
    contagemRegressiva()
})



function iniciarOuPausar() {
    if(intervaloID != null) {
        zerar()
        return
    }

    BotoesComecarPausar.textContent = "Pausar"
    iconePlayPause.setAttribute('src', './imagens/pause.png')
    intervaloID = setInterval(contagemRegressiva, 1000); 
    //criada variavel vazia
    //chamado metodo que recebe: 1.oq fazer(função), 2.A cada quanto tempo? 1000miliSegundos
}
//Essa função é basicamente uma função que fala pra fazer outra a cada X tempo





function zerar() {
    clearInterval(intervaloID);  //essa função é nativa do JS, ela cancela a setInterval
    intervaloID = null;

    BotoesComecarPausar.textContent = "Começar"
    iconePlayPause.setAttribute('src', './imagens/play_arrow.png')
}
//com essa função basicamente estamos interrompendo a função contagem regressiva
// a variavel tempo = 5 foi decrementada e a cada menos -1 era subtraido dela e guardada no intervaloID
//tempo = 5 (1seg) -1  => intervalo ID(4, 1seg)

//Quando chamo essa função eu interrompo a regressão de 1000miliseg e em seguida limpo o intervaloID
//SÓ QUE a variavel tempo já foi decrementada, agora ela está  tempo = 4;

//Quando clico novamente em function iniciarOuPausar() ele faz:
//O intervalo ID vai chamar a contagem regressiva que guardou o tempo 4 e seguir dali

function mostrarTempo() {
    const tempoMinutos = new Date(tempo * 1000);
    const tempoFormatado = tempoMinutos.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`;
}


mostrarTempo() //coloque fora de tudo no fim do documento para ela sempre estar a mostra