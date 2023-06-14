import React,{Fragment,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css"
import {useSelector,useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import {getAllUsers,clearErrors, deleteUser} from "../../actions/userAction"
import { DELETE_USER_RESET } from '../../constants/userConstants'

const UsersList = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const {error,users} =useSelector(state=> state.allUsers);
    const {error:deleteError,isDeleted,message} = useSelector(state=>state.profile);

    const deleteUserHandler = (id)=>{
        dispatch(deleteUser(id));
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            toast.success(message);
            setTimeout(() => navigate("/admin/users"), 4000);
            dispatch({type:DELETE_USER_RESET})
        }
        dispatch(getAllUsers());
    },[dispatch,toast,error,deleteError,navigate,isDeleted,message]);

    const columns=[
        {field:"id",headerName:"User ID",minWidth:200,flex:0.5},
        {field:"email",headerName:"Email",minWidth:350,flex:0.7},
        {field:"name",headerName:"Name",minWidth:150,flex:0.3},
        {field:"role",headerName:"Role",minWidth:270,flex:0.5,type:"number",
        cellClassName:(params)=>{
            return (params.getValue(params.id,"role")==="admin"
            ?"greenColor"
            :"redColor")
        }},
        {field:"actions",headerName:"Actions",minWidth:150,flex:0.3,type:"number",sortable:false,
            renderCell:(params)=>{
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }    
        },

    ]

    const rows=[];

    users && 
    users.forEach((item)=>{
        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name
        });
    });

  return (
    <Fragment>
        <ToastContainer autoClose={3000}/>
        <MetaData title={`All USERS - Admin`}/>
        <div className="dashboard">
            <SideBar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL USERS</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />
            </div>
        </div>
    </Fragment>
  )
}

export default UsersList