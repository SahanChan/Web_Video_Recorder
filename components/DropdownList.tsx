"use client";

import React, { useState } from "react";
import Image from "next/image";
import { icons } from "@/constants/icons";

const DropdownList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="filter-trigger">
          <figure>
            <Image src={icons.hamburger} alt="menu" width="14" height="14" />
            Most Recent
          </figure>
          <Image
            src={icons.arrowDown}
            alt="arrow-down"
            width="20"
            height="20"
          />
        </div>
      </div>

      {isOpen && (
        <ul className="dropdown">
          {["Most Recent", "Most Liked"].map((option) => (
            <li key={option} className="list-item">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default DropdownList;
