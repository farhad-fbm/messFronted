import { Link, useNavigate } from "react-router-dom"
import { NavLinks } from "./NavLinks"
import { AuthContext } from "../../ContextProviders/AuthContextProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import { FaCircleUser } from "react-icons/fa6";
import { RxModulzLogo } from "react-icons/rx";


export const Navbar = () => {
  const {user, logout } = useContext(AuthContext);
  // const handleLogOut = () => {
  //   return logOut()
  //     .then(() => {
  //       toast.success('🦄 LogOut Succesfully !', {
  //         position: "top-center",
  //         autoClose: 1000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     })
  //     .catch()
  // };
  console.log(user?.role);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

 
  return (
    <nav className="max-w-4xl mx-auto flex justify-between pt-6 px-4 gap-x-16 bg-slate-200 rounded-lg font-bold">
      <div className="text-4xl"><RxModulzLogo/></div>
      <div className="flex justify-center gap-x-4"><NavLinks /></div>
      {
        user ?
          <div className="flex space-x-6">
            <p className='text-2xl hidden md:block'>{user?.name} <sub> {user?.role?.toUpperCase()}</sub></p>
            <div className="dropdown dropdown-end ">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className='w-11 '>
                  <img className='rounded-full bg-slate-500' src={user?.photoURL} alt="" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-32">
                <li><Link >Profile</Link></li>
                <li><Link >Settings</Link></li>
                <li> <Link onClick={handleLogout}>Logout</Link></li>
              </ul>
            </div>


          </div>
          :
          <div className="text-3xl mr-4"><FaCircleUser /></div>
      }

    </nav>
  )
}
