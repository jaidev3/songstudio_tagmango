import React from "react";
import styled from "styled-components";

function SongCards({ value, url }) {
  console.log(value.url);
  const handlePlay = (e) => {
    url(e);
  };
  return (
    <>
      <Wrapper>
        <Img src={value.cover_image} alt="cover_image" />
        <h3>{value.song}</h3>
        <h5>{value.artists}</h5>
        <Button onClick={() => handlePlay(value.url)}>play</Button>
      </Wrapper>
    </>
  );
}

export default SongCards;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 270px;
  border-radius: 5px;
  background-color: #eeedde;
  margin-top: 10px;
  h3 {
    margin: 0;
  }
  h5 {
    margin: 0;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 50%;
  border-radius: 15px;
  background-color: #203239;
  color: white;
  margin: auto;
`;
