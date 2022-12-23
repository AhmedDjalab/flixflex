import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../services/firebase";
import Avatar from "./Avatar";
function Header() {
  const [user] = useAuthState(auth);

  return (
    <div
      className="flex text-[#59585D] mt-5  h-10 justify-between  
    border-b-2 border-[#111013] 	
    mx-4
    "
    >
      <div>
        <ul className="flex gap-6 list-none ">
          <li className="cursor-pointer hover:text-white">
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li className="cursor-pointer hover:text-white">
            <NavLink to="/series">Series</NavLink>
          </li>
        </ul>
      </div>

      {!user ? (
        <div className="flex justify-end flex-1 gap-6 ">
          <NavLink className="cursor-pointer hover:text-white" to="/login">
            Login
          </NavLink>
          <NavLink className="cursor-pointer hover:text-white" to="/signup">
            Signup
          </NavLink>
        </div>
      ) : (
        <div className="flex justify-end flex-1 gap-6">
          <Avatar email={user.email!} />
          <NavLink onClick={logout} className="hover:text-white" to="/">
            Signout
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Header;
