import React from "react";

const ListFooter = ({ loading }) => {
  return (
    <>
    <h1>Footer</h1>
    <div className="footer">
     
      {loading ? <p>Loading items...</p> : <p>No item found</p>}
    </div>
    </>
  );
};

export default ListFooter;
