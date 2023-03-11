import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPlayer from 'react-player'
import TogetherLogo from '../images/together.png'
import { db } from './Firebase'
import { ref, onValue, update } from "firebase/database";
import Wrapper from './Wrapper';
import { obj } from './config'

function Together() {
  const [msg, setMsg] = useState("")
  const [videoUrl, setVideoUrl] = useState("")

  const [isPlayNow, setPlayNow] = useState()
  const [isPartnerOnline, setPartnerOnline] = useState("red")
  const [isVideoReadyToPlay, setAllTogether] = useState("none")


  const [playerData, setPlayerData] = useState({
    isPlay: false,
    isOnline: "green",
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
      setPartnerOnline(snapshot.val().isOnline)
      if (snapshot.val().isOnline === 'green') {
        setAllTogether('auto')
      }
    });
  }, [ref(db, `/`)]);

  useEffect(() => {
    update(ref(db, `/${localStorage.getItem("email")}`), { ...playerData, ...{ isOnline: 'green' } });
    onValue(ref(db, `/${"youtubeVideo"}`), (snapshot) => {
      setVideoUrl(snapshot.val().url)
    });
  }, []);
  useEffect(() => {
    update(ref(db, `/${localStorage.getItem("email")}`), playerData);
  }, [playerData]);
  function checker() {
    if (isPartnerOnline !== 'green' || playerData.isOnline !== 'green') {
      toast.warn("Your partner is not online", {
        theme: "dark",
        position: "top-right",
        autoClose: 2000,
      });
    }
  }

  return (
    <Wrapper self="center">
      <ReactPlayer url={videoUrl} width="80vw"

        height="40vh" playing={isPlayNow} controls={true} style={{ pointerEvents: isVideoReadyToPlay, placeSelf: "center", maxWidth: "600px", }}
        onPause={() => {
          setPlayerData({ ...playerData, ...{ isPlay: false } })
        }}
        onPlay={() => setPlayerData({ ...playerData, ...{ isPlay: true } })}

      />

      <img src={TogetherLogo} className="img-fluid" alt="." style={{
        position: "fixed",
        bottom: "0px",
        left: "-110px",
        width: "80vw",
        maxWidth: "300px",
        maxHeight: "300px",

        height: "40vh"
      }} />
      <div style={{
        width: "150px",
        height: "50px",
        position: "fixed",
        bottom: "235px",
        left: "0px"
      }}>
        <div style={{
          marginLeft: "60px",
          marginTop: "30px",
          display: "flex"
        }}>
          <div style={{
            backgroundColor: localStorage.getItem('email') === 'aditya' ? isPartnerOnline : playerData.isOnline, width: "20px", height: "20px",
            borderRadius: "100px",
          }}></div>
          <div style={{
            backgroundColor: localStorage.getItem('email') === 'vandna' ? isPartnerOnline : playerData.isOnline, width: "20px", height: "20px",
            borderRadius: "100px",
            marginLeft: "3px",

          }}></div>
        </div>

      </div>
      {/* <div style={{
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
        </button></div> */}
      <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />

    </Wrapper >
  );
}

export default Together;