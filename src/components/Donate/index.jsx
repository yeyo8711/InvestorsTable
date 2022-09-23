import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";

const Donate = () => {
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
    <section className="w-full flex justify-center mt-20">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="flex items-center gap-3 text-gray-700 text-sm font-bold mb-2"
            for="Username"
          >
            Name <p className="text-red-500 text-xs font-light">mandatory</p>
          </label>
          <input
            onChange={handleUserName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="Twitter"
          >
            Twitter
          </label>
          <input
            onChange={handleTwitter}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Twitter"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="Instagram"
          >
            Instagram
          </label>
          <input
            onChange={handleInstagram}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Instagram"
            type="text"
            placeholder="Instagram"
          />
        </div>

        <div className="mb-4 text-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Funds to donate
          </label>
          <div className="w-full flex justify-center">
            <input
              onChange={handleUserDonation}
              className="shadow appearance-none border rounded w-[40%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="funds"
              type="Number"
              min="0"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleDonation}
            disabled={!validMessage}
            className="disabled:bg-slate-500 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Send Funds
          </button>
        </div>
      </form>
    </section>
  );
};

export default Donate;
