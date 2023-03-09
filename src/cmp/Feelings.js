import Wrapper from './Wrapper';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkMsg, sendMsg, updateFire } from './functions';
import './topbar.css'

import { obj } from './config'

function Feelings() {
    const [Feelings, setView] = useState(1);
    const [msg, Setmsg] = useState('');
    const [clr, SetClr] = useState("#2e0006");


    const [myEmoji, setMyEmoji] = useState('');
    const [partnerEmoji, setPartnerEmoji] = useState('');


    const [myUrl, setMyUrl] = useState('');
    const [partnerUrl, setPartnerUrl] = useState('');

    const [myTitle, setMyTitle] = useState('"wanna say something?"');
    const [partnerTitle, setPartnerTitle] = useState('"wanna say something?"');


    const [send, Setsend] = useState('Comment');
    const [sendShare, SetsendShare] = useState('Share now');
    updateFire();
    if (!localStorage.getItem('email')) {
        console.log(localStorage.getItem('email'))
        window.location.href = obj.domain;

    }
    console.log(localStorage.getItem('email'))
    console.log(myUrl[0])
    useEffect(() => {
        async function t() {
            let aditya = await checkMsg('myFeel')
            let partner = await checkMsg('partnerFeel')
            console.log(aditya, partner)
            if (aditya) {
                aditya = aditya.split('split')
                setMyUrl(aditya[0])
                setMyEmoji(aditya[1])
                setMyTitle(aditya[2])

            }

            if (partner) {
                partner = partner.split('split')
                setPartnerUrl(partner[0])
                setPartnerEmoji(partner[1])
                setPartnerTitle(partner[2])
            }
        }
        t()
    }, []);

    const sendReply = async () => {
        console.log(msg)
        if (!msg) {
            SetClr('red')
            Setsend('Its empty...')
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    Setsend('comment')
                    resolve()
                }, 1500);
            })
            SetClr("#2e0006")
            return
        }
        SetClr("#2e0006")
        Setsend('Replying ..')
        await sendMsg(msg, 'myFeel')
        toast.success("Replied success", {
            theme: "dark",
            position: "top-right",
            autoClose: 2000,
        });
        SetClr("#2e0006")
        Setsend('Comment')
        return
    }
    const saveFeel = async (e) => {
        e.preventDefault()
        console.log()
        const withEmojis = /\p{Emoji}/u
        if (!withEmojis.test(e.target.elements[1].value)) {
            toast.error("Invalid emoji", {
                theme: "dark",
                position: "top-right",
                autoClose: 2000,
            });
            return
        }
        SetsendShare("Sharing ...")

        let profile = localStorage.getItem('profileName')
        let person = 'partnerFeel'
        if (profile && profile.toLowerCase().trim() === 'aditya') {
            person = 'myFeel'
        }
        await sendMsg(e.target.elements[0].value + "split" + e.target.elements[1].value + "split" + e.target.elements[2].value, person)
        toast.success("Feeling saved", {
            theme: "dark",
            position: "top-right",
            autoClose: 2000,
        });

        SetsendShare("Share now")
        return

    }
    const object = {
        1: <div className="mb-3" >
            <label className="form-label" htmlFor="name" style={{ fontSize: "30px" }}>
                <span style={{ color: 'rgb(255 157 204)' }}  >Share</span>  Your Feelings
            </label>
            <form onSubmit={saveFeel} style={{ width: "96vw" }}>
                <label className="form-label" htmlFor="name" >
                    Video url
                </label>
                <input className="form-control" type="text" id="name" autoComplete="off" placeholder="Video url" />

                <label className="form-label" htmlFor="name" >
                    Any emoji according to feel
                </label>
                <input className="form-control" type="text" id="name" autoComplete="off" placeholder="choose emoji" required />

                <label className="form-label" htmlFor="name" >
                    Title
                </label>
                <input className="form-control" type="text" id="name" autoComplete="off" placeholder="video title" />



                <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                    marginTop: "30px",
                    minWidth: "70px",
                    color: "#2e0006",
                    border: "1px solid #38b6ff",

                }}
                >
                    {sendShare}
                </button>
            </form>
        </div >,

        2: myUrl[0] === 'h' ? <><ReactPlayer url={myUrl} width="95vw"
            height="60vh" playing={false} controls={true} style={{ placeSelf: "center", maxWidth: "900px", pointerEvents: "auto", border: "4px solid rgb(255 157 204)", borderRadius: "5px" }}
            config={{ youtube: { playerVars: { disablekb: 1 } } }}
        /><div style={{ display: "flex", placeSelf: "end start" }}>
                <input className="form-control" type="text" id="text" autoComplete="off" placeholder={myTitle} style={{ position: 'fixed', display: "auto", width: "50%", top: '85vh', left: "12vw", placeSelf: "center" }} onChange={(e) => {
                    Setmsg(e.target.value)

                }} />
                <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                    position: "fixed",
                    Width: "120px",
                    color: clr,
                    left: '63vw',
                    top: '85vh',
                    border: "1px solid #38b6ff",
                    placeSelf: "center",
                }}
                    onClick={
                        sendReply
                    }
                >
                    {send}

                </button>

            </div></> : <h1>
            <span style={{ color: 'rgb(255 157 204)' }}>Ask Your Hubby<br /></span> To update current feeling.
        </h1>,
        3: partnerUrl[0] === 'h' ? <><ReactPlayer url={partnerUrl} width="80vw"
            height="40vh" playing={false} controls={true} style={{ placeSelf: "center", maxWidth: "600px", pointerEvents: "auto", border: "4px solid rgb(255 157 204)", borderRadius: "5px" }}
            config={{ youtube: { playerVars: { disablekb: 1 } } }}
        /> <div style={{ display: "flex", placeSelf: "end start" }}>
                <input className="form-control" type="text" id="text" autoComplete="off" placeholder={partnerTitle} style={{ position: 'fixed', display: "auto", width: "50%", top: '82vh', left: "0px", placeSelf: "center" }} onChange={(e) => {
                    Setmsg(e.target.value)

                }} />
                <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                    position: "fixed",
                    Width: "120px",
                    color: clr,
                    left: '50vw',
                    top: '82vh',
                    border: "1px solid #38b6ff",
                    placeSelf: "center",
                }}
                    onClick={
                        sendReply
                    }
                >
                    {send}

                </button>

            </div></> : <h1>
            <span style={{ color: 'rgb(255 157 204)' }}>Ask Your Wife<br /></span> To update current feeling.
        </h1>
    }

    return (
        <Wrapper self="start center">

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="flight-types" style={{ top: "12px", placeSelf: "start center" }} >
                    <input type="radio" name="flight-type" defaultValue="first" id="first" onClick={() => { setView(1) }} />
                    <label htmlFor="first">Today Feel</label>

                    <input type="radio" name="flight-type" defaultValue="coach" id="coach" onClick={() => { setView(2) }} />

                    <label htmlFor="coach">Hubby Feel - {myEmoji}</label>
                    <input
                        type="radio"
                        name="flight-type"
                        defaultValue="business"
                        id="business"
                        defaultChecked=""
                        onClick={() => { setView(3) }}
                    />
                    <label htmlFor="business">Wife feel - {partnerEmoji}</label>

                </div>
            </div>

            {object[Feelings]}


            <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />

        </Wrapper>
    );
}

export default Feelings;