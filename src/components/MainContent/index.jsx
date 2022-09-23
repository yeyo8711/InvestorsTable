import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import Donate from "../Donate";
import Table from "../Table";

const Main = () => {
  return (
    <div className="bg-[#041927] min-h-screen flex flex-col justify-start gap-10">
      <Donate />
      <Table />
    </div>
  );
};
export default Main;
