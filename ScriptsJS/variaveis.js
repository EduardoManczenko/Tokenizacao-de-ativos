let userAddress

//elements/spans
let userWalletSpan = document.getElementById('carteira')
let balanceUsdt = document.getElementById('balanceUsdt')
let amount = document.getElementById('amount')
let store = document.getElementById('Store')
let tokenBalance = document.getElementById('tokenBalance')



//contracts
const bank = "0xCf1B9A7cceaD435E90eBb7a905b3332e32A5507d"
const usdtContract = "0xfc90B78e4158F0fF53e519c41dED2dd30aC5B674"
const carFactory = "0x8CF0B561Bc67aA22D9A26A6cbb4F5e52F3d72a3E"

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