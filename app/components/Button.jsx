"use client";

import "../../style/button.css";
import { Modal } from "./Modal";
import { useState } from "react";

export const Button = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="button-play py-[5px] px-4 text-[14px]  text-white bg-black
      hover:bg-transparent hover:text-black rounded-[5px]
      active:bg-black active:text-white"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Jugar ahora!
      </button>

      <Modal
        isOpen={isModalOpen}
        isClose={closeModal}
      />
    </>
  );
};
