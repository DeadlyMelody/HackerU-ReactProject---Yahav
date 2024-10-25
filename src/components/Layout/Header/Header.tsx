import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { searchActions } from "../../../Store/SearchSlice";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const isLoggedIn = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        axios.defaults.headers.common["x-auth-token"] = token;
        const user = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${(jwtDecode(token) as { _id: string })._id}`,
        );
        dispatch(userActions.login(user.data));
      })();
    }
  }, [dispatch]);

  const handleAdminProfile = () => {
    nav(isLoggedIn?.isAdmin ? "/profile" : "/*");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "#6d6d6d",
      color: "#ffffff",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        dispatch(userActions.logout());
        Swal.fire({
          title: "You Logged Out!",
          icon: "success",
          timerProgressBar: true,
          timer: 2000,
          background: "#6d6d6d",
          color: "#ffffff",
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
      nav("/");
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchActions.searchWord(e.target.value));
  };

  return (
    <Navbar
      fluid
      rounded
      className="fixed z-50 w-full bg-gradient-to-r from-cyan-400 to-blue-900 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
    >
      {/* ---------------IMAGE & LOGO------------------ */}
      <Navbar.Brand as={Link} to="/">
        <img
          src="/guyface.png"
          alt="nerdy nerd"
          className="mr-2 w-10 rounded-full"
        />
        <span className="dark:text-container self-center whitespace-nowrap text-2xl font-semibold text-pink-950 dark:text-white">
          Yahav
        </span>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Brand className="flex flex-col gap-1 md:flex-row ">
          {/* ---------------Links to the Home page------------------ */}
          <Navbar.Link
            as={Link}
            to="/home"
            active={location === "/home"}
            className="ml-2"
          >
            Home
          </Navbar.Link>
          {/* ---------------Links to the MyFavorits page.------------------ */}
          {isLoggedIn && (
            <Navbar.Link
              as={Link}
              to="/favoritecards"
              active={location === "/favoritecards"}
            >
              Fav Cards
            </Navbar.Link>
          )}
          {/* ---------------Links to the MyCards Page------------------ */}
          {isLoggedIn?.isBusiness && (
            <Navbar.Link
              as={Link}
              to="/mycards"
              active={location === "/mycards"}
            >
              My Cards
            </Navbar.Link>
          )}
          {/* ---------------Links to the About Page------------------ */}
          <Navbar.Link
            as={Link}
            to="/about"
            active={location === "/about" || location === ""}
            className="ml-2"
          >
            About
          </Navbar.Link>
          {/* ---------------Links to the SignUp Page------------------ */}
          {!isLoggedIn ? (
            <>
              <Navbar.Link
                as={Link}
                to="/signup"
                active={location === "/signup"}
              >
                Sign Up
              </Navbar.Link>
              {/* ---------------Links to the Login Page------------------ */}
              <Navbar.Link as={Link} to="/login" active={location === "/login"}>
                Login
              </Navbar.Link>
            </>
          ) : (
            <>
              {/* ---------------Logs the user out------------------ */}
              <Navbar.Link className="cursor-pointer" onClick={handleLogout}>
                LogOut
              </Navbar.Link>
              {/* ---------------Links to the Profile Page------------------ */}
              {!isLoggedIn.isAdmin && (
                <Navbar.Link
                  as={Link}
                  to="/profile"
                  active={location === "/profile"}
                >
                  Profile
                </Navbar.Link>
              )}
            </>
          )}
          {/* ---------------Links to the CRM Page------------------ */}
          {isLoggedIn?.isAdmin && (
            <Navbar.Link as={Link} to="/crm" active={location === "/crm"}>
              CRM
            </Navbar.Link>
          )}
          {/* ---------------A search input------------------ */}
          <TextInput
            rightIcon={IoIosSearch}
            onChange={handleSearch}
            placeholder="Search..."
          />
          {/* ---------------An image to the admin's profile------------------ */}
          <Navbar.Brand onClick={handleAdminProfile}>
            <img
              src="/admin.jpg"
              alt="admin's profile rabbit icon"
              className="mr-2 w-10 cursor-pointer rounded-full"
            />
          </Navbar.Brand>
          <DarkThemeToggle className="flex flex-col gap-3 md:flex-row" />
        </Navbar.Brand>
      </Navbar.Collapse>
      <div className="mx-auto mt-2 h-[3px] w-9/12 bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
    </Navbar>
  );
};

export default Header;
