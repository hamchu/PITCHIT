import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { PITCHIT_URL } from "../../../store/values";

const MySwal = withReactContent(Swal);

//각 방 아이템 컴포넌트
function RoomListItem(props) {
  const { data } = props;
  const {
    id,
    secretRoom,
    title,
    currentPersonCount,
    maxPersonCount,
    startDate,
  } = data;

  // 비밀방 클릭시, 비밀번호 입력 모달 띄우도록 설정,
  const token = useSelector((state) => state.token);
  let navigate = useNavigate();

  const roomId = id;

  // 방 클릭했을 때
  const clickRoomItem = () => {
    // 로그인 안 되어 있을 때
    if (token === null) {
      MySwal.fire({
        title: "로그인이 필요한 서비스 입니다.",
        text: "상단 메뉴에서 카카오 로그인을 이용해 주세요 ",
        showConfirmButton: false,
        icon: "warning",
        timer: 1500,
      });
    } else {
      // 비밀방 판별
      if (secretRoom === true) {
        MySwal.fire({
          title: "비밀번호 입력",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          confirmButtonText: "입장하기",
          preConfirm: (password) => {
            if (!password) {
              Swal.showValidationMessage(`Please enter login and password`);
            }
            return { password: password };
          },
        }).then((result) => {
          axios({
            method: "post",
            url: `${PITCHIT_URL}/interviewrooms/${roomId}`,
            headers: {
              Authorization: token,
            },
            data: { password: result.value.password },
          })
            .then((res) => {
              navigate(`/room/${roomId}`, {
                state: {
                  id: id,
                  password: result.value.password,
                },
              });
            })
            .catch((err) => {
              MySwal.fire({
                text: "잘못된 비밀번호 입니다. 다시 입력해주세요",
                showConfirmButton: false,
                icon: "warning",
                timer: 1500,
              });
            });
        });
      } else {
        navigate(`/room/${roomId}`, {
          state: {
            id: id,
          },
        });
      }
    }
  };
  return (
    <RoomItem onClick={clickRoomItem}>
      <RoomContent>
        <RoomTitle>
          <div>{title}</div>
          {secretRoom ? <FaLock /> : null}
        </RoomTitle>
        {currentPersonCount === maxPersonCount ? (
          <div className="guidance">남은 인원 수가 없습니다</div>
        ) : (
          <RoomInfo>
            <span>{currentPersonCount}</span>/<span>{maxPersonCount}</span>
          </RoomInfo>
        )}
      </RoomContent>
      <RoomInfo>{startDate.slice(0, 10).split("-").join(".")}</RoomInfo>
    </RoomItem>
  );
}

export default RoomListItem;

const RoomInfo = styled.p`
  font-size: 0.8rem;

  & span {
    font-size: 0.8rem;
    color: var(--grayLight-2);
  }

  & span:first-child {
    color: var(--primary);
  }
`;

const RoomItem = styled.li`
  width: 30%;
  height: 140px;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 600;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: var(--greyLight-1);
  color: var(--greyDark);
  padding: 1rem;
  gap: 0.5rem;
  font-family: "SBAggroL";

  .roomtitle {
    display: flex;
    justify-content: space-between;
    /* margin: 0px 5px; */
  }

  p {
    display: flex;
  }

  .guidance {
    font-size: 0.8rem;
    color: var(--greyLight-2);
  }
`;

const RoomContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${RoomInfo} {
    color: var(--greyLight-3);
  }
`;

const RoomTitle = styled.div`
  font-size: 1.2rem;
  color: var(--primary);
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  width: 90%;

  div {
    max-width: inherit;
    width: fit-content;
    text-align: center;
    font-size: 1.2rem;
    color: var(--primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }

  path {
    color: var(--greyDark);
  }
`;
