import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPlayer from 'react-player'
import TogetherLogo from '../images/together.png'
import { checkMsg } from './functions'
import { db } from './Firebase'
import { set, ref, onValue, remove, update } from "firebase/database";

import Wrapper from './Wrapper';
import { obj } from './config'

function Together() {
  const [msg, setMsg] = useState("")
  const [isPlayNow, setPlayNow] = useState("")

  const [playerData, setPlayerData] = useState({
    isPlay: "",
    isOnline: "",
    msg: ""
  });


  //isLogin
  if (!localStorage.getItem('email')) {
    console.log(localStorage.getItem('email'))
    window.location.href = obj.domain;

  }
  useEffect(() => {
    onValue(ref(db, `/${localStorage.getItem('pemail')}`), (snapshot) => {
      console.log(snapshot.val())
      setPlayNow(snapshot.val().isPlay)
    });
  }, [ref(db, `/vandna`)]);

  useEffect(() => {
    update(ref(db, `/${localStorage.getItem("email")}`), playerData);
  }, [playerData]);


  return (
    <Wrapper self="center">
      <ReactPlayer url={"https://youtu.be/gXSlzUSQO0A"} width="80vw"

        height="40vh" playing={isPlayNow} controls={true} style={{ placeSelf: "center", maxWidth: "600px", pointerEvents: "auto", border: "4px solid rgb(255 157 204)", borderRadius: "5px" }}
        onPause={() => {
          setPlayerData({ ...playerData, ...{ isPlay: false } })
        }}
        onPlay={() => setPlayerData({ ...playerData, ...{ isPlay: true } })}
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
          setMsg(e.target.value)
        }}
        />
        <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
          marginTop: "10px",
          height: "100%",
          width: "200px",
          color: "#2e0006",
          border: "1px solid #38b6ff",
        }}
          onClick={(e) => {
            setPlayerData({ ...playerData, ...{ msg: msg } })
          }}
        >
          {"send"}
        </button></div>
      <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />

    </Wrapper >
  );
}

export default Together;