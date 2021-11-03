import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const MyTWITTER_HANDLE = 'gabyBabuchi';
const MyTWITTER_LINK = `https://twitter.com/${MyTWITTER_HANDLE}`;

const App = () => {
  //a state variable to store our user's public wallet
  const [currentAccount, setCurrentAccount] = useState(null);

  //action that will run on component load
  const checkIfWalletIsConnected = async () => {
    //check if we have access to window.ethereum
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        return;
      }
      else {
        console.log('We have the ethereum object', ethereum);


        //check if we're authorized to access the user's wallet
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        //an user can have multiple authorized accounts, we grab the first one if its there
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found and authorized account:', account);
          setCurrentAccount(account);
        }
        else {
          console.log('No authorized account found');
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      //request access to account.

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      //print authorized wallet
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch (error) {
      console.log(error);
    }
  };

  //run our function when the page loads
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Is the final countdown ⚔️</p>
          <p className="sub-text">Team up to defeat the greatest of all series!</p>
          <div className="connect-wallet-container">
            <img
              src="https://c.tenor.com/lvFeGllZtX0AAAAC/friends-ross.gif"
              alt="Monty Python Gif"
            />
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWalletAction}
            >
              Connect Wallet to Get Started
            </button>
          </div>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={MyTWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Built by @${MyTWITTER_HANDLE}`}</a>

          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
