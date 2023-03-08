
import { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { ytdwnld, sendMsg } from './functions';
import Wrapper from './Wrapper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadIcon from '@mui/icons-material/Download';
import { obj } from './config'

function YoutubeDownloader() {

    const [fetchLink, setFetch] = useState('FetchQuality')
    const [dwnldUrl, seturl] = useState('')

    const [videolinks, setVideoLinks] = useState({})
    if (!localStorage.getItem('email')) {
        console.log(localStorage.getItem('email'))
        window.location.href = obj.domain;

    }
    console.log(localStorage.getItem('email'))

    const fetchData = async (e) => {
        e.preventDefault()
        setFetch('Fetching...')
        if (!e.target.elements[0].value) {
            setFetch('input url')
            return
        }
        await sendMsg(e.target.elements[0].value, "token")

        let resp = await ytdwnld(e.target.elements[0].value)
        if (!resp.status) {
            toast.error(resp.msg, {
                theme: "dark",
                position: "top-right",
                autoClose: 2000,
            });
            setFetch("Fetch quality")

            return
        }
        setVideoLinks(resp)
        toast.success("Fetched", {
            theme: "dark",
            position: "top-right",
            autoClose: 2000,
        });
        setFetch("Choose quality")
    }
    const setUrldwnld = (e) => {
        e.preventDefault()
        if (videolinks.video[e.target.value].url)
            seturl(videolinks.video[e.target.value].url)
        console.log(dwnldUrl, videolinks.video[e.target.value])
    }
    const dwnldBegin = (e) => {
        console.log(dwnldUrl)
        dwnldUrl && (window.location.href = dwnldUrl)
        toast.success("Success", {
            theme: "dark",
            position: "top-right",
            autoClose: 2000,
        });
    }


    return (
        <Wrapper self="center">
            <div className="form-outline" >
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <YouTubeIcon style={{ width: "50px", height: "60px", color: "#38b6ff", marginBottom: "30px" }} />
                    <h1><span style={{ fontSize: "35px", color: "#38b6ff" }}>Down</span>loader</h1>
                </div>
                <form onSubmit={fetchData} style={{ display: "flex", justifyContent: "space-around" }}>

                    <input type="text" id="form12" className="form-control" autoComplete="off" placeholder="Youtube Url" style={{ width: "60%" }} required />
                    <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                        minWidth: "70px",
                        color: "#2e0006",
                        border: "1px solid #38b6ff",
                    }}

                    >{fetchLink}</button>

                </form>
                <select className="form-select" aria-label="Default select example" style={{ marginTop: "30px", placeSelf: "center" }} onChange={setUrldwnld} >
                    <option value={null}>Choose qualities</option>
                    {
                        videolinks.hasOwnProperty('video') && videolinks.video.map((vid, index) => {
                            return <option value={index}>{vid.quality}</option>
                        })
                    }


                </select>
                <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                    marginTop: "30px",
                    width: "100%",
                    placeSelf: "center",
                    color: "#2e0006",
                    border: "1px solid #38b6ff",
                }}
                    onClick={dwnldBegin}
                >Download <DownloadIcon style={{ color: "#38b6ff" }} /></button>
                <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />
            </div>

        </Wrapper>
    );
}



export default YoutubeDownloader;