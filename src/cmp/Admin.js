import Wrapper from './Wrapper';
import { useState, useEffect } from 'react';
import UploadFiles from './UploadFiles'
import MovieIcon from '@mui/icons-material/Movie';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { sendMsg } from './functions';
import { ToastContainer, toast } from 'react-toastify';
import { obj } from './config'
export default function Admin(props) {
    const [view, setView] = useState(1);
    const [send, setsend] = useState("Schedule");
    const setMovie = async (e) => {
        e.preventDefault()
        setsend('Scheduling ...')

        await sendMsg(
            "Name:-" + e.target.elements[0].value + '\n' +
            "Date:-" + e.target.elements[1].value + '\n' +
            "Time:-" + e.target.elements[2].value + '\n'
            , 'token')
        toast.success("Movie has been Scheduled Wait for your partner", {
            theme: "dark",
            position: "top-right",
            autoClose: 2000,
        });
        setsend('Schedule')
    }
    const obj = {
        1: <UploadFiles />,
        2: <div className="mb-3" >
            <label className="form-label" htmlFor="name" style={{ fontSize: "30px" }}>
                <span style={{ color: '#38b6ff' }}  >Schedule</span>  a movie<MovieIcon />
            </label>
            <form onSubmit={setMovie} style={{ width: "96vw" }}>
                <label className="form-label" htmlFor="name" >
                    Movie name
                </label>
                <input className="form-control" type="text" id="name" autoComplete="off" placeholder="Movie Name" required />
                <label className="form-label" htmlFor="name" >
                    Date
                </label>
                <input className="form-control" type="date" id="name" autoComplete="off" placeholder="date" required />
                <label className="form-label" htmlFor="name" >
                    Approximate time
                </label>
                <input className="form-control" type="text" id="name" autoComplete="off" placeholder="Time" required />
                <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                    marginTop: "30px",
                    minWidth: "70px",
                    color: "#2e0006",
                    border: "1px solid #38b6ff",

                }}
                >
                    {send}
                </button>
            </form>
        </div >
        ,
        3: <h1 >
            <span style={{ color: '#38b6ff' }}>Comming</span> Soon
        </h1>
    }
    return (
        <Wrapper self="start center">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="flight-types" style={{ top: "12px", placeSelf: "start center" }} >
                    <input type="radio" name="flight-type" defaultValue="coach" id="coach" onClick={() => { setView(1) }} />

                    <label htmlFor="coach"><CloudUploadIcon />Uploads</label>
                    <input
                        type="radio"
                        name="flight-type"
                        defaultValue="business"
                        id="business"
                        defaultChecked=""
                        onClick={() => { setView(2) }}
                    />
                    <label htmlFor="business"><MovieOutlinedIcon />Set Theater</label>
                    <input type="radio" name="flight-type" defaultValue="first" id="first" onClick={() => { setView(3) }} />
                    <label htmlFor="first"><ManageAccountsOutlinedIcon />Management</label>
                </div>
            </div>
            {
                obj[view]
            }
            <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />

        </Wrapper>
    );
}