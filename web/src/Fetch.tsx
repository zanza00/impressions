import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const Fetch: React.FC = () => {
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState({});

  async function fetchData() {
    const res = await fetch("http://localhost:3001/api/fetch/");
    res
      .json()
      .then(res => setData(res))
      .catch(() => setErrors(true));
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="fetch">
      <span>{JSON.stringify(data)}</span>
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
  );
};

export default Fetch;
