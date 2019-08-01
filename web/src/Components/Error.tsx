import React from "react";
import { Button } from "rsuite";

import "./Error.css";

const Error: React.FC = () => {
  return (
    <div className="Error">
      <div>
        <h2>
          Something went wrong{"  "}
          <span role="img" aria-label="face with open mouth and cold sweat">
            😰
          </span>
        </h2>
      </div>
      <div>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    </div>
  );
};

export default Error;
