async function generateProductStruct(contracts = products){
    let count = contracts.length
    console.log(count + "AQUI TA O COUNT")
    console.log(contracts[0])
    let strmessage = ""
    for(let i = 0; i < count; i++){
        strmessage += `   
        <div id="produto"> 
            <img src="${await tkImg(contracts[i])}" alt="">
            <h1>Contrato: <span id="contract${i}">${contracts[i].toLowerCase()}</span></h1>
            <h1>Owner: <span id="tokenBank">${await tkBank(contracts[i])}</span></h1>
            <h2>Simbolo: <span id="tokenSymbol">${await tkSymbol(contracts[i])}</span></h2>
            <h2>Nome: <span id="tokenName">${await tkName(contracts[i])}</span></h2>
            <h2>Supply: <span id="totalSupply">${await tkTotalSupply(contracts[i])}</span></h2>
            <h2>Total disponivel a venda: <span id="totalForSale">${await getProductStock(contracts[i], await tkBank(contracts[i]))}</span></h2>
            <h2>Preço por token (USD): <span id="tokenPrice">${await tkPrice(contracts[i])}</span></h2>
            <h2>Saldo ${await tkSymbol(contracts[i])}: <span id="userBalance">${await getUserTkBalance(contracts[i])}</span></h2>
            <h2>Comprar ativos: <br> Quantidade: <input type="text" id="amount${i}">  <button onclick="enviarUsdt('${contracts[i]}', ${i}, ${await tkPrice(contracts[i])})">Enviar</button></h2>
            <h3 id="tax${i}"></h3>
        </div>
        `
    }
    console.log(strmessage)
    return strmessage
}

async function generateTokenBalance(arrBalance, tkName, isOwner){
    let balance = ""
    let userTokenSale = ""
    for(i = 0; i < arrBalance.length; i++){
        if(isOwner[i] == false){
            balance +=`<li>${tkName[i]} : ${arrBalance[i]}</li>`
        }else{
            userTokenSale += `<li>${tkName[i]} : ${arrBalance[i]}</li>`
        }
        
    }
    tokenToSale.innerHTML = userTokenSale
    tokenBalance.innerHTML = balance
}