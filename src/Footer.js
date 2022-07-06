import React from "react";
import { FaGithub } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import "./Footer.css"

const Footer = () => {
  return (
    <div id="footer-div">
      <div className='footer-content'>
        <a href="https://github.com/BryanSkyyy" target="_blank" rel="noreferrer">
            <FaGithub />
        </a>
        <div className='footer-text'>Made by Bryan Pepitone-Perez</div>
        <a href="https://www.linkedin.com/in/bryanpepitoneperez/" target="_blank" rel="noreferrer">
            <AiFillLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;