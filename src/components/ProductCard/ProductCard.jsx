import React, { useState } from 'react'
import { motion } from 'framer-motion';
import './ProductCard.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import db from '../firebase';
import { textVariant } from '../../utils/motion';
import {deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { IoCloseCircleSharp } from 'react-icons/io5';
import Modal from 'react-modal';
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


function ProductCard(props) {

  console.log(props.index);
    const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

    function deleteProduct(){
        deleteDoc(doc(db,"Products",props.id)).then(
          ()=>{
            alert('Deleted Succesfully!')
          }
        );

    }

    const [inputs,setInputs] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      
    }
    
    
    const handleSubmit = (event) => {
      event.preventDefault();
      async function setFunction(){
        await setDoc(doc(db,'Products',props.id),inputs)
        .then(()=>{
            alert("Edited Successfully!")
            setIsOpen(false);
        });
      }
      setFunction();
    }

  return (
    <motion.div variants={textVariant()} initial="hidder" animate="show" className='product-card'>
        <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='card-item-1'>{props.name}</motion.div>
        <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='card-item-2'>{props.category}</motion.div>
        <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='card-item-3'>Rs {props.price}</motion.div>
        <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='card-item-4'>{props.stock} pcs</motion.div>
        <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='card-item-5'><FaEdit onClick={openModal}/><MdDelete onClick={deleteProduct}/></motion.div>




        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal-heading'>
          <div>Edit Item</div>
          <div><IoCloseCircleSharp onClick={closeModal} className='modal-icon'/></div>
        </div>
        
        <form className='form-input' onSubmit={handleSubmit}>

          <label className='input-label '>Product Name</label>
          <input className='input-product' type='text' name='name' onChange={handleChange} defaultValue={props.name}/>
          <label className='input-label'>Category</label>
          <input className='input-product' type='text' name='category' onChange={handleChange} defaultValue={props.category}/>
          <label className='input-label' >Price</label>
          <input className='input-product' type='number' name='price' onChange={handleChange} defaultValue={props.price}/>
          <label className='input-label' >Stock</label>
          <input className='input-product' type='number' name='stock' onChange={handleChange} defaultValue={props.stock}/>
          <button className='button-add' type='submit'>Edit Item</button>
        </form>
      </Modal>
    </motion.div>
  )
}

export default ProductCard