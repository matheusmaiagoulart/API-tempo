/*DECLARAÇÃO DE VARIAVEIS */
let fundoImg = document.querySelector("#fnd");
let buscarBtn = document.querySelector("#buscar-btn");
let minmax = document.querySelector(".minmax");
const key = "e28013171551494ae81674c8cb4c617e"; //Código da API OpenWeather
const hoje = new Date();
let horaLocal = hoje.getHours();
//Função para mudar a imagem de fundo, mas só funciona corretamente para o Brasil
function alterarfundo(situacao){
   
     if(situacao == "nublado"){
        fundoImg.style.backgroundImage = 'url(IMG/noite-nublada.jpg)';
        minmax.style.color = '#fff';
    } else if(situacao == "céu limpo" || "nuvens dispersas"){
        if(horaLocal > 7 && horaLocal < 16){
            fundoImg.style.backgroundImage = 'url(IMG/wpp.ceu.jpeg)';
        } else if (horaLocal > 16 && horaLocal < 19){
            fundoImg.style.backgroundImage = 'url(IMG/anoitecer-sem-nuvens.jpg)';
        }
        else{
            fundoImg.style.backgroundImage = 'url(IMG/ceu-noite-limpo.jpg)';
        }
        
    }
}

//Alterar HTML para se ajustar aos dados que o usuário solicitou
function adicionarDadosTela(dados){
    document.querySelector("#cidade").innerHTML = dados.name;
    document.querySelector("#temp").innerHTML = Math.floor(dados.main.temp) + "°C";
    let situacao = document.querySelector("#situacao").innerHTML = dados.weather[0].description;
    document.querySelector("#max-temp").innerHTML = Math.floor(dados.main.temp_max) + "°";
    document.querySelector("#min-temp").innerHTML = Math.floor(dados.main.temp_min) + "°";
    document.querySelector(".img-tempo").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
     alterarfundo(situacao);
}

//Função de pesquisar a ciadade desejada pelo usuário e retornar as infos
async function buscarCidade(cidade){
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());
    console.log(dados);
    adicionarDadosTela(dados);
}



//Função de capturar cidade
buscarBtn.addEventListener('click', () =>{

    let cidade = document.querySelector("#buscar-input").value;
    buscarCidade(cidade)

});