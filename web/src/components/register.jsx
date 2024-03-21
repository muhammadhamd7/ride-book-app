import react, { useContext, useEffect, useRef, useState } from 'react'
import defaultImg from "../img/download.png"
import axios from 'axios'
import {GlobalContext} from "../context/context.jsx"
    import {useNavigate , Link} from "react-router-dom"
function UserRegister(){
  const { state , dispatch} = useContext(GlobalContext)
  const [image , setdpimage] = useState(defaultImg)
  const [position, setPosition] = useState(null);
  const history = useNavigate()

    const passwordref = useRef(null)
    const emailref = useRef(null)
    const nameref = useRef(null)
    const roleref = useRef(null)
    const [img , setImg] = useState()
    const specialistref = useRef(null)
    const [locationis, setlocation] = useState(null)
    const [role , setrole] = useState(null)
    const navigate =  useNavigate()

    const submitHandler = async(e)=>{
        e.preventDefault();
console.log('eee')
        try {

          const formdata = new FormData()
           
          formdata.append('email',emailref.current.value)
          formdata.append('password',passwordref.current.value)
          formdata.append('name',nameref.current.value)
          formdata.append('role',role)
          formdata.append('address',locationis)
          formdata.append('lat',position.latitude)
          formdata.append('long',position.longitude)
          formdata.append('ProfileImage',img)
           
          const response = await axios.post(
            'http://localhost:2344/api/auth/userregister',
             formdata,
            
            {
              withCredentials: true, // Use withCredentials instead of withCredential
            }
          )
          .then((res)=>{
            console.log(res)
            dispatch({
              type: "USER_LOGIN",
              payload: res.data.user,
            });
            history("/")
          })
          .catch((e)=>{
            console.log(e.response)
          })
    
          // Handle response as needed
          console.log(response);
        } catch (error) {
          // Handle errors
          console.error(error);
        }
      };
      useEffect(()=>{
        console.log(role)
      },[role])
      useEffect(() => {
        // Check if geolocation is supported by the browser
        if (!navigator.geolocation) {
          console.log('Geolocation is not supported by your browser');
          return;
        }
    
        // Get the current position
        const successHandler = (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        };
    
        const errorHandler = (error) => {
          console.error('Error getting geolocation:', error);
        };
    
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
      }, []); // Empty dependency array to run only once on component mount
      useEffect(() => {
        console.log(position)
        if (position) {
          const { latitude, longitude } = position;
          const apiKey = '65fa81fc79c33825484020zinf8a1d4';
    
          axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${apiKey}`,
          )
            .then((response) =>{
                setlocation(response.data.display_name)
            })
            
            
            .catch((error) => {
              console.error('Error fetching address:', error);
            });
        }
      }, [position]);    
      
    return(
        <>
        
        <div className='w-full flex flex-col items-center'>
        <h1 className='font-semibold text-4xl my-[20px]'>Register</h1>

            <form onSubmit={submitHandler} className='max-w-[600px] w-full  p-[20px]'>
               
                    
                   
            <div className='flex justify-center h-[80px] my-[10px] w-[80px]'>
                    <img className='overflow-hidden rounded-full w-full' src={image} alt=""onClick={(e)=>{
                      document.getElementById("inputimage").click()
}} />
                    <input type="file" id='inputimage' hidden onChange={(e)=>{
                      setdpimage(URL.createObjectURL(e.target.files[0]))
                      setImg(e.target.files[0])
                    }

                    }
                    
                     />
                </div>
                    
                    
                     
               
                <input type="text" placeholder='Enter Your name'  className='px-4 py-3 rounded border w-full my-[7px] bg-[#0A86FF24] outline-none'
                
                ref={nameref}
                
                />
                <input type="email" placeholder='Enter new email'  className='px-4 py-3 rounded border w-full my-[7px] bg-[#0A86FF24] outline-none'
               
                ref={emailref}
                
                />
                 <input type="text" placeholder='Enter your Ad'  className='px-4 py-3 rounded border w-full my-[7px] bg-[#0A86FF24] outline-none'
               
               value={locationis} 
               onChange={(e)=>{
                setlocation(e.target.value)
               }}
               
               />
                {/*
                <input type="text" placeholder='specialist in...'  className='px-4 py-3 rounded border w-full my-[7px] bg-[#0A86FF24] outline-none'
               
               ref={specialistref}
               
               /> */}
                <input type="password"  placeholder='Enter new password' className='px-4 py-3 rounded border w-full my-[7px] bg-[#0A86FF24] outline-none'
                ref={passwordref}
                />
                
                  <div className='flex gap-[10px] my-[10px]'>
                 <label htmlFor="" className='text-[#747474]'>
                 <input type="radio" value="Passenger" ref={roleref} onChange={()=>{setrole("Passenger")}} name='role' /> Passenger
                 </label>
                 <label htmlFor=""  className='text-[#747474]'>
                 <input type="radio" value="Driver" ref={roleref} onChange={()=>{setrole("Driver")}} name='role' /> Driver
                 </label>
                </div>
                <div className='flex gap-[5px] w-full items-center my-[30px]'>
                  <div className='bg-[#C8E3FF] h-[2px] w-full'></div>
                  <h1><Link to='/login'>or</Link> </h1>
                  <div className='bg-[#C8E3FF] h-[2px] w-full'></div>

                </div>
                <div className='flex justify-center'>
                <input type="submit" value="register" className='bg-violet-500 rounded shadow px-5 py-3 text-white font-semibold' />
                </div>
            </form>
        </div>
        </>
    )
}
export default UserRegister