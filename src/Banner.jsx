import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { AppContext } from "./context/appContext";
import { getChainId, switchNetwork } from "./utils";

export default function Banner() {
  const [userName, setUserName] = useState("");
  const [userDonation, setUserDonation] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");

  const { contracAddress, contractABI, signer } = useContext(AppContext);
  const validMessage =
    userName.trim() !== "" && userDonation !== "" && signer !== null;

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserDonation = (e) => {
    console.log(e.target.value);
    setUserDonation(e.target.value);
  };
  const handleTwitter = (e) => {
    setTwitter(e.target.value);
  };
  const handleTelegram = (e) => {
    setTelegram(e.target.value);
  };

  const handleDonation = async () => {
    if (window.ethereum === undefined) return window.alert("Install metamask");

    try {
      console.log("try switch");
      await switchNetwork();
    } catch (error) {
      console.log("switch error");
      return window.alert(
        "Please, switch to Smart Chain Testnet to proceed with the transaction"
      );
    }

    const verifyId = async () => {
      const id = await getChainId();
      console.log("chainId if", id);
      if (id !== 97) {
        return window.alert(
          "Please, switch to Smart Chain Testnet to proceed with the transaction"
        );
      }
    };
    verifyId();

    const writeContract = new ethers.Contract(
      contracAddress,
      contractABI,
      signer
    );

    console.log(typeof userDonation.toString(), userDonation);
    console.log("0.1" === userDonation.toString());
    // ethers.utils.formatUnits(userDonation, 0)

    try {
      await writeContract.sendFunds(userName, telegram, twitter, {
        value: ethers.utils.parseEther(userDonation.toString()),
      });
    } catch (error) {
      // window.alert("Transacion rejected");
    } finally {
    }
  };

  return (
    <section className="w-full flex justify-center bg-[#0057FF] text-white">
      <div className="flex justify-around gap-7 flex-wrap max-w-screen-xl w-full py-7 sm:py-24">
        <div className="flex flex-col p-10">
          <h2 className="font-extrabold text-5xl sm:text-[60px]">
            Portal Dapp
          </h2>
          <ul className="font-bold text-lg mt-10 sm:text-[27px]">
            <li>Invest</li>
            <li>Track</li>
            <li>Network</li>
          </ul>
          <p className="pt-14">Launching Q4 2022</p>
        </div>

        <div className="max-w-[500px] w-full p-2 sm:p-5">
          <h3 className="text-2xl mb-3 text-center">
            Private Sale | Seed Round 1
          </h3>

          <div className="bg-[#0085FE] py-3 sm:p-5 w-full rounded-[20px]">
            <form className="flex flex-col gap-2 px-7 py-4 text-black">
              <input
                onChange={handleUserName}
                type="text"
                className="rounded-lg h-9 focus:outline-none p-3"
                placeholder="Full name (Required)"
              />
              <input
                onChange={handleTelegram}
                type="text"
                className="rounded-lg h-9 focus:outline-none p-3"
                placeholder="Telegram Username (Opitional)"
              />
              <input
                onChange={handleTwitter}
                type="text"
                className="rounded-lg h-9 focus:outline-none p-3"
                placeholder="Twitter Username (Opitional)"
              />

              <select
                onChange={handleUserDonation}
                className="block w-full text-gray-400 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                name="animals"
              >
                <option value="" className="text-gray-400">
                  Contribution / BNB
                </option>
                <option value="0.1">0.1 BNB</option>
                <option value="0.3">0.3 BNB</option>
                <option value="0.5">0.5 BNB</option>
                <option value="1.0">1.0 BNB</option>
                <option value="2.0">2.0 BNB</option>
                <option value="2.0">2.0 BNB</option>
              </select>
            </form>
            <div className="w-full flex justify-center mt-1">
              <button
                disabled={!validMessage}
                onClick={handleDonation}
                className="py-[6px] font-bold px-10 disabled:bg-[#525252ea] disabled:cursor-not-allowed bg-[#0057FF] hover:bg-[#003bb1]  rounded-lg text-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
