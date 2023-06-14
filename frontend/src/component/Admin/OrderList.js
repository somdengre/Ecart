import React,{Fragment,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css"
import {useSelector,useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"

import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar"
import {deleteOrder, getAllOrders,clearErrors} from "../../actions/orderAction"
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderList = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const {error,orders} =useSelector(state=> state.allOrders);
    const {error:deleteError,isDeleted} = useSelector(state => state.order);

    const deleteOrderhandler = (id)=>{
        dispatch(deleteOrder(id));
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
            toast.success("Order Deleted Successfully");
            setTimeout(() => navigate("/admin/orders"), 4000);
           
            dispatch({type:DELETE_ORDER_RESET})
        }
        dispatch(getAllOrders());
    },[dispatch,toast,error,deleteError,navigate,isDeleted]);

    const columns=[
        {field:"id",headerName:"Order ID",minWidth:300,flex:0.8},
        {field:"status",headerName:"Status",minWidth:150,flex:0.5,
        cellClassName:(params)=>{
            return (params.getValue(params.id,"status")==="Delivered"
            ?"greenColor"
            :"redColor")
        }},
        {field:"itemsQty",headerName:"Items Qty",type:"number",minWidth:150,flex:0.3},
        {field:"amount",headerName:"Amount",type:"number",minWidth:150,flex:0.5},
        {field:"actions",headerName:"Actions",minWidth:150,flex:0.3,type:"number",sortable:false,
            renderCell:(params)=>{
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={()=>deleteOrderhandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }    
        },

    ]

    const rows=[];

    orders && 
    orders.forEach((item)=>{
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            status:item.orderStatus,
            amount:item.totalPrice
        });
    });

  return (
    <Fragment>
                <ToastContainer autoClose={3000}/>

        <MetaData title={`All Orders - Admin`}/>
        <div className="dashboard">
            <SideBar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL ORDERS</h1>
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

export default OrderList