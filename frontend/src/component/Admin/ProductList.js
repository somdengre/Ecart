import React,{Fragment,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css"
import {useSelector,useDispatch} from "react-redux"
import { clearErrors,getAdminProduct,deleteProduct } from '../../actions/productAction'
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductList = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const {error,products} =useSelector(state=> state.products);
    const {error:deleteError,isDeleted} = useSelector(state => state.product);

    const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id));
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
            toast.success("Product Deleted Successfully");
            setTimeout(() => navigate("/admin/dashboard"), 4000);
            
            dispatch({type:DELETE_PRODUCT_RESET})
        }
        dispatch(getAdminProduct());
    },[dispatch,toast,error,deleteError,navigate,isDeleted]);

    const columns=[
        {field:"id",headerName:"Product ID",minWidth:200,flex:0.5},
        {field:"name",headerName:"Name",minWidth:350,flex:0.7},
        {field:"stock",headerName:"Stock",minWidth:150,flex:0.3,type:"number"},
        {field:"price",headerName:"Price",minWidth:270,flex:0.5,type:"number"},
        {field:"actions",headerName:"Actions",minWidth:150,flex:0.3,type:"number",sortable:false,
            renderCell:(params)=>{
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }    
        },

    ]

    const rows=[];

    products && 
    products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.Stock,
            price:item.price,
            name:item.name
        });
    });

  return (
    <Fragment>
        <ToastContainer autoClose={3000}/>
        <MetaData title={`All Proudcts - Admin`}/>
        <div className="dashboard">
            <SideBar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList