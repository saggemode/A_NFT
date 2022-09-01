/* eslint-disable @next/next/no-img-element */
import React from "react";
import Layout from "./Layout";

const Card = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 pt-20 ">
      <div className="w-full px-4 lg:px-0">
        <div className="p-3 bg-white rounded    border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="">
            <div className="relative w-full mb-3 h-62 lg:mb-0">
              <img
                src="https://cdn.pixabay.com/photo/2018/02/25/07/15/food-3179853__340.jpg"
                alt="Just a flower"
                className="object-fill w-full h-full rounded"
              />
            </div>
            <div className="flex-auto p-2 justify-evenly">
              <div className="flex flex-wrap ">
                <div className="flex items-center justify-between w-full min-w-0 ">
                  <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                    Fresh butter 100Kg
                  </h2>
                </div>
              </div>
              <div className="mt-1 text-xl font-semibold">$3.00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-0">
        <div className="p-3 bg-white   rounded-xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="">
            <div className="relative w-full mb-3 h-62 lg:mb-0">
              <img
                src="https://cdn.pixabay.com/photo/2016/08/22/19/49/yogurt-1612787__340.jpg"
                alt="Just a flower"
                height="100px"
                className="object-fill w-full h-full rounded"
              />
            </div>
            <div className="flex-auto p-2 justify-evenly">
              <div className="flex flex-wrap ">
                <div className="flex items-center justify-between w-full min-w-0 ">
                  <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900 text-1xl font-bold tracking-tight text-gray-900 dark:text-white ">
                    Fresh Tomatoes 500kg
                  </h2>
                </div>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <div className="flex justify-between items-center">
                <span className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">$599</span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:px-0">
        <div className="p-3 bg-white rounded shadow-md">
          <div className="">
            <div className="relative w-full mb-3 h-62 lg:mb-0">
              <img
                src="https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552__480.jpg"
                alt="Just a flower"
                className="object-fill w-full h-full rounded"
              />
            </div>
            <div className="flex-auto p-2 justify-evenly">
              <div className="flex flex-wrap ">
                <div className="flex items-center justify-between w-full min-w-0 ">
                  <h2 className="mr-auto text-lg cursor-pointer hover:text-gray-900 ">
                    Cake 1 plate 120Kg
                  </h2>
                </div>
              </div>
              <div className="mt-1 text-xl font-semibold">$11.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
