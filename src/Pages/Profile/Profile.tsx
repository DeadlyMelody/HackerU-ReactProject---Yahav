import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userActions } from "../../Store/UserSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      axios.defaults.headers.common["x-auth-token"] =
        localStorage.getItem("token") || "";
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          user?._id,
      );
      dispatch(userActions.login(res.data));
    } catch (error) {
      Swal.fire({
        title: "failed!",
        icon: "error",
        timerProgressBar: true,
        timer: 2000,
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center gap-5 pt-20">
        <h1 className="mt-5 text-3xl dark:text-white">Profile Page </h1>
        <div className="max-w-full text-center">
          <Card
            className="h-[90%] max-w-sm border-black bg-gradient-to-l from-blue-100 to-purple-200
                                text-center
                                shadow-lg
                                shadow-slate-800
                                ring-slate-600 transition-all
                                duration-300
                                hover:opacity-95
                                dark:border-black
                                dark:bg-pink-400
                                dark:bg-gradient-to-r
                                dark:from-gray-700
                                dark:to-gray-800
                                dark:text-white
                                dark:shadow-slate-500 dark:ring-2"
            horizontal
          >
            <img
              src={user?.image.url}
              alt={user?.image.alt}
              className="m-auto h-[200px] w-[150px] object-fill"
            />

            <p className="text-lg font-semibold dark:text-white">
              Name:{" "}
              {user?.name.first +
                " " +
                user?.name.middle +
                " " +
                user?.name.last}
            </p>
            <p className="text-lg font-semibold dark:text-white">
              {" "}
              Email: {user?.email}
            </p>
            <p className="text-lg font-semibold dark:text-white">
              {" "}
              Phone: {user?.phone}
            </p>
            <p className="text-lg font-semibold dark:text-white">
              {" "}
              house Number: {user?.address.houseNumber}
            </p>
            <p className="text-lg font-semibold dark:text-white">
              Address:{" "}
              {user?.address.country +
                ", " +
                user?.address.city +
                ", " +
                user?.address.street}
            </p>

            <Button
              // size={20}
              className="m-auto bg-cyan-400 dark:border-black dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
              onClick={() => nav("/edit-user/" + user?._id)}
            >
              {" "}
              Edit{" "}
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
