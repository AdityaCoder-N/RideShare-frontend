import React,{useRef, useState,useContext} from 'react'
import close from '../assets/x-circle-fill.svg'
import UserContext from '../context/UserContext'
import Cookies from 'js-cookie'

const Verification = () => {

    const {user} = useContext(UserContext)
    const authToken = Cookies.get('authToken');
    const host='http://localhost:3001'

    const [formData,setFormData]=useState({name:'',dob:"",dlNumber:'',state:''})
    const [userImage,setUserImage] = useState(null);
    const onchange = (e)=>{
       
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const [show,setShow] = useState(false)

    let dlPhoto = useRef(null)
    let videoRef = useRef(null);
    let photoRef= useRef(null);
    const openCam = ()=>{

        navigator.mediaDevices.getUserMedia({
            video:true
        }).then((stream)=>{
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch((error)=>{
            console.log(error)
        })
        setShow(true);

    }
    const closeCam = () => {
        let video = videoRef.current;
        let stream = video.srcObject;
    
        if (stream) {
            let tracks = stream.getTracks();
    
            tracks.forEach(track => track.stop());
            video.srcObject = null;
        }
        setShow(false);
    };

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
      
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
      
        return new Blob([ab], { type: 'image/jpeg' });
      }
    const takePicture=()=>{
        let width=300;
        let height=300/(16/9);

        let photo = photoRef.current;
        let video = videoRef.current;

        photo.height=height;
        photo.width=width;

        let context = photo.getContext('2d');
        context.drawImage(video,0,0,photo.width,photo.height);

        const imageDataUrl = photo.toDataURL('image/jpeg');
        const blobData = dataURItoBlob(imageDataUrl);

        // Create a File object from the Blob
        const imageFile = new File([blobData], 'live_image.jpg', { type: 'image/jpeg' });

        setUserImage(imageFile);
    }

    const onsubmit = async (e) => {
        e.preventDefault();
      
        if(!userImage){
            alert("Please Click your live Image");
            return;
        }

        console.log(dlPhoto.current.files)
        // Create a FormData object
        const actualformData = new FormData();
      
        // Append form data
        actualformData.append('name', formData.name);
        actualformData.append('dob', formData.dob);
        actualformData.append('lisenceNumber', formData.dlNumber);
        actualformData.append('id',user._id)
        actualformData.append('state',formData.state)
        // console.log(user)
        
        // Append image files
        actualformData.append('dl_photo', dlPhoto.current.files[0]); 
        actualformData.append('profile', userImage); 
        
        console.log(user)
        
        try {
            const response = await fetch(`${host}/request/make-request`, {
                method: 'POST',
                headers:{
                    'auth-token':authToken
                },
                body: actualformData,
            });
            
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
    <div className='h-[92vh] flex justify-center items-center bg-image '>

        <form onSubmit={onsubmit} className='bg-[rgba(255,255,255,0.28)] rounded-xl px-8 py-4 backdrop-blur-md '>
            <h2 className='text-4xl font-bold'>Verify Yourself</h2>
            <p className='text-lg mb-4'>To be able to create rides , it is important to verify yourself wit the platform.</p>

            <div className='flex flex-col gap-1 mt-6'>
                <label htmlFor="" className='font-semibold ml-1'>Name</label>
                <input
                    name="name" placeholder="As per your Govt. ID" type="text"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.name}
                    onChange={onchange}
                    required
                />
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Date Of Birth (as per ID)</label>
                
                <input
                    name="dob" placeholder="Enter valid date" type="date"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.dob}
                    onChange={onchange}
                    required
                />
                
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>State</label>
                <input
                    name="state" placeholder="Indian State which approved the DL" type="text"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.state}
                    onChange={onchange}
                    required
                />
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Driving Lisence Number</label>
                <input
                    name="dlNumber" placeholder="Give correct DL Number for verification" type="text"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.dlNumber}
                    onChange={onchange}
                    required
                />
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Driving Lisence Photo</label>
                <input type="file" ref={dlPhoto}/>
            </div>
            <div className='flex items-center gap-4 my-4'>
                <label htmlFor="" className='font-semibold ml-1'>Driver Photo</label>
                <input type="file" className='hidden'/>
                <span className='cursor-pointer py-1 px-2 rounded-lg outline-none bg-[#192e48] text-white hover:bg-[#0f1a27]' onClick={openCam}> Click Live Image </span>
            </div>
            <div className='flex flex-col gap-1 mt-4 cursor-pointer'>
                
                <button
                    type='submit'
                    className='py-3 px-2 w-full rounded-xl outline-none bg-[#192e48] text-white hover:bg-[#0f1a27]'>
                        Submit</button>
                
            </div>


        </form>
        {
            show &&
            <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 p-4 bg-white'>

                <img src={close} alt="" className='absolute right-[5%] top-[5%] cursor-pointer z-50 h-[25px] w-[25px]' onClick={closeCam}/>

                <div className='flex gap-5 w-full'>
                    <video ref={videoRef} className='w-[50%]'></video>
                    <canvas ref={photoRef} className='w-[50%]'></canvas>

                </div>

                <button className='py-3 px-2 w-full rounded-xl outline-none bg-[#192e48] text-white hover:bg-[#0f1a27] mt-5' onClick={takePicture}>Click Selfie</button>
                <button className='py-3 px-2 w-full rounded-xl outline-none bg-[#192e48] text-white hover:bg-[#0f1a27] mt-5' onClick={closeCam}>Save Image</button>
                
            </div>
        }
        
    </div>
  )
}

export default Verification