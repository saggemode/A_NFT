import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import Web3Modal from "web3modal";

import Market from "../engine/Market.json";
import { hhmarketaddress } from "../engine/configuration";

export default function ResellNFT() {
  const [formInput, updateFormInput] = useState({ price: "", image: "" });
  const [message, updateMessage] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;
  const { image, price } = formInput;

  useEffect(() => {
    fetchNFT();
  }, [id]);

  async function fetchNFT() {
    if (!tokenURI) return;
    const meta = await axios.get(tokenURI);
    updateFormInput((state) => ({ ...state, image: meta.data.image }));
  }

  async function listNFTForSale() {
    if (!price) return;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const priceFormatted = ethers.utils.parseUnits(formInput.price, "ether");
    let contract = new ethers.Contract(hhmarketaddress, Market, signer);
    let listingPrice = await contract.getListingPrice();

    listingPrice = listingPrice.toString();
    let transaction = await contract.resellToken(id, priceFormatted, {
      value: listingPrice,
    });
    await transaction.wait();
    alert("Successfully List your NFT to the Market!");
    updateMessage("");
    router.push("/");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
      <input
            placeholder="Min 0.001 ETH"
            className="mt-8 border rounded p-4"
            step="0.001"
            type="number"
            value={formInput.price}
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
       
        {image && <img className="rounded mt-4" width="350" src={image} />}
        <div className="text-green text-center">{message}</div>
        <button
          onClick={listNFTForSale}
          className=" mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          List NFT
        </button>
      </div>
    </div>
  );
}
