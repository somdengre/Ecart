import React, { Fragment, useEffect, useState } from 'react'
import "./ForgotPassword.css"
import Loader from "../layout/loader/Loader"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, forgotPassword } from '../../actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../layout/MetaData'

const ForgotPassword = () => {


    const dispatch = useDispatch();
   

    const [email,setEmail] = useState("");
    
    const { error, message, loading } = useSelector(state => state.forgotPassword)
    


    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
       
        myForm.set("email", email);

        
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (message) {

            toast.success(message);

        }
    }, [dispatch, error, toast, message])


  return (
    <Fragment>
        <ToastContainer autoClose={3000}/>
            {loading ? <Loader/> :
            <Fragment>
            <MetaData title="Forgot Password"/>
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">

                    <h2 className='forgotPasswordHeading' >Forgot Password</h2>
                    <form className="forgotPasswordForm"  onSubmit={forgotPasswordSubmit}>


                        
                        <div className="forgotPasswordEmail">
                            <MailOutlineIcon />
                            <input type="emial" placeholder='Email' required name='email' value={email} onChange={(e)=> setEmail(e.target.value)}
/>
                        </div>

                        
                        <input type="submit" value="Send" className="forgotPasswordBtn" />

                    </form>
                </div>
            </div>
        </Fragment>}
        </Fragment>
  )
}

export default ForgotPassword