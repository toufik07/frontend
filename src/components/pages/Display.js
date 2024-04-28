
import axios from 'axios';
import { Button } from 'reactstrap';

import getSymbolFromCurrency from 'currency-symbol-map';
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
const Display = () => {
    const location = useLocation()
    const [product,setProduct]=useState({});
    
    useEffect(async()=>{

        const id = location.state.id
        const data =await axios.get(`http://localhost:3000/data/`+id);
        console.log("Data:",data);
        setProduct(data.data)
    },[])
    console.log("PRoduct details:",product);
    return ( 
       <div className="cone">
           <div className="con" style={{display:"inline-block"}}>
           <img src={product.image} alt="" width="300px" style={{padding:'10px'}} />
           </div>
           <div style={{display:"inline-block",border:"1px solid red"}}>
           <p style={{marginTop:"-10px"}}>{product.name}</p>
           <p>{product.dis}</p>

            <p style={{marginTop:"-10px"}}>{product.rating}</p>
            <h3 style={{marginTop:"-10px"}}>{getSymbolFromCurrency('INR')}{product.price}</h3>
            <Button color="warning" >Add to cart</Button>{' '}
            <Button color="danger" outline>Buy now</Button>
           </div>
        </div>
        
    );
}
 
export default Display;