

let userAddress

//elements/spans
let userWalletSpan = document.getElementById('carteira')
let balanceUsdt = document.getElementById('balanceUsdt')
let amount = document.getElementById('amount')
let store = document.getElementById('Store')






//contracts
const bank = "0xCf1B9A7cceaD435E90eBb7a905b3332e32A5507d"
const usdtContract = "0xfc90B78e4158F0fF53e519c41dED2dd30aC5B674"
const AUC01Contract = "0xFA033f5b5eB9F882A68f0ed836e4f72783f35269"
const AUC02Contract = "0xf0E9a6fB5da7da078b181C86Ee94a2fECD55FFAc"
const AUC03Contract = "0xe70911e5a512FD93A03E0B6e3c73F7E911a0F244"

let products = [AUC01Contract, AUC02Contract, AUC03Contract]

//functions
const balanceOf = "function balanceOf(address) view returns (uint)"
const name = "function name() public view virtual override returns(string memory)"
const increaseAllowance = "function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool)"
const allowance = "function allowance(address owner, address spender) public view virtual override returns (uint256)"
const swap = "function swap(uint _amount, address _from) external returns(bool)"
const symbol = "function symbol() public view virtual override returns (string memory)"
const totalSupply = "function totalSupply() public view virtual override returns (uint256)"
const tokenPrice = "function tokenPrice() external view returns(uint)"






async function login(){
    let accounts = await ethereum.request({method: 'eth_requestAccounts'})
    userAddress = accounts[0]
    userWalletSpan.innerHTML = userAddress
    await getUsdtBalance()
    await getStore()
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

async function getUsdtBalance(){
    const provider = getProvider()
    const contract = new ethers.Contract(usdtContract, [balanceOf], provider)
    const balanceToken = await contract.balanceOf(userAddress)
    balanceUsdt.innerHTML = ethers.utils.formatUnits(balanceToken.toString(), 18)
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
    while(true){
        const rtx = await contractSigner.allowance(userAddress, address)
        console.log("Processando")
        if(rtx["_hex"] != "0x00"){
            console.log("PERMISSÃO EM USDT APROVADA!!!")
            break
        }
    }
    return tx
}

async function enviarUsdt(address, count, price){
    await permissaoUsdt(address, count, price)

    const provider = getProvider()
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, [swap], provider)
    const contractSigner = contract.connect(signer)
    const amount = document.getElementById("amount" + count)
    console.log(amount.value, "aquiiiiiiiiiii")
    console.log(userAddress)
    const tx = await contractSigner.swap(ethers.utils.parseEther(amount.value), userAddress)

    console.log(tx)
}




async function getStore(){
    let allstore = await generateProductStruct()
    store.innerHTML = allstore
}

async function generateProductStruct(contracts = products){
    let count = contracts.length
    console.log(count + "AQUI TA O COUNT")
    console.log(contracts[0])
    let strmessage = ""
    for(let i = 0; i < count; i++){
        strmessage += `<br><div id="produto"> <h1>Contrato: <span id="contract${i}">${contracts[i]}</span></h1>
        <h2>Simbolo: <span id="tokenSymbol">${await tkSymbol(contracts[i])}</span></h2>
        <h2>Nome: <span id="tokenName">${await tkName(contracts[i])}</span></h2>
        <h2>Supply: <span id="totalSupply">${await tkTotalSupply(contracts[i])}</span></h2>
        <h2>Total disponivel a venda: <span id="totalForSale">${await getProductStock(contracts[i])}</span></h2>
        <h2>Preço por token: <span id="tokenPrice">${await tkPrice(contracts[i])}</span></h2>
        <h2>Saldo ${await tkSymbol(contracts[i])}: <span id="userBalance">${await getUserTkBalance(contracts[i])}</span></h2>
        <h2>Comprar ativos <br> Quantidade: <input type="text" id="amount${i}">  <button onclick="enviarUsdt('${contracts[i]}', ${i}, ${await tkPrice(contracts[i])})">Enviar</button></h2>
        
        </div><br>
        `
    }
    console.log(strmessage, "AQUIIIIIIIIIIIIIII")
    return strmessage
}


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