//Inicializacion de variables
let tarjetadestapada = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let tiempoRegresivoId;
let timerInicial = timer;

//Apuntando al documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAcieros = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');
const modal = document.querySelector('.modal');
const cerrarmodal = document.querySelector('.modal__close');
const modalperder = document.querySelector('.modalperder');
const cerrarmodalperder = document.querySelector('.modal__close__perder');


//Audios
let audioClick = new Audio('./assets/sonidos/click.wav');
let audioAcierto = new Audio('./assets/sonidos/bien.wav');
let audioPerdiste = new Audio('./assets/sonidos/perder.wav');
let audioGanaste = new Audio('./assets/sonidos/ganar.wav');
let audioMal = new Audio('./assets/sonidos/error.wav');



//Generar cuadros aleatorios
let partida1 = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    partida1 = partida1.sort(()=>{return  Math.random()-0.5});

let partida2 = [9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16];
    partida2 = partida2.sort(()=>{return  Math.random()-0.5});

let partida3 = [17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24];
    partida3 = partida3.sort(()=>{return  Math.random()-0.5});
 
let partida4 = [25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32];
    partida4 = partida4.sort(()=>{return  Math.random()-0.5});
    
let partida5 = [33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40];
    partida5 = partida5.sort(()=>{return  Math.random()-0.5});

let partida6 = [41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,48];
    partida6 = partida6.sort(()=>{return  Math.random()-0.5});

let partida7 = [49,49,50,50,51,51,52,52,53,53,54,54,55,55,56,56];
    partida7 = partida7.sort(()=>{return  Math.random()-0.5});

   const azar = Math.floor(Math.random() * 7);
    let diego = [];

    switch (azar) {
        case 0:
            diego = partida1;
        break;
        case 1:
            diego = partida2;
        break;
        case 2:
            diego = partida3;
        break;
        case 3:
            diego = partida4;
        break;
        case 4:
            diego = partida5;
        break;
        case 5:
            diego = partida6;
        break;
        case 6:
            diego = partida7;
        break;
        default:
             alert("Error");
        break;
      }



function contarTiempo(){
 tiempoRegresivoId = setInterval(()=>{
       timer--;
       mostrarTiempo.innerHTML = `Tiempo: &nbsp 0:${timer}`;
       if(timer <= 0){
          clearInterval(tiempoRegresivoId);
          bloqueartargetas(diego);
          audioPerdiste.play();

        //mostar ventana modal 
        modalperder.classList.add('modal--show');

        cerrarmodalperder.addEventListener('click', (j)=>{
        j.preventDefault();
        modalperder.classList.remove('modal--show');
        });
          
       }
   },1000);
}

function bloqueartargetas(){
    for(let i=0; i<=15; i++){
        let targetaBloqueada = document.getElementById(i);
        targetaBloqueada.innerHTML = `<img src="./assets/img/${diego[i]}.png">`;
        targetaBloqueada.disabled = true;
    }
}

//funcion principal
function destapar(id){
 
    if(temporizador == false){
       contarTiempo();
       temporizador = true;
    }


    tarjetadestapada++;

    if(tarjetadestapada == 1){
         //mostrar el priemer numero
      tarjeta1 = document.getElementById(id);
      primerResultado = diego[id];
      tarjeta1.innerHTML = `<img src="./assets/img/${primerResultado}.png">`;
      audioClick.play();

      //desHabilitar el primer boton
      tarjeta1.disabled = true;
    }
    else if(tarjetadestapada == 2){
        audioMal.play();
        tarjeta2 = document.getElementById(id);
        segundoResultado = diego[id];
        tarjeta2.innerHTML = `<img src="./assets/img/${segundoResultado}.png">`;

        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Cambios: ${movimientos}`;

    }

    setTimeout(()=>{
    if(primerResultado == segundoResultado){

        //Encerrar contador targetas destapadas
        tarjetadestapada = 0;

        //Aumentar aciertos
       aciertos++;
      
       mostrarAcieros.innerHTML = `Aciertos: ${aciertos}`;
       audioAcierto.play();
       
       if(aciertos == 16){
           audioGanaste.play();
           clearInterval(tiempoRegresivoId);
           mostrarAcieros.innerHTML = `Aciertos: ${aciertos}`;
           mostrarTiempo.innerHTML = `Tiempo: &nbsp 0:${timerInicial - timer}`
           mostrarMovimientos.innerHTML = `Cambios: ${movimientos}`;
           
           //mostar ventana modal 
            modal.classList.add('modal--show');
        
           cerrarmodal.addEventListener('click', (e)=>{
            e.preventDefault();
            modal.classList.remove('modal--show');
        });
       }
    }
    else{
        //Mostar valores momentaneamente y volver a tapar
            tarjeta1.innerHTML = '';
            tarjeta2.innerHTML = '';

            tarjeta1.disabled = false;
            tarjeta2.disabled = false;

            tarjetadestapada = 0;
        
    }},1100);
}


