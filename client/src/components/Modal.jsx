import './Components.scss'
import {useEffect} from "react"


const Modal = ({setModalOpen,contract}) => {

  const sharing=async()=>{
    const address = document.querySelector('.modal_input').value;
    // console.log(`Address: ${address}`);
    await contract.allow(address);

    // console.log("Sharing")
  }

  return (
    <div className="modalBackGround">
      <div className="modalContainer">
        <span>Share with</span>
        <form id="myForm">
          <input type="text" className='modal_input' placeholder='Enter address' />
          <select name="" id="seleceNumber">
            <option className='people_address'>People with access</option>

          </select>
        </form>
        <div className="footer">
          <button id="closeBTN" onClick={()=>setModalOpen(false)} >Close</button>
          <button onClick={sharing} >share</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
