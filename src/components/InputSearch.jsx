import React from 'react';
import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export const InputSearch = () => {
  return (
    <InputContainer>
      <InputTag type="text" placeholder="Search" />
      <SearchIcon />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const InputTag = styled.input`
  width: 300px;
  height: 48px;
  padding-left: 14px;

  background-color: rgba(225, 225, 225, 0.51);
  border-radius: 50px;
  border: none;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  font-weight: 600;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translateY(-50%);
  cursor: pointer;
`;
