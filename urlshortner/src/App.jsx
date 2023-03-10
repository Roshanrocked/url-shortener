import logo from "./logo.svg";
// import "./App.css";
import axios from "axios";
import { useRef, useState } from "react";
function App() {
  const a = useRef(null);
  const [data, setData] = useState({ Full_url: "", Short_url: "" });
  const [short, setShort] = useState({});
  const [displayBtm, setDisplayBtm] = useState(false);
  const handle = async () => {
    if (data.Full_url !== "") {
      await axios.post(`/api`, data).then((res) => {
        // setShort(...res.data);
        setShort(res.data);
        setDisplayBtm(true);
      });
      console.log(short);
    } else {
      alert("Enter Url");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(short.Short_url);
    document.getElementById("message").style.display = "block";
    setTimeout(() => {
      document.getElementById("message").style.display = "none";
    }, 2000);
  };

  return (
    <div className="box">
      <di className="container">
        <h1 className="heading">Url shortner</h1>
        <div className="input">
          <input
            type="text"
            name="url"
            onChange={(e) => {
              setData({ ...data, Full_url: e.target.value });
            }}
            placeholder="Enter Url"
            required
          />
          <button className="btm" onClick={handle}>
            Short
          </button>
        </div>
      </di>
      <div className="Short_Url_Box">
        <p>
          <span>Short-Url :</span>
          <a href={short.Full_url} target="_blank">
            <span ref={a}>{short.Short_url}</span>
          </a>
        </p>
        {displayBtm === true ? (
          <>
            <button onClick={copy}>Copy Url</button>
          </>
        ) : (
          <></>
        )}
        <span id="message">Link copied !!</span>
      </div>
    </div>
  );
}

export default App;
