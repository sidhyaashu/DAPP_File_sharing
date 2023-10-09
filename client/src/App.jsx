import "./App.css";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal";
import Display from "./components/Display";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const loadProvider = async() =>{
      if(provider){
        window.ethereum.on("chainChanged", () =>{
          window.location.reload();
        })
        window.ethereum.on("accountsChanged", () =>{
          window.location.reload();
        })

        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        )

        setContract(contract)
        setProvider(provider)
      }else{
        console.error("Metamast is not installed")
      }
    }

    provider && loadProvider()
  },[])

  return (
    <>
      <div className="App">
        <h1>ShareME 3.0</h1>
        <p>Account: {" "+account? account : "Account not conected"}</p>

        <FileUpload
        account={account}
        provider={provider}
        contract={contract}
        />
      </div>
    </>
  );
}

export default App;
