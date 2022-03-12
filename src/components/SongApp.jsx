import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SongCards from "./SongCards";
import Navbar from "./Navbar";
import ReactPlayer from "react-player";

function SongApp() {
  const [form, setForm] = useState("");
  const [songdata, setSongdata] = useState([]);

  const urlData = useSelector((state) => state.song);

  useEffect(() => {
    fetchdata();
  }, []);

  /////////fetching data/////////
  const fetchdata = async () => {
    let data = await axios(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/studiod9c0baf.json"
    );
    setSongdata(data.data);
  };

  //   search input handling function //
  const handleInput = (e) => {
    setForm(e.target.value);
  };
  // console.log(songdata);
  return (
    <>
      <Navbar />

      <Wrapper>
        <div>
          <Input
            onChange={handleInput}
            name="song"
            placeholder="search songs"
          />
        </div>

        {/* song list and filter with input */}
        <div className="songlist">
          {songdata
            .filter((e) => {
              if (form === "") return e;
              else if (e.song.toLowerCase().includes(form.toLowerCase())) {
                return e;
              }
            })
            .map((e, i) => (
              <SongCards value={e} />
            ))}
        </div>
      </Wrapper>

      {/* audio player */}
      <ReactPlayer
        url={urlData}
        width="100%"
        height="100px"
        controls={true}
        playing={true}
      />
    </>
  );
}

export default SongApp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 100px;
  padding: 10px;

  .songlist {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
    margin-top: 10px;
    padding: 10px;
    column-gap: 3%;
    row-gap: 10px;
    justify-content: center;
  }
`;
const Input = styled.input`
  border-radius: 15px;
  width: 400px;
  height: 30px;
`;
