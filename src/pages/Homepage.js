import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Data from "../components/Data";

const Homepage = () => {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  let [episode, setEpisode] = useState(null);
  // let [episodeURL, setEpisodeURL] = useState("");
  const initialURL = "https://rickandmortyapi.com/api/character";
  const searchURL = `https://rickandmortyapi.com/api/character/?name=${currentSearch}`;
  const episodeURL = "https://rickandmortyapi.com/api/episode";

  //fetch data from r&m api
  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let parsedData = await dataFetch.json();
    setData(parsedData.results);
  };

  //load more data
  const moredata = async () => {
    let newURL;
    if (input === "") {
      newURL = `https://rickandmortyapi.com/api/character/?page=${page}`;
    } else {
      newURL = `https://rickandmortyapi.com/api/character/?page=${page}&name=${currentSearch}`;
    }
    setPage(page + 1);
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let parsedData = await dataFetch.json();
    setData(data.concat(parsedData.results));
  };

  //fetch data when the page loads up
  useEffect(() => {
    search(initialURL);
  }, []);

  useEffect(() => {
    if (currentSearch === "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
  }, [currentSearch]);

  return (
    <div>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="datas">
        {data &&
          data.map((d) => {
            return <Data data={d} />;
          })}
      </div>
      <div className="moreData">
        <button onClick={moredata}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
