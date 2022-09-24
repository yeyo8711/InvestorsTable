import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext.js";
import UserCard from "../tableItem.jsx";

const Table = () => {
  const { contracAddress, contractABI } = useContext(AppContext);
  const [investorInfo, setInvestorInfo] = useState([]);

  useEffect(() => {
    if (window.ethereum === undefined) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const readContract = new ethers.Contract(
      contracAddress,
      contractABI,
      provider
    );

    const getTableData = async () => {
      const tableData = await readContract.counter();
      const loopNumber = ethers.utils.formatUnits(tableData, 0);

      for (let i = 0; i < loopNumber; i++) {
        const investorData = await readContract.investors(i);
        setInvestorInfo((prevState) => [
          ...prevState,
          {
            name: investorData.name,
            telegram: investorData.telegram,
            instagram: investorData.instagram,
            amount: ethers.utils.formatUnits(investorData.amount, 0),
            address: investorData.wallet,
          },
        ]);
      }
    };
    getTableData();
  }, []);

  return (
    <section className="w-full flex justify-center p-4">
      <div className="max-w-screen-xl w-full flex flex-col pb-20 items-center">
        <h3 className="text-center text-[34px] mb-4">
          Private Sale | Seed Round 1 Investors
        </h3>
        <div className="overflow-hidden max-w-screen-lg w-full overflow-x-auto shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-2xl p-5">
          <table className="min-w-full text-sm divide-y text-black  divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                  #
                </th>
                <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                  Wallet Address
                </th>
                <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                  Telegram
                </th>
                <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                  Twitter
                </th>
                <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                  Amount
                </th>
                <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                  Tnx
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray text-black">
              {/* {investorInfo.map((item) => (
                <UserCard
                index={index}
                name={item.name}
                address={item.address}
                instagram={item.telegram}
                twitter={item.twitter}
                amount={Number(item.amount).toFixed(2)}
                tnx={item.tnx}
              />
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
