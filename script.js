<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>

  let web3;
  let contract;

  const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS"; // Replace with deployed address
  const contractABI = [ /* Add your contract ABI here */ ]; // Replace with your ABI

  async function connectWallet() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);
      alert("Wallet Connected");
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function mintNFT(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const donationAmount = web3.utils.toWei("0.01", "ether");

    // Generate NFT metadata and tokenURI
    const tokenURI = "YOUR_NFT_METADATA"; // Example placeholder

    try {
      await contract.methods.mintNFT(tokenURI).send({
        from: accounts[0],
        value: donationAmount
      });
      alert("NFT Minted Successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
    }
  }

  // Event Listeners
  document.getElementById('connectWallet').addEventListener('click', connectWallet);
  document.getElementById('mintForm').addEventListener('submit', mintNFT);