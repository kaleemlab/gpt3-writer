import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h2>
              {" "}
              High Quality Copy For Emails, Ads, Websites, Listings, Blogs &
              More
            </h2>
          </div>
        </div>
        <textarea
          className="prompt-box"
          placeholder="start typing here"
          value={userInput}
          onChange={onUserChangedText}
        />
      </div>
      <div className="prompt-buttons">
        <a
          className={
            isGenerating ? "generate-button loading" : "generate-button"
          }
          onClick={callGenerateEndpoint}
        >
          <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
        </a>
      </div>
      {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
      <div className="badge-container grow">
        <a href="https://codiest.co" target="_blank" rel="noreferrer">
          <div className="badge">
            <Image src={buildspaceLogo} alt="codiest logo alt" />
            <p>build with codiest</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
