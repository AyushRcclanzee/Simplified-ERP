import React, { useEffect, useState } from 'react'
import './Orders.css'
import Modal from 'react-modal';
import { IoCloseCircleSharp, IoPersonSharp } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { GiShoppingBag } from "react-icons/gi";
import OrderCard from '../OrderCard/OrderCard';
import db from '../firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

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


const Orders = () => {
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
    const tempObj = inputs;
    const str = Number(Number(ordID)+1);
    tempObj.order_id = String(str);

    const date = Date().split(' ')[2]+' '+  Date().split(' ')[1] + ' ' + Date().split(' ')[3]
    tempObj.date = date;
    tempObj.status = 'Processing';
    setInputs(tempObj);
    event.preventDefault();

    const prodDetails = prodData.find(o => o.name === tempObj.name)
    prodDetails.stock = Number(Number(prodDetails.stock) - 1)
    async function seFunction(){
      await setDoc(doc(db,'Products',prodDetails.name),prodDetails)
      .then(()=>{
        console.log('Stock Updated Successfully!');
        
      });
    }
    seFunction();

    async function setFunction(){
      await setDoc(doc(db,"Orders",inputs.order_id),inputs)
      .then(()=>{
        alert("Order Placed Successfully!")
        setIsOpen(false)
        setOrdID(value=>value+1);
        
      })
      .catch((err)=>{
        alert("Something Wen't Wrong!")
        console.log(err);
      });
    }
    setFunction();
  }


  const [ordID,setOrdID] = useState(0);
  const [ordData,setOrdData] = useState([]);
  const orderData = collection(db, "Orders");
  useEffect(() => {
    async function myFunction(){
      const snapshot = await getDocs(orderData);
      
      const data = [];
      snapshot.forEach(doc=>{
        data.push(doc.data());
        setOrdID(data[data.length-1].order_id)
      })
      setOrdData(data);
    }
    myFunction()
    
  },[])

   const [prodData,setProdData] = useState([]);
  const productData = collection(db, "Products");
  function getList(){
    const data = []
    async function getName(){
      const snapshot =  await getDocs(productData)
      
      snapshot.forEach(doc=>{
        data.push(doc.data());
      })
      setProdData(data);
    }
    getName()
    }

    useEffect(()=>{getList()},[])
    


  return (
    <div>
      <div className='products-heading'>
        <div className='p-head'><div>Orders</div><div className='p-head-sub'>Track all the orders amazingly</div></div>
        <div className='p-create-button' onClick={openModal}>Add Order +</div>
      </div>

      <div className='product-table-head'>
        <div className='t-h-names'><FaShoppingCart className='p-t-h-icons'/>Order ID</div>
        <div className='t-h-names'><IoPersonSharp className='p-t-h-icons'/>Customer Name</div>
        <div className='t-h-names'><GiShoppingBag className='p-t-h-icons'/>Product Name</div>
        <div className='t-h-names'><BsCalendarDateFill className='p-t-h-icons'/>Order Date</div>
        <div className='t-h-names'><GoClockFill className='p-t-h-icons'/>Status</div>
      </div>

      <div className='items-list'>
        {ordData.map((e, index)=>
          <OrderCard index={index} name={e.name} customer_name = {e.customer_name} date = {e.date} order_id = {e.order_id} status={e.status}/>
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

          <label className='input-label'>Customer Name</label>
          <input className='input-product' type='text' name='customer_name' onChange={handleChange}/>
          <label className='input-label'>Product</label>
          <select className='input-select' name='name' onChange={handleChange}>
            {prodData.map((e)=>(<option value={e.name}>{e.name}</option>))}
          </select>
          <button className='button-add-1' type='submit'>Place Order</button>
        </form>
      </Modal>
    </div>
  )
}

export default Orders