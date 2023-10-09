import { useEffect, useState } from "react";
import Image from 'next/image';
import uniswapLogo from '@/image/uniswap.png';
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ethLogo from '@/image/eth.png';
import { ethers, InfuraProvider } from "ethers";
import { Web3Provider } from "@ethersproject/providers";;
import Web3 from "web3";

const style = {
    wrapper: `p-4 w-screen flex justify-between items-center`,
    headerLogo: `flex w-1/4 items-center justify-start`,
    nav: `flex-1 flex justify-center items-center`,
    navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
    navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
    activeNavItem: `bg-[#20242A]`,
    buttonsContainer: `flex w-1/4 justify-end items-center`,
    button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
    buttonPadding: `p-2`,
    buttonTextContainer: `h-8 flex items-center`,
    buttonIconContainer: `flex items-center justify-center w-8 h-8`,
    buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
  }

declare global {
  interface Window {
    ethereum?: any
  }
}

const Header = () => {
    const [selectedNav, setSelectedNav] = useState('swap')
    const [account, setAccount] = useState<string>()

    const connectWallet = async() => {
      if(window.ethereum !== 'undefined') {
        try {
          const res = await window.ethereum.request({
            method : "eth_requestAccounts",
          })
          setAccount(res[0]);
        } catch (error) {
          console.error('install metamask', error);
        }
      }
    };
    
    return(
      <div className={style.wrapper}>
        <div className={style.headerLogo}>
          <Image src={uniswapLogo} alt="uniswap" height={40} width={40} />
        </div>
        <div className={style.nav}>
          <div className={style.navItemsContainer}>
            <div 
              onClick={() => setSelectedNav('swap')}
              className={`${style.navItem} ${
                selectedNav == 'swap' && style.activeNavItem
              }`}
            >
              Swaps
            </div>
            <div
              onClick={() => setSelectedNav('pool')}
              className={`${style.navItem} ${
                selectedNav == 'pool' && style.activeNavItem
              }`}
            >
              Pools
            </div>
            <div
              onClick={() => setSelectedNav('vote')}
              className={`${style.navItem} ${
                selectedNav == 'vote' && style.activeNavItem
              }`}
            >
              Vote
            </div>
            <a
              href="https://info.uniswap.org/#/"
              target="_blank"
              rel="norefferer"
            >
              <div className={style.navItem}>
                Charts <FiArrowUpRight/>
              </div>
            </a>
          </div>
        </div>
        <div className={style.buttonsContainer}>
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={style.buttonIconContainer}>
              <Image src={ethLogo} alt="ethlogo" height={20} width={20}/>
            </div>
            <p>Ethereum</p>
            <div className={style.buttonIconContainer}>
              <AiOutlineDown/>
            </div>
          </div>
          <div
            onClick={() => connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
              {account ? (
                <div>
                  <p>{account.substring(0,6) + '...' + account.slice(-4)}</p>
                </div>
              ) : (
                <div>
                  Connect Wallet
                </div>
              )}
            </div>
          </div>
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={`${style.buttonIconContainer} mx-2`}>
              <HiOutlineDotsVertical/>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header;

{/* <header className={style.wrapper}>
        <div className={style.headerLogo}>
          <Image src={uniswapLogo} alt="uniswap" height={40} width={40} />
        </div>
        <div className={style.nav}>
          <div className={style.navItemsContainer}>
            <div onClick={() => setSelectedNav('swap')} className={`${style.navItem} ${selectedNav == 'swap' && style.activeNavItem}`}>
              Swaps
            </div>
            <div onClick={() => setSelectedNav('pool')} className={`${style.navItem} ${selectedNav == 'swap' && style.activeNavItem}`}>
              Pools
            </div>
          </div>
        </div>
        <div className={style.buttonsContainer}>
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={style.buttonIconContainer}>
              <Image src={ethLogo} alt="ethlogo" height={20} width={20}/>
            </div>
            <p>Ethereum</p>
            <div className={style.buttonIconContainer}>
              <AiOutlineDown/>
            </div>
            <div onClick={() => connectWallet()} className={`${style.button} ${style.buttonPadding}`}>
              <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                Connect Wallet
              </div>
              <div className={`${style.button} ${style.buttonPadding}`}>
                <div  className={`${style.buttonIconContainer} mx-2`}>
                  <HiOutlineDotsVertical/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}

