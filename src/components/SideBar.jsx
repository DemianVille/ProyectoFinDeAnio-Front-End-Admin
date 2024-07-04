import React from "react";
import { Image } from "react-bootstrap";

export default function SideBar() {
  return (
    <>
      <div className="sideBar body">
        <Image className="w-100" src="/src/assets/Logo.png"></Image>
        <span className="fontPlaywrite">Copéllia</span>
      </div>
    </>
  );
}
