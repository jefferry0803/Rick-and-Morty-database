import React from "react";

const Data = ({ data }) => {
  return (
    <div className="data">
      <p className="name">{data.name}</p>
      <p>Location: {data.location.name}</p>
      <p>Status: {data.status}</p>
      <div className="imageContainer">
        <img src={data.image} alt="" />
      </div>
    </div>
  );
};

export default Data;
