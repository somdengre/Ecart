import React,{Fragment,useEffect,useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./productReviews.css"
import {useSelector,useDispatch} from "react-redux"
import { clearErrors,getAllReviews, deleteReviews} from '../../actions/productAction'
import { useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar"
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

const ProductReviews = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {error:deleteError,isDeleted} = useSelector(state => state.review);
    const {error,reviews,loading} =useSelector(state=> state.productReviews);
    const [productId, setProductId] = useState("")

    const deleteReviewHandler = (reviewId)=>{
        dispatch(deleteReviews(reviewId,productId));
    }

    const productReviewsSubmitHandler = (e) =>{
      e.preventDefault();
      dispatch(getAllReviews(productId));
    }

    useEffect(()=>{

        if(productId.length===24){
          dispatch(getAllReviews(productId));
        }

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            toast.success("Review Deleted Successfully");
            setTimeout(() => navigate("/admin/reviews"), 4000);
            dispatch({type:DELETE_REVIEW_RESET})
        }
        
    },[dispatch,toast,error,deleteError,navigate,isDeleted,productId]);

    const columns=[
        {field:"id",headerName:"Review ID",minWidth:200,flex:0.5},
        {field:"user",headerName:"User",minWidth:350,flex:0.7},
        {field:"comment",headerName:"Comment",minWidth:150,flex:0.3},
        {field:"rating",headerName:"Rating",minWidth:270,flex:0.5,type:"number",
        cellClassName:(params)=>{
          return (params.getValue(params.id,"rating") >=3
          ?"greenColor"
          :"redColor")
      }},
        {field:"actions",headerName:"Actions",minWidth:150,flex:0.3,type:"number",sortable:false,
            renderCell:(params)=>{
                return (
                    <Fragment>
                        <Button onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }    
        },

    ]

    const rows=[];

    reviews && 
    reviews.forEach((item)=>{
        rows.push({
            id:item._id,
            rating:item.rating,
            comment:item.comment,
            user:item.name
        });
    });

  return (
    <Fragment>
        <MetaData title={`All REVIEWS - Admin`}/>
        <div className="dashboard">
            <SideBar/>
            <div className="productReviewContainer">
            <form 
                className='productReviewsForm'
                onSubmit={productReviewsSubmitHandler}
                >
                    <h1 className='productReviewsFormHeading'>All Reviews</h1>
                    <div>
                        <StarIcon/>
                        <input
                        type="text"
                        placeholder="Product Id"
                        required
                        value={productId}
                        onChange={(e)=> setProductId(e.target.value)}
                        />
                    </div>
                   
                    
                   

                    
                    

                    <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading?true:false  || productId === "" ? true:false}
                    >
                        Search
                    </Button>
                </form>
                {reviews && reviews.length > 0 ? <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                    autoHeight
                />:<h1 className='productReviewsFormHeading'>No Reviews Found</h1>}
            </div>
        </div>
    </Fragment>
  )
}

export default ProductReviews