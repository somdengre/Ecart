import React,{Fragment,useEffect,useState} from 'react'
import "./newProduct.css"
import { useParams,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import { clearErrors,updateProduct ,getProductDetails} from '../../actions/productAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData"
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from "./Sidebar"
import {UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

const UpdateProduct = () => {

    const params=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const productId = params.id;

    const {error,product} = useSelector((state)=> state.productDetails);
    const {loading,error:updateError,isUpdated} = useSelector((state) =>state.product);

    const [name,setName] = useState("");
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [Stock,setStock] = useState(0);
    const [images,setImages] = useState([]);
    const [oldImages,setOldImages] = useState([]);
    const [imagesPreview,setImagesPreview] = useState([]);

    const categories=[
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones"
    ]

    useEffect(()=>{

        if(product && product._id !== productId){
            dispatch(getProductDetails(productId));
            
        }else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
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
            toast.success("Product Updated Successfully");
            setTimeout(() => navigate("/admin/products"), 4000);
            dispatch({type:UPDATE_PRODUCT_RESET});
        }
    },[dispatch,toast,error,params,isUpdated,productId,product]);


    const updateProductSubmitHandler = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("Stock",Stock);

        images.forEach((image)=>{
            myForm.append("images",image);
        });
       
        dispatch(updateProduct(productId,myForm));
    }

    const updateProductImagesChange = (e) =>{
        console.log(e.target.files);
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload = () =>{
                if(reader.readyState===2){
                    setImagesPreview((old)=>[...old,reader.result])
                    setImages((old)=>[...old,reader.result])
                }
            }

            reader.readAsDataURL(file);
        })
    }

  return (
    <Fragment>
        <ToastContainer autoClose={3000}/>
        <MetaData title="Create Product"/>
        <div className="dashboard">
            <SideBar/>
            <div className="newProductContainer">
                <form 
                className='createProductForm'
                encType='multipart/form-data'
                onSubmit={updateProductSubmitHandler}
                >
                    <h1>Create Product</h1>
                    <div>
                        <SpellcheckIcon/>
                        <input
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <AttachMoneyIcon/>
                        <input
                        type="number"
                        placeholder="Price"
                        required
                        onChange={(e)=> setPrice(e.target.value)}
                        value={price}
                        />
                    </div>
                    <div>
                        <DescriptionIcon/>
                        <textarea
                        placeholder="Description"
                        required
                        value={description}
                        cols="30"
                        rows="1"
                        onChange={(e)=> setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <AccountTreeIcon/>
                        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate)=>(
                                <option key={cate} value={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <StorageIcon/>
                        <input
                        type="number"
                        placeholder='Stock'
                        required
                        onChange={(e)=> setStock(e.target.value)}
                        value={Stock}
                        />
                    </div>
                    <div id="createProductFormFile">

                        <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProductImagesChange}
                        multiple
                        />
                    </div>
                    <div id="createProductFormImage">
                        {oldImages && oldImages.map((image,index)=>(
                            <img key={index} src={image.url} alt="Old Product Preview"/>
                        ))}
                    </div>
                    <div id="createProductFormImage">
                        {imagesPreview.map((image,index)=>(
                            <img key={index} src={image} alt="Product Preview"/>
                        ))}
                    </div>

                    <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading?true:false}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default UpdateProduct