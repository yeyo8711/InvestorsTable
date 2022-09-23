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
    <section className="w-full flex justify-center">
      <div className="overflow-hidden w-[600px] overflow-x-auto border border-gray-100 rounded">
        <table className="min-w-full text-sm divide-y text-white divide-gray-200">
          <thead>
            <tr className=" text-[#979797f]">
              <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                Address
              </th>
              <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                Name
              </th>
              <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                Instagram
              </th>
              <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                Twitter
              </th>
              <th className="px-4 py-2 font-medium text-left whitespace-nowrap">
                Contribuition
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-white">
            {investorInfo.map((item) => (
              <UserCard
                name={item.name}
                address={
                  item.address.slice(0, 5) + ".." + item.address.slice(-5)
                }
                instagram={item.instagram}
                twitter={item.telegram}
                donation={Number(item.amount).toFixed(2)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
