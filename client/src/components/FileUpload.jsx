import { useState ,useRef} from 'react'
import './Components.scss'
import axios from "axios"
import secrets from "./utils"


const FileUpload = ({contract,account,provider}) => {
    const fileRef = useRef();
    const [file,setFile] = useState(null)
    const [fileName,setFileName] = useState("No image selected")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(file){
            try {
                const fileData = new FormData()
                fileData.append("file", file)

                const resFile = await axios({
                    method:"POST",
                    url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data:fileData,
                    headers:{
                        pinata_api_key:`${secrets.PINATA_API_KEY}`,
                        pinata_secret_api_key:`${secrets.PINATA_SECRET_KEY}`,
                        "Content-Type":"multipart/form-data",
                    }
                });

                const HashedImage = `ipfs://${resFile?.data?.IpfsHash}`;
                // console.log(HashedImage)
                contract.add(account,HashedImage)
                alert("Succesfully Image Uploaded")
                setFileName("No image selected")
                setFile(null)
            } catch (error) {
                alert("Unable to upload image: " + error.message)
            }
        }
    }

    const retriveData=(e)=>{
        const data = e.target.files[0]; // array of files object
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(data)
        reader.onloadend = ()=>{
            setFile(e.target.files[0])
        }
        setFileName(e.target.files[0].name)
        e.preventDefault()
    }

  return (
    <div className="top">
        <form onSubmit={handleSubmit}>
            <label htmlFor="file-upload" ref={fileRef} >
                Choose an Image

            </label>
            <input type="file" style={{display:"none"}} ref={fileRef} disabled={!account} id="file-upload" name="data" onChange={retriveData} />
            <span>{fileName}</span>
            <button type='submit' disabled={!file} >Upload File</button>
        </form>
    </div>
  )
}

export default FileUpload
