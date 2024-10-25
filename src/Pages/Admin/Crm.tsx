import { useEffect, useState } from "react";
import { TUser } from "../../Types/TUser";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Card, Pagination } from "flowbite-react";
import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import UsePagination from "../../Hooks/UsePagination";
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";

const Crm = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const searchWord = useSelector(
    (state: TRootState) => state.SearchSlice.search,
  );

  const searchUsers = () => {
    return users.filter(
      (item: TUser) =>
        item.name.first.includes(searchWord) ||
        item.name.middle.includes(searchWord) ||
        item.name.last.includes(searchWord),
    );
  };
  const { onPageChange, currentInUse, totalPages, currentPage } =
    UsePagination(searchUsers);

  const getAllUsers = async () => {
    try {
      axios.defaults.headers.common["x-auth-token"] =
        localStorage.getItem("token");
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
      );
      setUsers(response.data);
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

  const editAuthLevel = async (user: TUser) => {
    try {
      await Swal.fire({
        title: "Are you sure you want to edit the auth level?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        background: "#6d6d6d",
        color: "#ffffff",
        confirmButtonText: "Yes, i'm sure!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("confirmed");
        }
      });
      axios.defaults.headers.common["x-auth-token"] =
        localStorage.getItem("token");
      const response = await axios.patch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          user._id,
        { isBusiness: !user.isBusiness },
      );

      if (response.status === 200) {
        const usersIndex = users.indexOf(user);
        const newUsersArray = [...users];
        newUsersArray[usersIndex].isBusiness = !user.isBusiness;
        setUsers(newUsersArray);
        Swal.fire({
          title: "You changed the authorisation level successfully",
          icon: "success",
          timerProgressBar: true,
          timer: 2000,
          background: "#6d6d6d",
          color: "#ffffff",
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
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

  //delete request
  const deleteUser = async (user: TUser) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete this user?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        background: "#6d6d6d",
        color: "#ffffff",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        axios.defaults.headers.common["x-auth-token"] =
          localStorage.getItem("token");
        await axios.delete(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
            user._id,
        );
        const newUsersArr = users.filter((item) => item._id !== user._id);
        setUsers(newUsersArr);
        setSelectedUser(null);
        Swal.fire({
          title: "User Is Deleted!",
          icon: "success",
          showConfirmButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          background: "#6d6d6d",
          color: "#ffffff",
          timerProgressBar: true,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "failed!",
        icon: "error",
        timerProgressBar: true,
        timer: 2000,
        toast: true,
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <TitleSection
          title={"Client Relations/Content Management"}
          p={
            "here you can View/Edit/Delete users, please click a record to view full details"
          }
        />

        <main className="flex justify-center gap-3">
          <div className="mt-20 max-w-[90vw] overflow-x-auto text-center">
            <table className="w-full table-auto">
              <thead className="bg-slate-200 dark:bg-gray-600 ">
                <tr>
                  <th className="px-4 py-2 text-gray-800 dark:text-white ">
                    Name
                  </th>
                  <th className="px-4 py-2 text-gray-800 dark:text-white">
                    Email
                  </th>
                  <th className="px-4 py-2 text-gray-800 dark:text-white">
                    Phone
                  </th>
                  <th className="px-4 py-2 text-gray-800 dark:text-white">
                    Authorization Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentInUse.map((item: TUser) => (
                  <tr
                    key={item._id}
                    className="cursor-pointer divide-y odd:bg-blue-400 even:bg-cyan-400 hover:bg-slate-400 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => setSelectedUser(item)}
                  >
                    <td className="border px-4 py-2 text-gray-800 dark:text-white">
                      {item.name.first +
                        " " +
                        item.name.middle +
                        " " +
                        item.name.last}
                    </td>
                    <td className="border px-4 py-2 text-gray-800 dark:text-white">
                      {item.email}
                    </td>
                    <td className="border px-4 py-2 text-gray-800 dark:text-white">
                      {item.phone}
                    </td>
                    <td className="border px-4 py-2 text-gray-800 dark:text-white">
                      {item.isAdmin
                        ? "Admin"
                        : item.isBusiness
                          ? "Business"
                          : "Personal"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/*-------------------user details----------------*/}
        {selectedUser && (
          <div className="flex flex-col items-center">
            <h1 className="mb-1 mt-8 text-xl font-medium text-gray-900 dark:text-white">
              {" "}
              More Details{" "}
            </h1>
            <Card
              key={selectedUser?._id}
              className=" dark:shadow-slate- mb-10 h-[350px]
                                w-[300px]
                                border-black bg-gradient-to-l
                                from-blue-100
                                to-purple-200 text-center
                                shadow-lg
                                shadow-slate-800
                                ring-slate-600 transition-all duration-300
                                hover:opacity-95
                                dark:border-black
                                dark:bg-pink-400
                                dark:bg-gradient-to-r
                                dark:from-gray-700
                                dark:to-gray-800
                                dark:text-white
                                dark:shadow-slate-500
                                dark:ring-2"
            >
              <h1>
                {selectedUser?.name.first +
                  " " +
                  selectedUser?.name.middle +
                  " " +
                  selectedUser?.name.last}
              </h1>
              <h1>{selectedUser?.email}</h1>
              <h1>{selectedUser?.phone}</h1>
              <h1>{selectedUser?.isBusiness ? "Business" : "Personal"}</h1>

              <div className="flex w-[100%] gap-5 text-center">
                <Button
                  gradientMonochrome="info"
                  className="w-[50%]"
                  onClick={() => editAuthLevel(selectedUser)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteUser(selectedUser)}
                  gradientMonochrome="failure"
                  className="w-[50%]"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          {isMobile ? (
            <div className="flex">
              <Button
                gradientMonochrome="cyan"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2"
              >
                Previous
              </Button>
              <Button
                gradientMonochrome="cyan"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          ) : (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Crm;
