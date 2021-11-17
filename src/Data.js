import * as React from "react";
import { Link, useParams } from "react-router-dom";

export default Data;

function Data() {
  let params = useParams();
  const { asin } = params;

  return (
    <>
      <h2>
        {asin} Data...
        <small>
          <Link to="/">Home</Link>
        </small>
      </h2>
      <div>
        <a href={`https://camelcamelcamel.com/product/${asin}`}>
          <img
            alt=""
            id="summary_chart"
            src={`//charts.camelcamelcamel.com/us/${asin}/amazon.png?force=1&amp;zero=0&amp;w=855&amp;h=513&amp;desired=false&amp;legend=1&amp;ilt=1&amp;tp=all&amp;fo=0&amp;lang=en`}
          />
        </a>
      </div>
      <div>
        <img
          alt={asin}
          src={`http://images.amazon.com/images/P/${asin}.01.LZ.jpg`}
        />
      </div>
    </>
  );
}