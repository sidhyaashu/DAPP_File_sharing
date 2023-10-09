import { useState } from 'react';
import './Components.scss'

const Display = ({contract,account}) => {

  const [data,setData] = useState(null)

  const getData=async()=>{
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    
    if(otherAddress){
      dataArray = await contract.display(otherAddress);
      console.log(`Other address: ${otherAddress}`);
    }else{
      dataArray = await contract.display(account)
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if(!isEmpty){
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str_array);
      // console.log(`str array ${str_array}`);

      const Image = str_array.map((item,i)=>{
        return (
          
            <a key={i} href={`https://azure-wonderful-bobolink-606.mypinata.cloud/ipfs${item.substring(6)}`} rel='noreferrer'  target="_blank">
            <img src={`https://azure-wonderful-bobolink-606.mypinata.cloud/ipfs${item.substring(6)}`} className='fetchedPhoto' key={i} alt="new" />
          </a>
          
        )
      })

      setData(Image)
    }else{
      alert("No Image to display");
    }


  }
  return (
    <div className="display">
      <div className="image_box" >
        {data ? data : ""}
      </div>
      
      <div className="box">
        <input type="text" className="address" placeholder='Enter Address' />
      <button onClick={getData} >Get Data</button>
      </div>
    </div>
  )
}

export default Display
