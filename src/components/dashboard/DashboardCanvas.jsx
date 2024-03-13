import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Tilt } from 'react-tilt'
import { Search } from 'lucide-react'
import {fadeIn} from '../../utils/motion'

const DashboardCard = ({ index, category, description, id, image, price, rating, title }) => {
  console.log("0");
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      initial="hidden"
      animate="show"
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-light1 p-5 max-xs:p-4 rounded-2xl sm:w-[360px] w-full max-xs:w-[90vw] h-[70vh] hover:shadow-card overflow-y-hidden"
      >
        <div>
          <div className="relative w-full h-[230px]">
            <img
              src={image}
              alt="product"
              className="w-full h-full object-cover rounded-2xl"
            />
            
          </div>

          <div className="mt-5">
            <h3 className="text-darkGrey font-bold text-[24px]">{title} - ${price}</h3>
            <p className="mt-2 text-darkPrimary text-[14px]">{description}</p>

          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

const DashboardCanvas = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('https://fakestoreapi.com/products');
          const data = await res.json();
          setProducts(data);
        }catch(err){
          console.error("Error fetching products: ", err);
        }
      };
      fetchData();
    }, [])
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              products.push(...json)
            console.log(products);
            console.log(json);})
  console.log(products+"h");
  return (

    <div>
      <span className='flex flex-row justify-center text-center align-middle items-center gap-5 mt-4 ml-4 mr-4 rounded-3xl p-3 focus-within:scale-105 transition-all delay-75'><Search className=''/>
      <input className='border rounded-3xl p-3' placeholder={`Search`}/>
      </span>
    <div className='ml-20 max-xs:ml-5 mt-20 max-xs:mt-10 flex flex-wrap gap-7 max-xs:gap-4'>

        {products.map((product, index) => (
  <DashboardCard
    key={`product-${index}`}
    index={index}
    category={product.category}
    description={product.description}
    id={product.id}
    image={product.image}
    price={product.price}
    rating={product.rating.rate}
    title={product.title}
  />
))}
    </div>
    </div>
  )
}

export default DashboardCanvas