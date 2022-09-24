import React, { useContext } from "react";
import Banner from "../../Banner";
import { AppContext } from "../../context/appContext";
import Donate from "../Donate";
import Table from "../Table";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col justify-start gap-10">
      <Banner />
      <Table />
    </div>
  );
};
export default Main;
