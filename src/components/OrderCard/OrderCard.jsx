import React, { useState } from 'react'
import './OrderCard.css'
import { textVariant } from '../../utils/motion';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import db from '../firebase';
import { IoCloseCircleSharp } from 'react-icons/io5';
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


function OrderCard(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }
  
      function deleteOrder(){
          deleteDoc(doc(db,"Orders",props.order_id)).then(
            ()=>{
              alert('Order Deleted Succesfully!')
            }
          );
  
      }

      const [inputs,setInputs] = useState({});

    const handleChange = (event) => {
      const value = event.target.value;
      const obj = {status:value};
      setInputs(obj)
      
    }
    
    
    const handleSubmit = (event) => {
      event.preventDefault();
      let orderDetails = {
        order_id:props.order_id,
        customer_name:props.customer_name,
        name:props.name,
        date:props.date,
        status: inputs.status
      }
      async function setFunction(){
        await setDoc(doc(db,'Orders',props.order_id),orderDetails)
        .then(()=>{
            alert("Updated Successfully!")
            setIsOpen(false);
        });
      }
      setFunction();
    }


  return (
    <div  >
        <div className='order-card' onClick={openModal}>
          <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='ocard-item-1' onClick={openModal}>{props.order_id}</motion.div>
          <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='ocard-item-2'>{props.customer_name}</motion.div>
          <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='ocard-item-3'>{props.name}</motion.div>
          <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='ocard-item-4'>{props.date}</motion.div>
          <motion.div variants={textVariant(props.index * 0.15)} initial="hidden" animate="show" className='ocard-item-5'>{props.status}</motion.div>
        </div>
        


        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal-heading'>
          <div>Order Details</div>
          <div><IoCloseCircleSharp onClick={closeModal} className='modal-icon'/></div>
        </div>

        <div className='order-details'>
            <div className='order-details-info'>Order ID: {props.order_id}</div>
            <div className='order-details-info'>Customer Name: {props.customer_name}</div>
            <div className='order-details-info'>Product: {props.name}</div>
            <div className='order-details-info'>Order Date: {props.date}</div>
            
        </div>

        <form className='form-input' onSubmit={handleSubmit}>
          <label className='input-label'>Status</label>
          <select className='input-select' type='text' name='status' onChange={handleChange}>
            <option value='Processing'>Processing</option>
            <option value='Shipped'>Shipped</option>
            <option value='Delivered'>Delivered</option>
          </select>
          <button className='button-add-1' type='submit'>Update Order</button>
          
          
        </form>
        <button className='button-add-2' onClick={deleteOrder}>Delete Order</button>
        
      </Modal>
    </div>
  )
}

export default OrderCard