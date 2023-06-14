import React,{Fragment,useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import SideBar from "./Sidebar"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { getUserDetails, updateUser ,clearErrors} from '../../actions/userAction'
import Loader from '../layout/loader/Loader'

const UpdateUser = () => {

    const navigate=useNavigate();
    const params=useParams();
    const dispatch=useDispatch();
    

    const {loading,error,user} = useSelector((state) =>state.userDetails);
    const {loading:updateLoading,error:updateError,isUpdated} = useSelector((state) =>state.profile);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const userId = params.id;


    useEffect(()=>{

        if(user && user._id !== userId){
            dispatch(getUserDetails(userId));
            
        }else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
           
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            toast.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            toast.success("User Updated Successfully");
            setTimeout(() => navigate("/admin/users"), 4000);
            dispatch({type:UPDATE_USER_RESET});
        }
    },[dispatch,toast,error,params,isUpdated,updateError,user,userId]);


    const updateUserSubmitHandler = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("role",role);
        myForm.set("email",email);

       
        dispatch(updateUser(userId,myForm));
    }


  return (
    <Fragment>
        <ToastContainer autoClose={3000}/>
        <MetaData title="Update User"/>
        <div className="dashboard">
            <SideBar/>
            <div className="newProductContainer">
                {loading ? <Loader/>:
                <form 
                className='createProductForm'
                onSubmit={updateUserSubmitHandler}
                >
                    <h1>Update User</h1>
                    <div>
                        <PersonIcon/>
                        <input
                        type="text"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <MailOutlineIcon/>
                        <input
                        type="email"
                        placeholder="email"
                        value={email}
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <VerifiedUserIcon/>
                        <select value={role} onChange={(e)=>setRole(e.target.value)}>
                            <option value="">Choose Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            
                        </select>
                    </div>

                    
                    

                    <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={updateLoading?true:false  || role === "" ? true:false}
                    >
                        Update
                    </Button>
                </form>}
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateUser