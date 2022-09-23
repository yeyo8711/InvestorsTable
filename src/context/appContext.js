import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { chainIds } from "../constants/chainId";
import { getChainId } from "../utils";
import abi from "../contracts/abi.json";

// import {} from "../contracts/abi.json" secondary abi

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const contracAddress = "0x8D07641F09Af613Efd1BD1E10B5669719DD3Ff8D";

  console.log(abi);

  // const staticProvider = new ethers.providers.JsonRpcProvider(); // const staticContract = new ethers.Contract(`address`, abi, `provider`);
  const contractABI = abi;
  const [userAddress, setUserAddress] = useState(null);
  const [netWork, setNetwork] = useState("Ethereum");
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    /**Get the network on page load (even if the user is not connected) */
    const getId = async () => {
      const id = await getChainId();
      setNetwork(chainIds[id].toUpperCase());
    };
    getId();

    /**Listen to changes in the network and sets the new value */
    window.ethereum.on("chainChanged", (chainId) => {
      setNetwork(chainIds[+chainId]);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        userAddress,
        setUserAddress,
        netWork,
        setNetwork,
        signer,
        setSigner,
        contractABI,
        contracAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
