import React from "react";
import "../styling/ListHeader.css";
import { Link } from "react-router-dom";

const ListHeader = () => {
  return (
    <div className="sticky-header">
       <nav>
        <ul style={{
          display: "flex",
          justifyContent: "space-evenly",
          listStyle: "none",
          margin: "0",
        }}>
          <li><Link to="/" className="list_header_link">Home</Link></li>
          <li><Link to="/multi-step" className="list_header_link">Multi Step Form</Link></li>
        </ul>
      </nav>
      <h2>Items List</h2>
    </div>
  );
};

export default ListHeader;
