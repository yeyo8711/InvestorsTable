import React from "react";

const UserCard = ({ name, address, instagram, twitter, donation }) => {
  return (
    <tr>
      <td className="px-4 py-2 font-medium whitespace-nowrap">{address}</td>
      <td className="px-4 py-2 font-medium whitespace-nowrap">{name}</td>
      <td className="px-4 py-2 whitespace-nowrap">{instagram}</td>
      <td className="px-4 py-2 whitespace-nowrap">{twitter}</td>
      <td className="px-4 py-2 whitespace-nowrap">{donation}</td>
    </tr>
  );
};

export default UserCard;
