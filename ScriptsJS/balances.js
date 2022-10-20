
async function getAllBalances(){
    await getUsdtBalance()
    await getTokensBalance()
}


async function getUsdtBalance(){
    const provider = getProvider()
    const contract = new ethers.Contract(usdtContract, [balanceOf], provider)
    const balanceToken = await contract.balanceOf(userAddress)
    balanceUsdt.innerHTML = ethers.utils.formatUnits(balanceToken.toString(), 18)
}

async function getCars(){
    const provider = getProvider()
    const contract = new ethers.Contract(carFactory, [returnCars], provider)
    products = await contract.returnCarsArray()
    console.log(products, "Array de Produtos")
    return products
}

async function getStore(){
    let allstore = await generateProductStruct()
    store.innerHTML = allstore
}

async function getTokensBalance(){
    const provider = getProvider()
    let arrBalance = []
    let arrName = []
    let isOwner = []
    console.log(products.length)
    for(i = 0; i < products.length; i++){
        let contract = new ethers.Contract(products[i], [balanceOf, symbol], provider)
        
        let balance = ethers.utils.formatEther(await contract.balanceOf(userAddress))
        if(balance > 0){
            let tksym = await contract.symbol()
            
            let bank = await tkBank(products[i])

            if( bank.toLowerCase() == userAddress.toLowerCase()){
                isOwner.push(true)
            }else{
                isOwner.push(false)
            }
            arrName.push(tksym)
            arrBalance.push(balance)
        }
        
    }
    console.log(arrBalance, arrName, "<<<<<<")

    await generateTokenBalance(arrBalance, arrName, isOwner)
}




