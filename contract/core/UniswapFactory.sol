pragma solidity^0.8.18;
// SPDX-License-Identifier: MIT

import "../interface/IERC20.sol";

contract UniswapFactory {

    // Variables & Event 
    event NewExchange(address indexed token, address indexed exchange);

    address public exchangeTemplate;
    uint256 public tokenCount; //생성된 총 페어 수 
    mapping(address => address) internal tokenToExchange; // 토큰 주소로부터 거래소 주소 가져오기 
    mapping(address => address) internal exchangeToToken; // 거래소 주소로부터 토큰 주소 가져오기 
    mapping(uint256 => address) internal idToToken;       // 몇번째 토큰(tokenCount)로 부터 거래소

    // Factory Functions 
    
    constructor(address _template) {
        require(_template != address(0));
        require(_template != address(0));
        exchangeTemplate = _template;
    }

    function createExchange(address _token) public returns (address) {
        require(_token != address(0));
        require(exchangeTemplate != address(0));
        require(tokenToExchange[_token] == address(0));

        UniswapExchange exchange = new UniswapExchange();
        exchange.setup(_token);

        tokenToExchange[_token] = address(exchange);
        exchangeToToken[address(exchange)] = _token;
        uint256 tokenId = tokenCount + 1;
        tokenCount = tokenId;
        idToToken[tokenId] = _token;
        
        emit NewExchange(_token, address(exchange));
        return address(exchange);
    }



    function getExchange(address _token) public view returns (address) {
        return tokenToExchange[_token];
    }

    function getToken(address _exchange) public view returns (address) {
        return exchangeToToken[_exchange];
    }

    function getTokenWithId(uint256 _tokenId) public view returns (address) {
        return idToToken[_tokenId];
    }
}

contract UniswapExchange {
    UniswapFactory factory;
    bytes32 public name;         // Uniswap V1
    bytes32 public symbol;       // UNI-V1
    uint256 public decimals;     // 18
    IERC20 token;                // address of the ERC20 token traded on this contract

      function setup(address token_addr) public {
    require( 
      address(factory) == address(0) && address(token) == address(0) && token_addr != address(0), 
      "INVALID_ADDRESS"
    );
    factory = UniswapFactory(msg.sender);
    token = IERC20(token_addr);
    name = 0x556e697377617020563100000000000000000000000000000000000000000000;
    symbol = 0x554e492d56310000000000000000000000000000000000000000000000000000;
    decimals = 18;
  }
}