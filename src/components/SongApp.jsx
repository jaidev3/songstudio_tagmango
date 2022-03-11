import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import SongCards from "./SongCards";

function SongApp() {
  const [songdata, setSongdata] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    let data = await axios(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/studiod9c0baf.jso"
    );
    setSongdata(data.data);
  };

  console.log(songdata);
  return (
    <>
      {songdata.map((e, i) => {
        <SongCards value={songdata} />;
      })}
    </>
  );
}

export default SongApp;
