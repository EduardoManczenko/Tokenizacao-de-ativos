async function login(){
    let accounts = await ethereum.request({method: 'eth_requestAccounts'})
    userAddress = accounts[0]
    userWalletSpan.innerHTML = userAddress
    try{
        await getUsdtBalance()
        await getCars()
        await getTokensBalance()
        await getStore()
    }catch{

    }
    
    
   
}

function getProvider(){
    if(!window.ethereum){
        console.log("Sem metamask instalada")
    }else{
        console.log("Processando...")
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return provider
}


async function permissaoUsdt(address, count, price){
    const provider = getProvider()
    const signer = provider.getSigner()
    
    const contract = new ethers.Contract(usdtContract, [increaseAllowance, allowance], provider)
    
    contractSigner = contract.connect(signer)
    console.log(address, "AQUIIIII")
    
    const amount = document.getElementById("amount" + count)
    console.log(amount)
    const tx = await contractSigner.increaseAllowance(address, ethers.utils.parseUnits((amount.value * price).toString()))
    console.log(tx)
    
    await tx.wait(1)
    
    return tx
}

async function enviarUsdt(address, count, price){
    const tax = document.getElementById(`tax${count}`)
    tax.innerHTML = "Aguarde 1 de 2 transaçoes..."

    await permissaoUsdt(address, count, price)

    const provider = getProvider()
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, [swap], provider)
    const contractSigner = contract.connect(signer)
    const amount = document.getElementById("amount" + count)
    tax.innerHTML = "Aguarde 2 de 2 transaçoes..."

    const tx = await contractSigner.swap(ethers.utils.parseEther(amount.value), userAddress)

    await tx.wait(1)
    tax.innerHTML = "Concluido!"

    console.log(tx)
}




