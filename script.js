//Variaveis iniciais

let carteira = 30;
let qtdAgua = 5;

let waterBuyPrice = 1;
let waterSellPrice = 2;
let valorFuncionario1 = 30;
let bikeBuyPrice = 50;

let saleChance = 0.2;

let boolSaleChance = false;

let local = "Loja";
let select = document.getElementById('local')
let option = select.options[select.selectedIndex]


//Funções

//Funções auxiliares

function delay(n){
    return new Promise(function(resolve){
        DisableButtons()
        setTimeout(resolve,n*1000);
    });
}

function delayFuncionario(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

function showFuncionario1() {
    if(carteira>= valorFuncionario1){ 
        document.getElementById("funcionario1").removeAttribute("hidden") 
    }
}

//Funções de clicks

async function GetSomething() {
    console.log("Procurando algo")
        await delay(10)

        carteira = carteira + (Math.random().toFixed(2)*0.5)

        console.log("Encontrou algo")

        console.log("carteira: "+ carteira)
        ShowAll()
}

async function ComprarAgua() {
    if(carteira<=0 || carteira<waterBuyPrice) {
        console.log("Não é possivel comprar mais agua")
    } else {
        console.log("Comprando agua")
        await delay(2)

        carteira = carteira-waterBuyPrice
        qtdAgua = qtdAgua+1

        console.log("Comprou a agua com sucesso")
    }
        console.log("carteira:"+carteira +"|" + "Quantidade de agua:"+qtdAgua)
        ShowAll()
}

async function VenderAgua() {
    if(qtdAgua<=0) {
        console.log("Não é possivel vender mais agua")
    } else {
        console.log("Procurando comprador")
        await delay(5)

        if (Math.random() <= saleChance) {
            carteira = carteira+waterSellPrice
            qtdAgua = qtdAgua-1

            boolSaleChance = false

            console.log("Vendeu a agua com sucesso")
        } else {
            console.log("Não conseguiu vender " + boolSaleChance)
        }

        
    }
        console.log("carteira:"+carteira +"|" + "Quantidade de agua:"+qtdAgua)
        ShowAll()
}

async function MudarLocal() {
    select = document.getElementById('local')
    option = select.options[select.selectedIndex]
    local = option.text
    document.getElementById("running").removeAttribute("hidden") 

    switch (local) {
        case "Loja": 
            console.log("Partiu Loja")
            await delay(3)

            waterBuyPrice = 1;
            waterSellPrice = 2;

            saleChance = 0.2;

            break;

        case "Semaforo":
            console.log("Partiu Semaforo")
            await delay(10)

            waterBuyPrice = 3.75;
            waterSellPrice = 4;

            saleChance = 0.8;

            break;
        
        case "Praia":
            console.log("Partiu Praia")
            await delay(15)

            waterBuyPrice = 4.5;
            waterSellPrice = 5;

            saleChance = 0.6;

            break;

        default: 
            console.log("Nenhum lugar encontrado")
            break;
    }
    ShowAll()
}

async function ContratarFuncionario() {
    if(carteira<100) {
        console.log("Sem dinheiro para contratar")
    } else {
        console.log("Funcionario Contratado")
        document.getElementById("btnContratarFuncionario").setAttribute("disabled","disabled")
        carteira = carteira-valorFuncionario1
        ShowAll()
        
        for(let i=0; i < qtdAgua; i++) {
            await delayFuncionario(5)

            carteira = carteira + waterSellPrice*0.3

            console.log("Funcionario vendeu uma agua por: "+ waterSellPrice + " você ganhou: "+ waterSellPrice*0.3)
            
            document.getElementById("wallet").innerHTML = '$'+ carteira.toFixed(2).replace(".",",")
        }
        
        console.log("Funcionario tudo: "+ carteira)
        document.getElementById("btnContratarFuncionario").removeAttribute("disabled")
        ShowAll()
    }
}

//Funções dentro dos clicks

function EnableButtons() {
    document.getElementById("btnBuyWater").removeAttribute("disabled")
    document.getElementById("btnSellWater").removeAttribute("disabled") 
    document.getElementById("local").removeAttribute("disabled") 
    document.getElementById("btnGetSomething").removeAttribute("disabled") 
}

function DisableButtons() {
    document.getElementById("btnBuyWater").setAttribute("disabled","disabled")
    document.getElementById("btnSellWater").setAttribute("disabled","disabled") 
    document.getElementById("local").setAttribute("disabled","disabled") 
    document.getElementById("btnGetSomething").setAttribute("disabled","disabled") 
}

function ChangePrices() {
    document.getElementById("waterBuyPrice").innerHTML = ' $'+ waterBuyPrice.toFixed(2).replace(".",",")
    document.getElementById("waterSellPrice").innerHTML = ' $'+ waterSellPrice.toFixed(2).replace(".",",")
}

function ShowAll() {
    document.getElementById("wallet").innerHTML = '$'+ carteira.toFixed(2).replace(".",",")
    document.getElementById("water").innerHTML = 'Quantidade: '+ qtdAgua
    document.getElementById("valorFuncionario1").innerHTML = '$'+ valorFuncionario1
    document.getElementById("bikeBuyPrice").innerHTML = '$'+ bikeBuyPrice
    document.getElementById("running").setAttribute("hidden","hidden")
    ChangePrices()
    EnableButtons()
    showFuncionario1()
}

//Execução de função

ShowAll()
