import React from "react";

export default function Spinner() {
  return (
    <div className="text-center"> 
      <div
        className="spinner-border"
        style={{width: "3rem", height: "3rem", marginTop:"5rem"}}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
