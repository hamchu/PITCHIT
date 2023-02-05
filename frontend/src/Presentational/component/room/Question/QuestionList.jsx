import React from "react";
import styled from "styled-components";
import QuestionItem from "./QuestionItem";
import SubTitle from "../../../common/SubTitle";
import AggroL from "../../../common/Font/AggroL";

const QuestionList = ({ Questions }) => {
  return (
    <List>
      <AggroL />
      {Questions.map((Question) => (
        <QuestionItem Question={Question} key={Question.id} />
      ))}
    </List>
  );
};

export default QuestionList;

const List = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 7px;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--greyLight-2);
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--greyLight-1);
  }
`;