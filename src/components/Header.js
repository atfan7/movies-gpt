import React from 'react'
import { signOut} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Header = () => {

  const navigate=useNavigate();
  const user =useSelector((store)=>store.user)
  

  const handleSignOut =()=>{

    signOut(auth).then(() => {
     navigate("/")
}).catch((error) => {
  navigate("/error")
});



  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img 
        className='w-28 m-8'
        src='./logo1.png' alt='netflix'/>

        { user &&
          
          <div className='p-2 m-2 text-yellow-400 font-bold'>
          <button onClick={handleSignOut}>(Sign Out)</button>

        </div>
        }
        



    </div>
  )
}

export default Header