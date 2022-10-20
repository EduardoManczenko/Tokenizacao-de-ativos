let newNome = document.getElementById('newNome')
let newSymbol = document.getElementById('newSymbol')
let newImg = document.getElementById('newImg')
let newPrice = document.getElementById('newPrice')
let newSupply = document.getElementById('newSupply')

async function mintCar(){
    const provider = getProvider()
    const signer = provider.getSigner()
    const contract = new ethers.Contract(carFactory, [createCar], provider)
    const contractSigner = contract.connect(signer)
    const create = await contractSigner.create(newNome.value, newSymbol.value, newPrice.value, newSupply.value, newImg.value)
    
    await create.wait(1)

    //provider.waitForTransaction(create.hash, 1, 150000)


    //Promise.all([variavel]).then(res => console.log(res[0].logs[0].address))
    
   //TODO: PERMISSAO DEPOIS QUE A TRANSAÇÃO FOR MINEIRADA
    console.log(create.hash)
    const receip = await provider.getTransactionReceipt(create.hash.toString())
    console.log(create.log)

    console.log(receip)
    
    let add = ''
    await Promise.all([receip]).then(res => add = res[0].logs[0].address)
    console.log(add, "aqyuu")
    await permToBank(add)
}

async function permToBank(address){
    const provider = getProvider()
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, [increaseAllowance], provider)
    const contractSigner = contract.connect(signer)
    const perm = await contractSigner.increaseAllowance(address, ethers.utils.parseUnits(newSupply.value))
    console.log(perm)
}