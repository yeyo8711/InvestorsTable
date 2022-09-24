import React from "react";
import redirect from "../../assets/share.png";
const UserCard = ({ index, name, address, telegram, twitter, amount }) => {
  return (
    <tr className="mb-5s">
      <td className="px-4 py-2 font-medium whitespace-nowrap">{index + 1}</td>
      <td className="px-4 py-2 font-medium whitespace-nowrap">{name}</td>
      <td className="px-4 py-2 font-medium whitespace-nowrap">{address}</td>
      <td className="px-4 py-2 font-medium whitespace-nowrap">{telegram}</td>
      <td className="px-4 py-2 font-medium whitespace-nowrap">
        {twitter !== "" ? (
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noreferrer"
            className="flex gap-1 items-center"
          >
            redirect
            <img className="w-4 h-4" src={redirect} alt="twitter-link" />
          </a>
        ) : null}
      </td>
      <td className="px-4 py-2 font-medium whitespace-nowrap">{amount} BNB</td>
      {/* <td className="px-4 py-2 font-medium whitespace-nowrap">
        <a href={`https://bscscan.com/tx/${tnx}`}>
          {tnx.slice(0, 9) + ".." + tnx.slice(-4)}
        </a>
      </td> */}
    </tr>
  );
};

export default UserCard;
