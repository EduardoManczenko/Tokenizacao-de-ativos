let userAddress

//elements/spans
let userWalletSpan = document.getElementById('carteira')
let balanceUsdt = document.getElementById('balanceUsdt')
let amount = document.getElementById('amount')
let store = document.getElementById('Store')
let tokenBalance = document.getElementById('tokenBalance')



//contracts
const bank = "0xCf1B9A7cceaD435E90eBb7a905b3332e32A5507d"
const usdtContract = "0x81adB880B8c97168aB3B50f97F45a879b05e78C7"
const carFactory = "0xdeC45d387E555569D01bF3463D0219dDE3afF06d"

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


//car factory functions
const returnCars = "function returnCarsArray()external view returns(address[] memory)"

const createCar = "function create(string memory _name, string memory _symbol,uint _tokenPrice, uint _supply, string memory _imagem) public returns(address)"

const returnLastCar = "function returnLastCreate() public view returns(address)"