import React,{ useState ,useEffect} from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import { Header,Footer } from './components'
import { Outlet } from 'react-router-dom'




function App() {

  const [loading, setLoading] = useState(true)
  const dispatch=useDispatch()

// app load hote hi useEffect execute hoga
  useEffect(()=>{
    authService.getCurrentUser()
// .then() means agar getCurrentUser() successfully mil gaya toh kya krna hai
      .then((userData) =>{
// error checking ki agar user data hai toh if part execute hoga
        if(userData){
          dispatch(login({userData}))
// agar userdata me error hai ya false hai toh else part execute hoga
        }else{
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        dispatch(logout()); // Handle error case by logging out
      })
// .finally() run hoga hi chahe kuch bhi ho jaye.....agar loading pura ho jata hai stat ko false kr dete hai
      .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className="min-h-sa flex flex-wrap content-between bg-gray-400">
       <div className="w-full block"> 
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
       </div>
    </div>
  ) :  (null)
}
export default App
