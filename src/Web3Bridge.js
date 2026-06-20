import { useState } from 'react';
import { ethers } from 'ethers';

export default function Web3Bridge() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAddress(accounts[0]);
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet!");
    }
  };

  const readBalance = async () => {
    if (!address) return alert("Connect wallet first!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const rawBalance = await provider.getBalance(address);
    const formattedBalance = ethers.formatEther(rawBalance);
    setBalance(formattedBalance);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Web3 Bridge Demo</h2>

      {!address ? (
        <button onClick={connectWallet} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Connect Wallet
        </button>
      ) : (
        <p>Connected: <strong>{address.substring(0, 6)}...{address.slice(-4)}</strong></p>
      )}

      <br /><br />

      {address && (
        <div>
          <button onClick={readBalance} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Read Balance
          </button>
          {balance && <p style={{ marginTop: '10px' }}>Wallet Balance: <strong>{balance} ETH</strong></p>}
        </div>
      )}
    </div>
  );
}
