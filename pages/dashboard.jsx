/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import NFT from "../engine/NFT.json";
import Market from "../engine/Market.json";
import { hhmarketaddress, hhnftaddress } from "../engine/configuration";

import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(hhmarketaddress, Market, signer)
    const data = await contract.fetchItemsListed()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))

    setNfts(items)
    setLoadingState('loaded') 
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets created</h1>;

  return (
    <Layout>
      <div className="px-4 mb-2 lg:px-0 pt-20">
        <h1 className="text-2xl font-bold text-gray-700"> My NFTs</h1>
      </div>

      <div className="grid grid-cols-1 divide-y">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <>
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <Image
                src={nft.image}
                alt="Picture of the author"
                className="rounded"
                width={250}
                height={300}
                // blurDataURL="data:..." automatically provided
                // placeholder="blur" // Optional blur-up while loading
              />

              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
              </div>
            </div>
          ))}

       
        
        </>
      </div>

      <div className="px-4 pt-6">
            {Boolean(sold.length) && (
              <div>
                <h2 className="text-2xl py-2 text-blue-700 ">Items sold</h2>
                <div className="grid  grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 pt-4">
                  {sold.map((nft, i) => (
                     <div key={i} className="w-full px-4 lg:px-0">
                     <div className="mt-[1px]   bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                       <Link href="#">
                         <img
                           className="rounded-t-lg"
                           height="100px"
                           src={nft.image||"https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80"}
                           alt="product image"
                         />
                       </Link>
                       <div className="p-5">
                         <a href="#">
                           <h2 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
                           {  nft.name || "Name of NFT"}
                           </h2>
                         </a>
                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                         {nft.description || "Description "}
                         </p>
             
                         <div className="flex justify-between items-center">
                           <span className="text-2xl font-bold text-gray-900 dark:text-white">
                           {nft.price} ETH
                           </span>
                          
                         </div>
                       </div>
                     </div>
                   </div>
                  ))}
                </div>
              </div>
            )}
          </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
