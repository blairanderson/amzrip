import * as React from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Home from './Home';
import Data from './Data';
import "./index.css";

function App() {
  return (
    <div className="App">
      <h1>AMZ.RIP</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":asin/data" element={<Data />} />
        <Route path=":asin" element={<ASIN />} />
      </Routes>
    </div>
  );
}
export default App;

function ASIN() {
  let params = useParams();
  const { asin } = params;

  let callback = React.useCallback(() => {
    window.location = `https://www.amazon.com/dp/${asin}`;
  }, [asin]);

  const time = useTimer({ seconds: 1, callback });

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
