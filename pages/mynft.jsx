/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import Market from "../engine/Market.json";
import { hhmarketaddress, hhnftaddress } from "../engine/configuration";

import Layout from "../components/Layout";
import Link from "next/link";
import NotListed from "../components/NotListed";

const MyNft = () => {
  const [nfts, setNfts] = useState([]);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");
  const router = useRouter()
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    getNFTData();
  }, []);



  async function getNFTData() {
    let sumPrice = 0;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    let contract = new ethers.Contract(hhmarketaddress, Market, signer);
    let transaction = await contract.fetchMyNFTs();

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
          tokenURI
        };
        sumPrice += Number(price);
        return item;
      })
    );

    setNfts(items);
    setLoadingState("loaded");
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  function listNFT(nft) {
    console.log('nft:', nft)
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
  }

  if (loadingState === "loaded" && !nfts.length) return <NotListed />;
  return (
    <Layout>
      <div className="grid  grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2  pt-20">
        <div className="mb-5">
          <h2 className="font-bold">Wallet Address</h2>
          {address}

          <h2 className="font-bold">No. of NFTs</h2>
          {nfts.length}

          <h2 className="font-bold">Total Value</h2>
                        {totalPrice} ETH
        </div>

        {nfts.map((nft, i) => (
          <div key={i} className="w-full px-4 lg:px-0">
            <div className="mt-[1px]   bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <Link href="#">
                <img
                  className="rounded-t-lg"
                  height="100px"
                  src={
                    nft.image ||
                    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80"
                  }
                  alt="product image"
                />
              </Link>
              <div className="p-5">
                <a href="#">
                  <h2 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {nft.name || "Name of NFT"}
                  </h2>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {nft.description || "Description "}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {nft.price} ETH
                  </span>
                  <button
                  onClick={() => listNFT(nft)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    List NFT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default MyNft;
