import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ViewPdf from "../../component/room/resume/ViewPdf";
import * as pdfjs from "pdfjs-dist";
import axios from "axios";
import { PITCHIT_URL } from "../../../store/values";

import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

import MyResume from "../../component/room/resume/MyInquire/MyResume";
import MemberList from "../../component/room/resume/interviewee/MemberList";
import ResumeUpload from "../../component/room/resume/MyInquire/ResumeUpload";
// 근데 import * as 안하면 에러남 필수로 해줄 것!

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//pdf 보여주는 컴포넌트
function Resume({ idx, participants, setPdfHandler, pdfhandler }) {
  // 토큰, 유저 정보 가져옴
  const { token, userinfo } = useSelector((state) => state);
  // pdf 파일 목록 가져옴 (내 자소서 보기 버튼 활성화) 필요없을지두
  // 원래 blob 담는 용이였는데 필요없을듯
  const [pdfUrl, setPdfUrl] = useState();
  // pdf 모달 띄우는 용
  const [showPdf, setShowPdf] = useState(false);
  // 조회 할 때 useAxios 컨트롤 용도로 쓸려했는데,,

  // 이름 클릭시 상태 변화
  const [memData, setMemData] = useState();

  const [inquire, setInquire] = useState(false);

  const myInterviewJoinId = participants[0].interviewJoinId;

  const [errorContext, setError] = useState(null);
  // 방에 입장 했을 때 자기소개서 파일이 있는지 조회하기 위한 axios (최초 렌더링 할 때만 실행 됨)

  useEffect(() => {
    axios({
      method: "GET",
      url: `${PITCHIT_URL}/interviewjoins/${myInterviewJoinId}/resumes`,
      headers: {
        Authorization: token,
      },
      data: null,
    })
      .then((res) => {
        setMemData(res.data);
      })
      .catch((err) => {
        setError(err);
        setMemData(null);
      });
  }, []);

  // 본인이 아닌 다른사람의 이름을 눌렀을 때 (자기소개서 유무)
  const userInquirePdf =
    memData && memData.data === null ? (
      <FileListBody>등록된 자소서가 없습니다</FileListBody>
    ) : (
      <FileListBody>
        <Label onClick={() => setShowPdf(true)}>조회하기</Label>
      </FileListBody>
    );

  // 본인 이름을 눌렀을 때
  const myInquirePdf = (
    <>
      {memData && memData.data === null ? (
        <ResumeUpload
          setMemData={setMemData}
          pdfhandler={pdfhandler}
          token={token}
        />
      ) : (
        <>
          {memData === undefined ? (
            <FileListBody>보고 싶은 자기소개서를 선택해 주세요</FileListBody>
          ) : (
            <MyResume
              setMemData={setMemData}
              pdfhandler={pdfhandler}
              setShowPdf={setShowPdf}
              token={token}
            />
          )}
        </>
      )}
    </>
  );

  // pdf 창 닫기
  const onPdfClose = (e) => {
    setShowPdf(false);
  };

  return (
    <MainContainer>
      <MemberList
        memData={memData}
        setMemData={setMemData}
        token={token}
        pdfhandler={pdfhandler}
        participants={participants}
        setPdfHandler={setPdfHandler}
        setShowPdf={setShowPdf}
        setInquire={setInquire}
        inquire={inquire}
      />
      <FileContainer>
        {showPdf ? (
          <ModalOverlay visible={showPdf}>
            <PdfContainer>
              <ButtonContainer>
                <CloseButton onClick={onPdfClose}>
                  <IoClose />
                </CloseButton>
              </ButtonContainer>
              <ViewPdf pdfhandler={pdfhandler} fileUrl={pdfUrl} />
            </PdfContainer>
          </ModalOverlay>
        ) : (
          <FileList>
            {pdfhandler.id === userinfo.id ? (
              <>{myInquirePdf}</>
            ) : (
              <>{userInquirePdf}</>
            )}
          </FileList>
        )}
      </FileContainer>
    </MainContainer>
  );
}

export default Resume;

const FileContainer = styled.div`
  display: flex;
  justify-content: center;
  width: inherit;
  height: inherit;
  min-height: 600px;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  height: inherit;
  min-height: 600px;
`;

const FileListBody = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 1rem;
  background-color: var(--greyLight-1);
`;

const Label = styled.label`
  padding: 0.5rem 1rem;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  background-color: var(--primary);
  box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-light),
    inset -0.2rem -0.2rem 1rem var(--primary-dark),
    0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  color: var(--greyLight-1);
  border-radius: 1rem;

  &:hover {
    color: var(--white);
  }

  &:active {
    box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-dark),
      inset -0.2rem -0.2rem 1rem var(--primary-light);
  }
`;

const ModalOverlay = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 1rem;
  background-color: var(--greyLight-2);
  padding: 0.5rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 3;

  button {
    width: 2.5em;
    height: 2.5em;
    font-size: 1em;
    border: none;
    color: var(--white);
    background-color: var(--primary);
    border-radius: 5em;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      background-color: var(--primary-dark);
    }
  }
`;

const CloseButton = styled.button`
  width: 50px;

  svg {
    color: var(--white);
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  min-height: 550px;

  & ${FileListBody} {
    height: 550px;
  }

  path {
    color: var(--white);
  }
`;
