

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
    console.log(create)
}