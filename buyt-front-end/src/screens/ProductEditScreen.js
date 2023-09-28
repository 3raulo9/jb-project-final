// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom'; // Updated imports
// import { Form, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import FormContainer from '../components/FormContainer';
// import { listProductDetails, updateProduct } from '../actions/productActions';
// import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

// function ProductEditScreen() {
//     const navigate = useNavigate(); // Updated hook
//     const { id } = useParams(); // Updated hook

//     const [name, setName] = useState('');
//     const [price, setPrice] = useState(0);
//     const [image, setImage] = useState('');
//     const [brand, setBrand] = useState('');
//     const [category, setCategory] = useState('');
//     const [countInStock, setCountInStock] = useState(0);
//     const [description, setDescription] = useState('');
//     const [uploading, setUploading] = useState(false);

//     const dispatch = useDispatch();

//     const productDetails = useSelector((state) => state.productDetails);
//     const { error, loading, product } = productDetails;

//     const productUpdate = useSelector((state) => state.productUpdate);
//     const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

//     useEffect(() => {
//         if (successUpdate) {
//             dispatch({ type: PRODUCT_UPDATE_RESET });
//             navigate('/admin/productlist'); // Use the navigate function
//         } else {
//             if (!product.name || product._id !== Number(id)) {
//                 dispatch(listProductDetails(id));
//             } else {
//                 setName(product.name);
//                 setPrice(product.price);
//                 setImage(product.image);
//                 setBrand(product.brand);
//                 setCategory(product.category);
//                 setCountInStock(product.countInStock);
//                 setDescription(product.description);
//             }
//         }
//     }, [dispatch, product, id, successUpdate, navigate]); // Include navigate in dependencies

//     const submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(
//             updateProduct({
//                 _id: id,
//                 name,
//                 price,
//                 image,
//                 brand,
//                 category,
//                 countInStock,
//                 description,
//             })
//         );
//     };

//     const uploadFileHandler = async (e) => {
//         const file = e.target.files[0];
//         const formData = new FormData();

//         formData.append('image', file);
//         formData.append('product_id', id);

//         setUploading(true);

//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             };

//             const { data } = await axios.post('/api/products/upload/', formData, config);

//             setImage(data);
//             setUploading(false);
//         } catch (error) {
//             setUploading(false);
//         }
//     };

//     return (
//         <div>
//             <Link to="/admin/productlist">Go Back</Link>

//             <FormContainer>
//                 <h1>Edit Product</h1>
//                 {loadingUpdate && <Loader />}
//                 {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

//                 {loading ? (
//                     <Loader />
//                 ) : error ? (
//                     <Message variant="danger">{error}</Message>
//                 ) : (
//                     <Form onSubmit={submitHandler}>
//                         {/* Rest of your form code */}
//                     </Form>
//                 )}
//             </FormContainer>
//         </div>
//     );
// }

// export default ProductEditScreen;
