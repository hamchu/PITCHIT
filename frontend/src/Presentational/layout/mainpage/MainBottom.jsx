import { useState, useEffect } from "react";
import styled from "styled-components";
import RoomList from "../../component/RoomList";
import TotalCategory from "../../component/TotalCategory";
import MyCategory from "../../component/MyCategory";
import PageBar from "../../common/Pagination/PageBar";

// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import CreateRoom from "../../component/CreateRoom";
import EmptyRoomList from "../../component/EmptyRoomList";
//통신
import useAxios from '../../../action/hooks/useAxios';
import axios from "axios";
import {testToken} from "../../../store/values"

// const MySwal = withReactContent(Swal);
// // React sweet alert 쓸려고 사용함 

function MainBottom() {
  // //로그인여부
  // const [isLogined, setIsLogined] = useState(false); //false:비로그인, true:로그인
  // //로그인버튼(테스트용)
  // function loginBtn() {
  //   if (isLogined === false) {
  //     setIsLogined(true);
  //     console.log(isLogined);
  //     const btnElement = document.getElementById("btn");
  //     btnElement.innerText = "로그인상태";
  //   } else {
  //     setIsLogined(false);
  //     console.log(isLogined);
  //     const btnElement = document.getElementById("btn");
  //     btnElement.innerText = "지금은 비로그인";
  //   }
  // }
  

  // // roomlist통신
  const [data, setData] = useState([])
    // //페이지네이션
    const [currentPage, setCurrentPage] = useState(1); //현재페이지
    const [postsPerPage, setPostsPerPage] = useState(9); //페이지당 게시물 수
    const [totalElements, setTotalElements] = useState(0); //전체 데이터 길이
    const [totalpages, setTotalPages] = useState(0); //전체 데이터 길이

  const [getData, isLoading] = useAxios(
    `interviewrooms?page=${currentPage-1}`,'GET',testToken,
  );
  useEffect(() => {
    if(getData && getData.data){
      console.log(getData)
      setData(getData)
      setTotalElements(getData.data.totalElements)
      setTotalPages(getData.data.totalPages)
    }
  }, [getData]);

  //////////////////  <<<  total/my 사용자정렬  >>>>  ////////////////
  //사용자 정렬
  // const [roomPosition, setRoomPosition] = useState(false); // false : total, true ; my
  // //버튼이 따른 변경
  // function roomSwitch(position) {
  //   if (position === "toTotal") {
  //     setRoomPosition(false);
  //     setData(DUMMY_DATA);
  //   } else {
  //     setRoomPosition(true);
  //     setData(MY_ROOMS);
  //   }
  // }
  // useEffect(() => {
  //   if (isLogined === false) {
  //     setRoomPosition(false);
  //     setData(DUMMY_DATA);
  //   } else {
  //     setRoomPosition(true);
  //     setData(MY_ROOMS);
  //   }
  // }, [isLogined]);

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
      setModalOpen(true)
    }

  return (
    <Layout>
      {/* 로그인 상태에 따른거(테스트용)  */}
      {/* <button id="btn" onClick={loginBtn}>
        지금은 비로그인
      </button> */}
      <Header>
        <h1> LOOM LIST</h1>
        
        <Titlesection>
          <p>대충 설명이 들어가겠죠?</p>
          <div>
            {/* <button
              onClick={() => {
                roomSwitch("toTotal");
              }}
            >
              TOTAL
            </button>
            <button
              onClick={() => {
                roomSwitch("toMy");
              }}
            >
              MY
            </button> */}
          </div>
        </Titlesection>
         
      </Header>
      {
          isLoading===true ? <div>loading...</div> :
      <section>
        <Main>
          {/* {roomPosition ? <MyCategory /> : <TotalCategory />} */}
          <RoomListdiv>
            {data.length === 0 ? (
              <EmptyRoomList />
            ) : (
              // <RoomList rooms={currentPosts} />
              <RoomList rooms={data.data.content} />
            )}
          </RoomListdiv>
          <PageBar
            totalPosts={totalElements} //전체 데이터 길이
            postsPerPage={postsPerPage} //페이지당 게시물 수
            setCurrentPage={setCurrentPage} //현재 페이지를 계산하는 함수
            currentPage={currentPage} //현재페이지
            totalpages={totalpages} //페이지 길이
          />
        </Main>
        <Footer>
          <button onClick={showModal}>방만들기</button>
          {modalOpen && <CreateRoom setModalOpen={setModalOpen} />}
        </Footer>
      </section>
      }
    </Layout>
  );
}
export default MainBottom;

const Layout = styled.div`
  /* margin-inline: 15rem; */
  margin-bottom: 100px;
  width: 65vw;
`;

const Header = styled.div`
  /* border-bottom: 2px solid gray; */
  padding: 4rem 0 2rem 0;

  & h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
`;

const Titlesection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled.div`
  margin: 0;
  .search-input {
    width: 100%;
    margin-block: 2rem 1.5rem;
  }
`;

const RoomListdiv = styled.div`
  margin-block: 1rem 3rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;