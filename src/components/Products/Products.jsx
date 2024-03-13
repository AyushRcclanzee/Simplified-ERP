import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import './Products.css'
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { MdControlCamera } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import ProductCard from '../ProductCard/ProductCard';
import db from '../firebase';
import { collection,getDocs, setDoc, doc } from "firebase/firestore"; 
import { IoCloseCircleSharp } from "react-icons/io5";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: ' 30vw',
    height:'60vh'
  }
};


const Products = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }


  const [inputs,setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  
  const handleSubmit = (event) => {
    event.preventDefault();
    async function seFunction(){
      await setDoc(doc(db,'Products',inputs.name),inputs)
      .then(()=>{
        alert("Added Successfully!")
        setIsOpen(false)
        
      });
    }
    seFunction();
  }

  const [prodData,setProdData] = useState([]);
  
  useEffect(() => {
    const productData = collection(db, "Products");
    async function myFunction(){
      const snapshot = await getDocs(productData);
      const data = [];
      snapshot.forEach(doc=>{
        data.push(doc.data());
      })
      setProdData(data);
    }
    myFunction()
    
  },[])


  

  return (
    <div className='products-main'>
      <div className='products-heading'>
        <div className='p-head'><div>Products</div><div className='p-head-sub'>Add, Delete and Edit Products on the go</div></div>
        <div className='p-create-button' onClick={openModal}>Add +</div>
      </div>

      <div className='product-table-head'>
        <div className='t-h-names'><MdDriveFileRenameOutline className='p-t-h-icons'/>Product Name</div>
        <div className='t-h-names'><MdCategory className='p-t-h-icons'/>Category</div>
        <div className='t-h-names'><FaRupeeSign className='p-t-h-icons'/>Price</div>
        <div className='t-h-names'><MdInventory className='p-t-h-icons'/>Stock</div>
        <div className='t-h-names'><MdControlCamera className='p-t-h-icons'/>Actions</div>
      </div>

      <div className='items-list'>
        {prodData.map((e, index)=>
          <ProductCard index = {index} name={e.name} category = {e.category} price = {e.price} stock = {e.stock} id={e.name}/>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal-heading'>
          <div>Add Item</div>
          <div><IoCloseCircleSharp onClick={closeModal} className='modal-icon'/></div>
        </div>
        
        <form className='form-input' onSubmit={handleSubmit}>

          <label className='input-label'>Product Name</label>
          <input className='input-product' type='text' name='name' onChange={handleChange}/>
          <label className='input-label'>Category</label>
          <input className='input-product' type='text' name='category' onChange={handleChange}/>
          <label className='input-label' >Price</label>
          <input className='input-product' type='number' name='price' onChange={handleChange}/>
          <label className='input-label' >Stock</label>
          <input className='input-product' type='number' name='stock' onChange={handleChange}/>
          <button className='button-add' type='submit'>Add Item</button>
        </form>
      </Modal>

      
      
    </div>



  )
}

export default Products