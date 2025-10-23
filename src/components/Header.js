import { useEffect } from 'react'
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addUser,removeUser} from "../utils/userSlice"
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();

  const navigate=useNavigate();
  const user =useSelector((store)=>store.user)
  const showGptSearch= useSelector((store)=> store.gpt.showGptSearch)
  

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

 },[dispatch,navigate]) 

 const handleGptSearchClick=()=>{
  //Toggle GPT Search
  dispatch(toggleGptSearchView())


 }

 const handleLanguageChange=(e)=>{
  dispatch(changeLanguage(e.target.value))



 }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <img 
        className='w-44 mx-auto md:mx-0'
        src='./logo1.png' alt='netflix'/>

        { user &&
          <div className='flex items-center space-x-2 p-1 justify-between'> 
          
          {showGptSearch &&

            <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>

            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            
            


          </select>
          }
          <button className="p-2 m-2 text-white font-bold bg-purple-600 rounded-lg text-l"
          onClick={handleGptSearchClick}>
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
  
          <button onClick={handleSignOut} className="p-1 text-white font-bold">
          (Sign Out)
         </button>
         </div>

        }
        



    </div>
  )
}

export default Header