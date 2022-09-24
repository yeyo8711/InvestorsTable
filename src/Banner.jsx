import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { AppContext } from "./context/appContext";

export default function Banner() {
  const [userName, setUserName] = useState("");
  const [userDonation, setUserDonation] = useState(0);
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const validMessage = userName.trim() !== "" && userDonation !== 0;

  const { contracAddress, contractABI, signer } = useContext(AppContext);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserDonation = (e) => {
    setUserDonation(Number(e.target.value));
  };
  const handleTwitter = (e) => {
    setTwitter(e.target.value);
  };
  const handleInstagram = (e) => {
    setInstagram(e.target.value);
  };

  const handleDonation = async () => {
    const writeContract = new ethers.Contract(
      contracAddress,
      contractABI,
      signer
    );
    try {
      await writeContract.sendFunds(userName, twitter, instagram, {
        value: userDonation,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInstagram("");
      setTwitter("");
      setUserDonation("");
      setUserName("");
    }

    // console.log(userName, twitter, instagram, userDonation);
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
                type="text"
                className="rounded-lg h-9 focus:outline-none p-3"
                placeholder="Full name (Required)"
              />
              <input
                type="text"
                className="rounded-lg h-9 focus:outline-none p-3"
                placeholder="Telegram Username (Opitional)"
              />
              <input
                type="text"
                className="rounded-lg h-9 focus:outline-none p-3"
                placeholder="Twitter Username (Opitional)"
              />

              <select
                class="block w-full text-gray-400 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                name="animals"
              >
                <option value="" className="text-gray-400">
                  Contribution / BNB
                </option>
                <option value="dog">0.2 BNB</option>
                <option value="cat">0.3 BNB</option>
                <option value="hamster">0.5 BNB</option>
                <option value="parrot">1.0 BNB</option>
                <option value="spider">2.0 BNB</option>
                <option value="goldfish">3.0 BNB</option>
              </select>
            </form>
            <div className="w-full flex justify-center mt-1">
              <button className="py-[6px] font-bold px-10 bg-[#0057FF] hover:bg-[#003bb1]  rounded-lg text-md">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
