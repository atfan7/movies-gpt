import { useEffect } from 'react'
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addUser,removeUser} from "../utils/userSlice"



const Header = () => {
  const dispatch = useDispatch();

  const navigate=useNavigate();
  const user =useSelector((store)=>store.user)
  

  const handleSignOut =()=>{

    signOut(auth).then(() => {
     
}).catch((error) => {
  navigate("/error")
});



  }
useEffect(()=>{

    const unsubscribe=  onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const {uid,email,displayName,photoURL} = user;
    dispatch(addUser({uid: uid, email :email, displayName :displayName,photoURL:photoURL}))
  navigate("/browse")
  }
  
  else {
    // User is signed out
    
    dispatch(removeUser());
    navigate("/")

  }
  });
  //Unsubscribe when component unmounts 

  return ()=> unsubscribe();

 },[]) 

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