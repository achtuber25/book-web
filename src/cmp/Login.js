import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBContainer,
  MDBInput,
  MDBCol,
}
  from 'mdb-react-ui-kit';
import loginLogo from '../images/logo.svg'
import Wrapper from './Wrapper';
import { obj } from './config'
import { set, ref } from "firebase/database";
import { db } from './Firebase'

function Login() {
  const [Sign, setSign] = useState('Sign In')
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(e.target.elements)
    setSign("Signing...")
    let email = e.target.elements[0].value.toLowerCase().trim()
    let password = e.target.elements[1].value.toLowerCase().trim()

    obj.credentials.map((user) => {
      if (email === user.name && user.password.includes(password)) {
        localStorage.setItem("email", email)
        localStorage.setItem("password", password)
        if (email === "aditya") {
          localStorage.setItem("pemail", "vandna")
        } else {
          localStorage.setItem("pemail", "aditya")
        }
        set(ref(db, `/${e.target.elements[0].value}`), {
          name: e.target.elements[0].value,
          password: e.target.elements[1].value
        });

        setSign("Logged In")
        toast.success("Saved", {
          theme: "dark",
          position: "top-right",
          autoClose: 2000,
        });
      }
    })
    if (Sign !== "Logged In") {
      setSign("Sign In")
      toast.error("Invalid Credentials", {
        theme: "dark",
        position: "top-right",
        autoClose: 2000,
      });
    }
  }

  if (localStorage.getItem("email")) {
    window.location.href = obj.domain + 'DashboardBook'
  }
  return (
    <Wrapper self="center">
      <MDBContainer fluid className="p-3 my-5">
        <form onSubmit={onSubmit}>
          {
            !localStorage.getItem("email") && <><MDBCol col='10' md='6'>
              <img src={loginLogo} className="img-fluid" alt="Phone image" />
            </MDBCol>
              <MDBCol col='4' md='6' >
                <MDBInput wrapperClass='mb-4' label='id' id='formControlLg' type='text' size="lg" autoComplete="off" style={{ fontSize: "16px" }} required />
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" autoComplete="off" style={{ fontSize: "16px" }} required />
                <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                  width: "100%",
                  placeSelf: "center",
                  color: "#2e0006",
                  backgroundColor: " #38b6ff",
                  border: "1px solid #38b6ff",
                }}
                ><span style={{ color: "#3f3d56" }}>{Sign}</span></button>
              </MDBCol>
            </>

          }
        </form>

      </ MDBContainer >

      <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />

    </Wrapper>
  );
}

export default Login;