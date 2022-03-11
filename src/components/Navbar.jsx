import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
function Navbar() {
  return (
    <>
      <Wrapper>
        <h1>Sound Studio</h1>
      </Wrapper>
    </>
  );
}

export default Navbar;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid black;
  position: fixed;
  top: 0px;
  background-color: #203239;
  color: white;
`;
