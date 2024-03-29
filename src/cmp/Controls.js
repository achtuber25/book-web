import React, { forwardRef, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
// import FastRewindIcon from "@material-ui/icons/FastRewind";
// import FastForwardIcon from "@material-ui/icons/FastForward";
import SendIcon from '@mui/icons-material/Send';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import VolumeUp from "@material-ui/icons/VolumeUp";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeMute from "@material-ui/icons/VolumeOff";
import FullScreen from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import PersonIcon from '@mui/icons-material/Person';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    background: "rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    width: 80,
  },
}));

const PrettoSlider = withStyles({
  root: {
    height: 2,
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

const Controls = forwardRef(
  (
    {
      onSeek,
      onSeekMouseDown,
      onSeekMouseUp,
      onDuration,
      onRewind,
      onPlayPause,
      onFastForward,
      playing,
      played,
      elapsedTime,
      totalDuration,
      onMute,
      muted,
      onVolumeSeekDown,
      onChangeDispayFormat,
      playbackRate,
      onPlaybackRateChange,
      onToggleFullScreen,
      volume,
      onVolumeChange,
      onBookmark,
      checkDuration4all,
      pduration,
      sendMsg,
      chatHistory,
      sliderView,
      setSliderView,
      isPartnerOnline,
    },
    ref
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLandscape, setLandscape] = useState(false)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const [currentMsg, setTypedMsg] = useState("")
    const [isLoader, setIsloader] = useState(false)

    const eleRef = useRef(null);


    useEffect(() => {
      let resizeObserver = new ResizeObserver(() => {
        if (ref.current.clientHeight < ref.current.clientWidth && ref.current.clientWidth > 500) {
          setLandscape(true)
        }
        else setLandscape(false)
      });
      resizeObserver.observe(document.getElementById("togetherPlayer"));
    })

    let i = 0
    return (
      <div ref={ref} id="togetherPlayer" className={classes.controlsWrapper}>

        <Grid
          container
          direction="column"
          justify="space-between"
          style={{ flexGrow: 1 }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            style={{ padding: 16 }}
          >
            <Grid item>
              {/* <Typography variant="h5" style={{ color: "#fff" }}>
                Video Title
              </Typography> */}
            </Grid>
            <Grid item>
              {isLandscape && <>
                {/* <Button
                  onClick={onBookmark}
                  color="primary"
                  style={{
                    position: "absolute",
                    left: "0px",
                    bottom: "35%",
                    maxWidth: "10px",
                  }}
                  startIcon={<BookmarkIcon style={{ color: "#777" }} />}
                >
                </Button> */}
                <Button
                  onClick={setSliderView}
                  color="primary"
                  style={{
                    position: "absolute",
                    left: "0px",
                    bottom: "50%",
                    maxWidth: "10px",
                  }}
                  startIcon={<CloseIcon style={{ color: "#777" }} />}
                >
                </Button>

                <Button
                  onClick={() => { setIsloader(!isLoader) }}
                  color="primary"
                  style={{
                    position: "absolute",
                    left: "0px",
                    bottom: "35%",
                  }}
                  startIcon={isLoader ? <ArrowCircleLeftIcon style={{ color: "#777" }} fontSize="large" /> : <ArrowCircleRightIcon style={{ color: "#777" }} fontSize="large" />}
                >
                </Button>
              </>
              }
              <div
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "60px"

                }}
              >
                <PersonIcon style={{ color: "#38b6ff" }} /><span style={{ color: "#3f51b5" }}>{elapsedTime}</span>
              </div>
              <Button
                onClick={checkDuration4all}
                style={{
                  position: "absolute",
                  left: "10px"
                }}
                startIcon={<TimelapseIcon style={{
                  color: "#777"
                }} />}
              >
                <span style={{ color: "#777" }}>see</span>
              </Button>
              <div
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "90px"
                }}
              >
                <PersonIcon style={{ color: isPartnerOnline }} /><span style={{ color: "#3f51b5" }}>{pduration}</span>
              </div>
              {isLandscape && <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "15px",
                  width: "30vw",
                  height: "55vh",
                }}
              >
                {
                  chatHistory.slice(0).reverse().map((e) => {
                    let styl = {
                      position: "absolute",
                      alignSelf: "0px",
                      right: '0px',
                      bottom: i.toString() + "px",
                      color: "#38b6ff",

                    }
                    let msg = <>{e.msg}<PersonIcon /></>

                    if (e.id != localStorage.getItem('email')) {
                      styl.left = '0px'
                      styl.color = 'green'
                      msg = <><PersonIcon />{e.msg}</>
                    }
                    i += 25
                    return <p style={styl}>{msg}</p>
                  })}
                <div>
                  <input

                    placeholder="Type here ..."
                    value={currentMsg}
                    style={{
                      position: "absolute",
                      bottom: "-25px",
                      width: "60%",
                      color: '#777',
                      backgroundColor: "inherit",
                      borderRadius: "6px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                      border: "1px solid #38b6ff"
                    }}
                    onClick={() => console.log()}
                    onChange={(e) => { setTypedMsg(e.target.value) }}
                  >

                  </input>
                  <SendIcon style={{
                    position: "absolute",
                    right: "25%",
                    bottom: "-23px",
                    color: '#38b6ff',
                    backgroundColor: "inherit",
                  }}
                    onClick={(() => {
                      if (currentMsg) {
                        sendMsg({
                          id: localStorage.getItem('email'),
                          msg: currentMsg
                        })
                        setTypedMsg('')
                      }
                    })}
                  />
                </div>
              </div>}
            </Grid>
          </Grid>


          {/* <Grid container direction="row" alignItems="center" justify="center">
            <IconButton
              onClick={onRewind}
              className={classes.controlIcons}
              aria-label="rewind"
            >
              <FastRewindIcon
                className={classes.controlIcons}
                fontSize="inherit"
              />
            </IconButton>
            <IconButton
              onClick={onPlayPause}
              className={classes.controlIcons}
              aria-label="play"
            >
              {playing ? (
                <PauseIcon fontSize="inherit" />
              ) : (
                <PlayArrowIcon fontSize="inherit" />
              )}
            </IconButton>
            <IconButton
              onClick={onFastForward}
              className={classes.controlIcons}
              aria-label="forward"
            >
              <FastForwardIcon fontSize="inherit" />
            </IconButton>
          </Grid> */}
          {/* bottom controls */}
          {isLandscape && <><Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ padding: 16 }}
          >
            <Grid item xs={12}>
              {isLandscape && isLoader && <PrettoSlider
                min={0}
                max={100}
                ValueLabelComponent={(props) => (
                  <ValueLabelComponent {...props} value={elapsedTime} />
                )}
                aria-label="custom thumb label"
                value={played * 100}
                onChange={onSeek}
                onMouseDown={onSeekMouseDown}
                onChangeCommitted={onSeekMouseUp}
                onDuration={onDuration}
              />}
            </Grid>

            <Grid item>
              <Grid container alignItems="center">
                <IconButton
                  onClick={onPlayPause}
                  className={classes.bottomIcons}
                >
                  {playing ? (
                    <PauseIcon fontSize="large" />
                  ) : (
                    <PlayArrowIcon fontSize="large" />
                  )}
                </IconButton>

                <IconButton
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  onClick={onMute}
                  className={`${classes.bottomIcons} ${classes.volumeButton}`}
                >
                  {muted ? (
                    <VolumeMute fontSize="large" />
                  ) : volume > 0.5 ? (
                    <VolumeUp fontSize="large" />
                  ) : (
                    <VolumeDown fontSize="large" />
                  )}
                </IconButton>

                <Slider
                  ref={eleRef}
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  className={classes.volumeSlider}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onVolumeSeekDown}
                />
                <Button
                  variant="text"
                  onClick={
                    onChangeDispayFormat
                    //     () =>
                    //   setTimeDisplayFormat(
                    //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                    //   )
                  }
                >
                  <Typography
                    variant="body1"
                    style={{ color: "#fff", marginLeft: 16 }}
                  >
                    {elapsedTime}/{totalDuration}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <>
                {/* <Button
                  onClick={handleClick}
                  aria-describedby={id}
                  className={classes.bottomIcons}
                  variant="text"
                >
                  <Typography>{playbackRate}X</Typography>
                </Button> */}

                {/* <Popover
                  container={ref.current}
                  open={open}
                  id={id}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Grid container direction="column-reverse">
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <Button
                        key={rate}
                        //   onClick={() => setState({ ...state, playbackRate: rate })}
                        onClick={() => onPlaybackRateChange(rate)}
                        variant="text"
                      >
                        <Typography
                          color={rate === playbackRate ? "secondary" : "inherit"}
                        >
                          {rate}X
                        </Typography>
                      </Button>
                    ))}
                  </Grid>
                </Popover> */}
              </>
              {/* <IconButton
                onClick={onToggleFullScreen}
                className={classes.bottomIcons}
              >
                <FullScreen fontSize="large" />
              </IconButton> */}

            </Grid>
          </Grid>
          </>}
        </Grid>
      </div >
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};
export default Controls;
