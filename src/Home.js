import * as React from "react";
import { Link } from "react-router-dom";

export default Home;

const ASINS = ["B07X6VYHC8"];
function Home() {
  return (
    <>
      <h2>Home</h2>
      <ul>
        {ASINS.map((asin) => {
          return [
            <li key={`/${asin}`}>
              Try <Link to={`/${asin}`}>/{asin}</Link>
            </li>,
            <li key={`/${asin}/data`}>
              Try <Link to={`/${asin}/data`}>/{asin}/data</Link>
            </li>
          ];
        })}
      </ul>
    </>
  );
}