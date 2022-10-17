async function getProductStock(address){
    const provider = getProvider()
    const contract = new ethers.Contract(address, [balanceOf], provider)
    const balance = await contract.balanceOf(bank)
    return ethers.utils.formatUnits(balance.toString(), 18)
}

async function getUserTkBalance(address){
    const provider = getProvider()
    const contract = new ethers.Contract(address,[balanceOf], provider)
    const userBalance = await contract.balanceOf(userAddress)
    return ethers.utils.formatUnits(userBalance.toString(), 18)
}

async function tkName(address){
    const provider = getProvider()
    const contract = new ethers.Contract(address, [name], provider)
    const tkname = await contract.name()
    return tkname
}

async function tkSymbol(address){
    const provider = getProvider()
    const contract = new ethers.Contract(address, [symbol], provider)
    const tksymbol = await contract.symbol()
    return tksymbol
}

async function tkTotalSupply(address){
    const provider = getProvider()
    const contract = new ethers.Contract(address, [totalSupply], provider)
    const tkTotalSupply = await contract.totalSupply()
    return ethers.utils.formatUnits(tkTotalSupply.toString(), 18)
}

async function tkPrice(address){
    const provider = getProvider()
    const contract = new ethers.Contract(address, [tokenPrice], provider)
    const tkPrice = await contract.tokenPrice()
    return tkPrice
}

async function tkImg(address){
    const provider = getProvider()
    const contract = new ethers.Contract(address, [tokenImage], provider)
    const tkimg = await contract.tokenImage()
    return tkimg
}