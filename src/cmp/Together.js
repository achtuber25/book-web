import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPlayer from 'react-player'
import io from "socket.io-client";

import TogetherLogo from '../images/together.png'
import { checkMsg } from './functions'

import Wrapper from './Wrapper';
import { obj } from './config'

function Together() {

  let socket = io("http://212.ip.ply.gg:60366")

  const room = "122";
  const [isplayble, setPlayble] = useState(false);
  const [isUrl, setUrl] = useState('');
  const [isOnlinePartner, Setmsg] = useState('online');
  const [send, Setsend] = useState('Send msg');
  if (!localStorage.getItem('email')) {
    console.log(localStorage.getItem('email'))
    window.location.href = obj.domain;

  }
  console.log(localStorage.getItem('email'))
  useEffect(() => {
    socket.on("recive-message", (data) => {
      setPlayble(data.isplayble)
      console.log("asas", data.isplayble, data)
      if (data.isOnlinePartner) {
        toast.success(data.isOnlinePartner, {
          theme: "dark",
          position: "top-right",
          autoClose: 2000,
        });
      }
    });
  }, [socket]);
  useEffect(() => {
    socket.emit("join_room", room);
    isUrlExist()
  }, []);
  useEffect(() => {
    console.log(isplayble, "useeffect")
    socket.emit("send_message", { room, isplayble });

  }, [isplayble]);
  const isUrlExist = async () => {
    let d = await checkMsg('myFeel')
    console.log(d)
    if (d[0] === 'h')
      toast.success("Wow, Theater is On", {
        theme: "dark",
        position: "top-right",
        autoClose: 2000,
      });
    else
      toast.warn("Sorry, Theater is off", {
        theme: "dark",
        position: "top-right",
        autoClose: 2000,
      });
    setUrl(d)
  };
  const isOnline = async () => {
    Setsend('Sending ...')
    setTimeout(() => {
      Setsend('Send Msg')

    }, 400);
    socket.emit("send_message", { room, isOnlinePartner });
    toast.info("Send Successful", {
      theme: "dark",
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <Wrapper self="center">
      <ReactPlayer url={isUrl} width="80vw"

        height="40vh" playing={isplayble} controls={true} style={{ placeSelf: "center", maxWidth: "600px", pointerEvents: "auto", border: "4px solid rgb(255 157 204)", borderRadius: "5px" }}
        onPause={() => {
          setPlayble(false)
        }}
        onPlay={() => setPlayble(true)}
      />


      <img src={TogetherLogo} className="img-fluid" alt="." style={{
        position: "fixed",
        bottom: "0px",
        right: "51vw",
        width: "80vw", height: "40vh"
      }} />
      <div style={{
        position: "fixed",
        width: "200px",
        right: '15px',
        bottom: "20vh"
      }}>
        <input className="form-control" type="text" id="text" autoComplete="off" placeholder='hi' onChange={(e) => {
          Setmsg(e.target.value)
        }}
        />
        <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
          marginTop: "10px",
          height: "100%",
          width: "200px",
          color: "#2e0006",
          border: "1px solid #38b6ff",
        }}
          onClick={
            isOnline
          }
        >
          {send}
        </button></div>
      <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />

    </Wrapper >
  );
}

export default Together;