import React from "react";
import Banner from "../../Banner";
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
