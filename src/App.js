import * as React from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>AMZ.RIP!!!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":asin/data" element={<Data />} />
        <Route path=":asin" element={<ASIN />} />
      </Routes>
    </div>
  );
}
export default App;

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
          src={`//images.amazon.com/images/P/${asin}.01.LZ.jpg`}
        />
      </div>
    </>
  );
}

function ASIN() {
  let params = useParams();
  const { asin } = params;

  let callback = React.useCallback(() => {
    window.location = `https://www.amazon.com/dp/${asin}`;
  }, [asin]);

  const time = useTimer({ seconds: 3, callback });

  return (
    <>
      <Link to="/">home</Link>
      <h2>
        Redirecting to {asin} in {time}
      </h2>
    </>
  );
}

const useTimer = ({ seconds, callback }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = React.useState(seconds);

  React.useEffect(() => {
    // exit early when we reach 0
    if (timeLeft < 1) {
      if (typeof callback === "function") {
        callback();
      }
      return 0;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, callback]);

  return timeLeft;
};
