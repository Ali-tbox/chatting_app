import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div style={{ overflow: "auto" }} className="sidebar">
      <Navbar />
      <SearchBar />
      <Chats />
    </div>
  );
};

export default Sidebar;
