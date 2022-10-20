let userAddress

//elements/spans
let userWalletSpan = document.getElementById('carteira')
let balanceUsdt = document.getElementById('balanceUsdt')
let amount = document.getElementById('amount')
let store = document.getElementById('Store')
let tokenBalance = document.getElementById('tokenBalance')



//contracts
//const bank = "0xCf1B9A7cceaD435E90eBb7a905b3332e32A5507d"
const usdtContract = "0x81adB880B8c97168aB3B50f97F45a879b05e78C7"
const carFactory = "0x056B3E71d530e96e1d2a1031051735DfBfc25d97"

let products = []

//functions
const balanceOf = "function balanceOf(address) view returns (uint)"
const name = "function name() public view virtual override returns(string memory)"
const increaseAllowance = "function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool)"
const allowance = "function allowance(address owner, address spender) public view virtual override returns (uint256)"
const swap = "function swap(uint _amount, address _from) external returns(bool)"
const symbol = "function symbol() public view virtual override returns (string memory)"
const totalSupply = "function totalSupply() public view virtual override returns (uint256)"
const tokenPrice = "function tokenPrice() external view returns(uint)"

const tokenImage = "function tokenImage() external view returns(string memory)"

const tokenBank = "function tokenBank() external view returns(address)"



//car factory functions
const returnCars = "function returnCarsArray()external view returns(address[] memory)"

const createCar = "function create(string memory _name, string memory _symbol,uint _tokenPrice, uint _supply, string memory _imagem) public"

