import styled from "styled-components";
import React, { useState, useCallback, useEffect } from "react";
import { ToggleButton } from "../common/ToggleButton";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Title from "../common/Title";

import useAxios from "../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import axios from "axios";
import { testToken } from "../../store/values";

function EditRoom({ setModalOpen, data }) {
  const [toggle, setToggle] = useState(false);
  const Togglehandler = (toggle) => {
    setToggle(toggle);
    console.log(toggle);
  };

  // 방 수정 정보 들어감
  const [room, setRoom] = useState({
    title: "",
    description: "",
    maxPersonCount: 0,
    password: "",
    finished: 0,
    startDate: "",
    managerId: 0,
  });

  // 방 수정하기 모달에 적은 input 값 넣어줌


  const InputHandler = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  // 모달 닫는창
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 밖 클릭시 모달 없앰
  useEffect(() => {
    document.body.style = `overflow:hidden`;
    return () => (document.body.style = `overflow:auto`);
  }, []);

  // Daypicker 용
  const [selected, setSelected] = useState();

  // 날짜 선택해서 데이터 넣음
  const handleDayClick = (day) => {
    setSelected(day);
  };


  
 
  //Axios put 통신

  // const [editData, setEditData] = useState(false);
  // const token = useSelector((state) => state.token);
  // const roomId = data.id;
  // console.log(roomId);

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setRoom(format(date, "yyyy-MM-dd"));
    }
    setRoom("");
    console.log(date);
  };

  // const [putData, isLoading] = useAxios(
  //   `interviewrooms/${roomId}/finished?finished=1`,
  //   "PUT",    token,
  //   room,
  //   editData
  // );
  // const EditRoom = () => {
  //   console.log(room)
  //   // setEditData(true)
  //   console.log(putData)
  // };


  return (
    <Wrap onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title title="방 수정하기" />
        </Header>
        <Layout height="40%">
          <Section width="50%">
            <DayPicker
              mode="single"
              selected={selected}
              onDayClick={handleDayClick}
              name="startDate"
              value={data.startDate}
              onChange={handleDaySelect}
            />
          </Section>
          <Section width="60%">
            <InfoList>
              <Info>
                <InfoText>방 이름</InfoText>
                <InfoInput
                  name="title"
                  value={data.title}
                  onChange={InputHandler}
                />
              </Info>
              <Info>
                <InfoText>모집 인원</InfoText>
                <InfoPerson
                  max="4"
                  min="2"
                  step="1"
                  name="maxPersonCount"
                  value={data.maxPersonCount}
                  onChange={InputHandler}
                />
              </Info>
              <Info>
                <InfoText>연락 방법</InfoText>
                <InfoInput />
              </Info>
              <Info>
                <InfoText>비밀방 여부</InfoText>
                <ToggleButton
                  toggle={toggle}
                  ToggleHandler={Togglehandler}
                  onClick={Togglehandler}
                />
                {toggle ? (
                  <InfoInput
                    name="password"
                    value={data.password}
                    onChange={InputHandler}
                  />
                ) : null}
              </Info>
            </InfoList>
          </Section>
        </Layout>
        <Layout height="30%">
          <Section width="100%">
            <RoomText
              placeholder="방 생성에 필요한 정보를 입력하세요"
              name="description"
              value={data.description}
              onChange={InputHandler}
            ></RoomText>
          </Section>
        </Layout>
        <Layout height="20%">
          <button onClick={EditRoom}>생성하기</button>
          <button onClick={closeModal}>취소하기</button>
        </Layout>
      </ModalContainer>
    </Wrap>
  );
}
export default EditRoom;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalContainer = styled.div`
  width: 700px;
  height: 700px;

  /* 최상단 위치 */
  z-index: 9999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
  padding: 30px;
`;

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  height: ${(props) => props.width};
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
`;

const Section = styled.div`
  width: ${(props) => props.width};
  height: 100%;
`;

const InfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;
const Info = styled.div`
  display: inline-flex;
  padding: 10px;
  align-items: center;
`;

const InfoText = styled.div``;
const InfoInput = styled.input.attrs({ type: "text" })`
  background-color: gray;
  border-radius: 5px;
  height: 30px;
  margin: 10px;
  border: none;
  width: 180px;
`;

const InfoPerson = styled.input.attrs({ type: "number" })`
  background-color: gray;
  border-radius: 5px;
  height: 30px;
  width: 180px;
  margin: 10px;
  border: none;
`;

const RoomText = styled.textarea`
  width: 100%;
  height: 200px;
  border: none;
`;

const Header = styled.div`
  margin: 10px;
  text-align: center;
`;