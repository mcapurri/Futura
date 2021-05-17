import React from "react";
import { AiFillHome as HomeLogo } from "react-icons/ai";
import { FaBookOpen as ResourcesLogo, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        bottom: "0",
        height: "50px",
        position: "fixed",
        backgroundColor: "rgb(5, 58, 32)",
        width: "100%",
      }}
    >
      <Link to="/">
        <HomeLogo
          style={{
            fontSize: "2rem",
            color: "#fff",
          }}
        />
      </Link>

      <Link to="/user-portal">
        <FaUserAlt
          style={{
            fontSize: "2rem",
            color: "#fff",
          }}
        />
      </Link>
      <Link to="/resources/news">
        <ResourcesLogo
          style={{
            fontSize: "2rem",
            color: "#fff",
          }}
        />
      </Link>
    </div>
  );
};

export default Footer;
