import React from "react";

import "./Error.css";

const Error: React.FC = () => {
  return (
    <div className="Error">
      Something went wrong{" "}
      <span role="img" aria-label="face with open mouth and cold sweat">
        😰
      </span>
    </div>
  );
};

export default Error;
