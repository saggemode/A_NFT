import { ethers } from "ethers";
import NftCard from "../components/NftCard";
import Layout from "../components/Layout";
import axios from "axios";
import Web3Modal from "web3modal";

import Market from "../engine/Market.json";
import { useEffect, useState } from "react";
//import { cipherHH, simpleCrypto } from "../engine/configuration";
import { hhmarketaddress } from "../engine/configuration";

import NotListed from "../components/NotListed";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [message, updateMessage] = useState("");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(hhmarketaddress, Market, signer);
    let transaction = await contract.fetchMarketItems();

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
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNFT(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(hhmarketaddress, Market, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();

    loadNFTs();
  }

  if (loadingState === "loaded" && !nfts.length) return <NotListed />;

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2  pt-20">
        {nfts.map((nft, i) => (
          <NftCard nft={nft} key={i} buyNFT={buyNFT} message={message}></NftCard>
        ))}
      </div>
    </Layout>
  );
}
