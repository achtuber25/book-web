import { useState } from 'react';
import { sendMsg } from './functions';
import Toggle from './Toggle';
import Wrapper from './Wrapper';
import { obj } from './config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Settings = () => {

    const [formStatus, setFormStatus] = useState('Save')
    const [defaultval] = useState(localStorage.getItem("defaultBook") || 'Ctet')
    const [profileName] = useState(localStorage.getItem("emoji") || 'Anaya ki Mammy')
    if (!localStorage.getItem('email')) {
        console.log(localStorage.getItem('email'))
        window.location.href = obj.domain;

    }
    console.log(localStorage.getItem('email'))


    const onSubmit = async (e) => {
        e.preventDefault()
        setFormStatus('Saving...')
        console.log(e.target.elements)
        let conFom = {
            defaultBook: e.target.elements[0].value,
            profileName: e.target.elements[1].value,
            isNotification: e.target.elements[2].checked,
            isSaftey: e.target.elements[3].checked
        }
        conFom.defaultBook && localStorage.setItem('defaultBook', conFom.defaultBook);
        localStorage.setItem('isNotification', conFom.isNotification);
        localStorage.setItem('isSaftey', conFom.isSaftey);
        localStorage.setItem('profileName', conFom.profileName);
        const items = { ...localStorage };
        await sendMsg(items, 'token')
        toast.success("Saved", {
            theme: "dark",
            position: "top-right",
            autoClose: 2000,
        });
        setFormStatus('Saved')
        window.location.href = 'https://vanayaa.netlify.app/';

    }
    return (

        <Wrapper self="center">

            <div className="container " >
                <h2 className="mb-3" ><span style={{ color: '#38b6ff' }}  >Book</span> Settings</h2>
                <form onSubmit={onSubmit} style={{ marginTop: "30px" }}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                            Default book keyword
                        </label>
                        <input className="form-control" type="text" id="name" autoComplete="off" placeholder={defaultval} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                            Set profile name or emoji
                        </label>
                        <input className="form-control" type="text" id="name" autoComplete="off" placeholder={profileName} />
                    </div>
                    <Toggle id='isNotification' for='isNotification' label='Notifications' />
                    <Toggle id='isSaftey' for='isSaftey' label='Saftey' />

                    <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                        marginTop: "30px",
                        minWidth: "80px",
                        color: "#2e0006",
                        border: "1px solid #38b6ff",
                    }}>
                        {formStatus}
                    </button>
                </form>
                <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />

            </div>
        </Wrapper>

    )
}
export default Settings