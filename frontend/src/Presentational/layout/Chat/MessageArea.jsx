import { useEffect, useRef } from "react";
import styled from "styled-components";
import IncomMessage from "../../component/Chat/IncomMessage";

const MessageArea = ({Message}) => {
    const scrollRef = useRef();
    const scrollToBottom = () => {
        if(scrollRef.current){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    },[Message]);

    return (
        <MessageWrap ref={scrollRef}>
            {
                Message.map((data,index) => {
                    return(
                        <IncomMessage data={data} key={index}/>
                    )
                })
            }
        </MessageWrap>
    )
}

const MessageWrap = styled.div`
    width: inherit;
    height: 94%;
    padding-inline: 0;
    overflow: auto;
    & *{
        margin: 0px 0 5px 0;
    }
    & :first-child, :last-child{
        margin:0;
    }
`

export default MessageArea;