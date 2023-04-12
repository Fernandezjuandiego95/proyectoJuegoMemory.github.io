
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




//Inicializacion de variables
let tarjetadestapada = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 5;
let tiempoRegresivo;
let tiempoInicial = tiempo;



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

let partida8 = [57,57,58,58,59,59,60,60,61,61,62,62,63,63,64,64];
    partida8 = partida8.sort(()=>{return  Math.random()-0.5});

let partida9 = [65,65,66,66,67,67,68,68,69,69,70,70,71,71,72,72];
    partida9 = partida9.sort(()=>{return  Math.random()-0.5});

let partida10 = [73,73,74,74,75,75,76,76,77,77,78,78,79,79,80,80];
    partida10 = partida10.sort(()=>{return  Math.random()-0.5});

let partida11 = [81,81,82,82,83,83,84,84,85,85,86,86,87,87,88,88,];
    partida11 = partida11.sort(()=>{return  Math.random()-0.5});

let partida12 = [89,89,90,90,91,91,92,92,93,93,94,94,95,95,96,96];
    partida12 = partida12.sort(()=>{return  Math.random()-0.5});
/**----------------------------------------------------------------------------------------------*/   
  
const azar = Math.floor(Math.random() * 12);
let mostrar = [];

    switch (azar) {
        case 0:
            mostrar = partida1;
        break;
        case 1:
            mostrar = partida2;
        break;
        case 2:
            mostrar = partida3;
        break;
        case 3:
            mostrar = partida4;
        break;
        case 4:
            mostrar = partida5;
        break;
        case 5:
            mostrar = partida6;
        break;
        case 6:
            mostrar = partida7;
        break;
        case 7:
            mostrar = partida8;
        break;
        case 8:
            mostrar = partida9;
        break;
        case 9:
            mostrar = partida10;
        break;
        case 10:
            mostrar = partida11;
        break;
        case 11:
            mostrar = partida12;
        break;
        default:
             alert("Error");
        break;
      }



function contarTiempo(){
 tiempoRegresivo = setInterval(()=>{
       tiempo--;
       mostrarTiempo.innerHTML = `Tiempo: &nbsp 0:${tiempo}`;
       if(tiempo <= 0){
          clearInterval(tiempoRegresivo);
          bloqueartargetas(mostrar);
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
        targetaBloqueada.innerHTML = `<img src="./assets/img/${mostrar[i]}.png">`;
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
      primerResultado = mostrar[id];
      tarjeta1.innerHTML = `<img src="./assets/img/${primerResultado}.png">`;
      audioClick.play();

      //desHabilitar el primer boton
      tarjeta1.disabled = true;

    }
    else if(tarjetadestapada == 2){
        audioMal.play();
        tarjeta2 = document.getElementById(id);
        segundoResultado = mostrar[id];
        tarjeta2.innerHTML = `<img src="./assets/img/${segundoResultado}.png">`;

        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Cambios: ${movimientos}`;

        //llamar la funcion tapartarjetas
        tapartarjetas();
    }
   
  
}


function tapartarjetas(){
    
    if(primerResultado != segundoResultado){
     setTimeout(() =>{
      
            tarjeta1.innerHTML = '';
            tarjeta2.innerHTML = '';

            tarjeta1.disabled = false;
            tarjeta2.disabled = false;

            tarjetadestapada = 0; 
        },800);
    }
    else{
               //Encerrar contador targetas destapadas
               tarjetadestapada = 0;

               //Aumentar aciertos
              aciertos++;
             
              mostrarAcieros.innerHTML = `Aciertos: ${aciertos}`;
              audioAcierto.play();

              if(aciertos == 8){
                audioGanaste.play();
                clearInterval(tiempoRegresivo);
                mostrarAcieros.innerHTML = `Aciertos: ${aciertos}`;
                mostrarTiempo.innerHTML = `Demora: &nbsp0:${tiempoInicial - tiempo}s`
                mostrarMovimientos.innerHTML = `Cambios: ${movimientos}`;
               
                    //mostar ventana modal 
                    modal.classList.add('modal--show');
                
                    cerrarmodal.addEventListener('click', (e)=>{
                    e.preventDefault();
                    modal.classList.remove('modal--show');
                    }); 
            }  
    }
   
   
}



