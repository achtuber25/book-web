import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ReactPlayer from "react-player";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Wrapper from './Wrapper';
import { ToastContainer, toast } from 'react-toastify';
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import screenful from "screenfull";
import Controls from "./Controls";
import { db } from './Firebase'
import { ref, onValue, update } from "firebase/database";

import Movie from "./movie.mp4";

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",

    position: "relative",
    "&:hover": {
      "& $controlsWrapper": {
        visibility: "visible",
      },
    },
  },

  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topControls: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  middleControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWrapper: {
    display: "flex",
    flexDirection: "column",

    // background: "rgba(0,0,0,0.6)",
    // height: 60,
    padding: theme.spacing(2),
  },

  bottomControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // height:40,
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",

    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

function Together() {


  const [isPlayNow, setPlayNow] = useState(false)
  const [pduration, setPduration] = useState('')
  const [videoUrl, setVideoUrl] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [Flow, setFlow] = useState("Touch me")

  //console.log(ref.current.clientHeight)

  const [isPartnerOnline, setPartnerOnline] = useState("")


  const classes = useStyles();
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [bookmarks, setBookmarks] = useState([]);
  const [state, setState] = useState({
    pip: false,
    controls: false,
    light: false,

    muted: true,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);

  let {
    light,

    muted,
    loop,
    playbackRate,
    pip,
    played,
    seeking,
    volume,
  } = state;





  const handlePlayPause = () => {
    console.log(isPartnerOnline, isPlayNow)
    if (isPartnerOnline === 'red' && isPlayNow === false) {
      toast.warn("Your partner is not online", {
        theme: "dark",
        position: "top-right",
        autoClose: 2000,
      });

    } else {
      setPlayNow(!isPlayNow)

    }

  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {

    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    // console.log(sliderRef.current.value)
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    // console.log(newValue);
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    console.log(playerContainerRef.current)
    screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat == "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const addBookmark = () => {
    const canvas = canvasRef.current;
    canvas.width = 160;
    canvas.height = 90;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      playerRef.current.getInternalPlayer(),
      0,
      0,
      canvas.width,
      canvas.height
    );
    const dataUri = canvas.toDataURL();
    canvas.width = 0;
    canvas.height = 0;
    const bookmarksCopy = [...bookmarks];
    bookmarksCopy.push({
      time: playerRef.current.getCurrentTime(),
      display: format(playerRef.current.getCurrentTime()),
      image: dataUri,
    });
    setBookmarks(bookmarksCopy);
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat == "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);
  const addDurantion = () => {
    update(ref(db, `/${localStorage.getItem('email')}`), { duration: elapsedTime });
  };
  useEffect(() => {
    onValue(ref(db, `/${localStorage.getItem('pemail')}`), (snapshot) => {
      console.log(snapshot.val(), "effect")
      setPlayNow(snapshot.val().isPlay)
      setPduration(snapshot.val().duration)
      setPartnerOnline(snapshot.val().isOnline)
    });
    onValue(ref(db, `/${"youtubeVideo"}`), (snapshot) => {
      setVideoUrl(snapshot.val().url)
    });
    onValue(ref(db, `/chat`), (snapshot) => {
      setChatHistory(snapshot.val().history)
    });

    update(ref(db, `/${localStorage.getItem('email')}`), { isOnline: "green" });
  }, [])
  useEffect(() => {
    update(ref(db, `${localStorage.getItem('email')}`), { duration: elapsedTime });
  }, [pduration])


  const onStart = () => {
    toggleFullScreen()
    toast.info("Now rotate your mobile ...", {
      theme: "dark",
      position: "top-right",
      autoClose: 2000,
    });
  }
  const sendMsg = (msg) => {
    setChatHistory(chatHistory.push(msg))
    update(ref(db, `/chat`), { history: chatHistory.slice(-15) });
  }
  const setSliderView = () => {
    hanldeMouseLeave()

  }


  return (
    <Wrapper self="center">

      <Container >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={hanldeMouseLeave}
          ref={playerContainerRef}
          className={classes.playerWrapper}
        >
          <ReactPlayer
            ref={playerRef}
            width="100%"
            height="100%"
            url={Movie}
            pip={pip}
            playing={isPlayNow}
            controls={false}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onPause={() => {
              update(ref(db, `/${localStorage.getItem('email')}`), { isPlay: false });
            }}
            onPlay={() => {
              update(ref(db, `/${localStorage.getItem('email')}`), { isPlay: true })
            }}
            onProgress={handleProgress}

          />
          <Controls
            ref={controlsRef}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            onDuration={handleDuration}
            onRewind={handleRewind}
            onPlayPause={handlePlayPause}
            onFastForward={handleFastForward}
            playing={isPlayNow}
            played={played}
            elapsedTime={elapsedTime}
            pduration={pduration}
            totalDuration={totalDuration}
            onMute={hanldeMute}
            muted={muted}
            onVolumeChange={handleVolumeChange}
            onVolumeSeekDown={handleVolumeSeekDown}
            onChangeDispayFormat={handleDisplayFormat}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            volume={volume}
            onBookmark={addBookmark}
            checkDuration4all={addDurantion}
            sendMsg={sendMsg}
            chatHistory={chatHistory}
            setSliderView={setSliderView}
            isPartnerOnline={isPartnerOnline}
          />
          <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />

        </div>

        <Grid container style={{ marginTop: 20 }} spacing={3}>
          {bookmarks.map((bookmark, index) => (
            <Grid key={index} item>
              <Paper
                onClick={() => {
                  playerRef.current.seekTo(bookmark.time);
                  controlsRef.current.style.visibility = "visible";

                  setTimeout(() => {
                    controlsRef.current.style.visibility = "hidden";
                  }, 1000);
                }}
                elevation={3}
              >
                <img crossOrigin="anonymous" src={bookmark.image} />
                <Typography variant="body2" align="center">
                  bookmark at {bookmark.display}
                </Typography>
              </Paper>
            </Grid>
          ))}

        </Grid>
        <canvas ref={canvasRef} />
        <div style={{
          display: "grid",
        }}>
          <button
            style={{
              color: "#2e0006",
              border: "1px solid #38b6ff",
              backgroundColor: "#38b6ff",
              borderRadius: "10px",
              height: "30px"
            }}
            onClick={onStart}
          >{Flow}</button>
        </div>
      </Container>

    </Wrapper >

  );
}


export default Together;
