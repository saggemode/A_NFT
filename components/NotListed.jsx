import React from "react";
import Layout from "./Layout";

const NotListed = () => {
  return (
    <Layout>
      <div className="flex justify-center pt-20">
        <div className="w-1/2 flex flex-col pb-12">
        <h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>
        </div>
      </div>
    </Layout>
  );
};

export default NotListed;
