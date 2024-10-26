import { useEffect, useState } from "react";
import { TUser } from "../../Types/TUser";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Card, Pagination } from "flowbite-react";
import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import UsePagination from "../../Hooks/UsePagination";
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import LazyLoad from "react-lazyload";

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
        title: "Failed!",
        icon: "error",
        timerProgressBar: true,
        timer: 2000,
        showCloseButton: true,
      });
    }
  };

  const editAuthLevel = async (user: TUser) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to edit the auth level?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I'm sure!",
      });

      if (result.isConfirmed) {
        axios.defaults.headers.common["x-auth-token"] =
          localStorage.getItem("token");
        const response = await axios.patch(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
          { isBusiness: !user.isBusiness },
        );

        if (response.status === 200) {
          const updatedUsers = users.map((u) =>
            u._id === user._id ? { ...u, isBusiness: !u.isBusiness } : u,
          );
          setUsers(updatedUsers);
          Swal.fire({
            title: "Authorization level changed successfully!",
            icon: "success",
            timerProgressBar: true,
            timer: 2000,
            showConfirmButton: false,
            showCloseButton: true,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        icon: "error",
        timerProgressBar: true,
        timer: 2000,
        showCloseButton: true,
      });
    }
  };

  const deleteUser = async (user: TUser) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete this user?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        axios.defaults.headers.common["x-auth-token"] =
          localStorage.getItem("token");
        await axios.delete(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
        );
        setUsers(users.filter((item) => item._id !== user._id));
        setSelectedUser(null);
        Swal.fire({
          title: "User deleted!",
          icon: "success",
          timerProgressBar: true,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        icon: "error",
        timerProgressBar: true,
        timer: 2000,
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen">
      <TitleSection
        title="Client Relations/Content Management"
        p="Here you can View/Edit/Delete users. Click a record to view full details."
      />

      <main className="flex justify-center gap-3">
        <div className="mt-20 max-w-[90vw] overflow-x-auto text-center">
          <table className="w-full table-auto">
            <thead className="bg-slate-200 dark:bg-gray-600">
              <tr>
                <th className="px-4 py-2 text-gray-800 dark:text-white">
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
                <LazyLoad key={item._id} height={50} offset={100} once>
                  <tr
                    className="cursor-pointer divide-y odd:bg-blue-400 even:bg-cyan-400 hover:bg-slate-400 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => setSelectedUser(item)}
                  >
                    <td className="border px-4 py-2 text-gray-800 dark:text-white">
                      {`${item.name.first} ${item.name.middle} ${item.name.last}`}
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
                </LazyLoad>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* User details and pagination controls */}
      {selectedUser && (
        <div className="flex flex-col items-center">
          <Card
            key={selectedUser._id}
            className="mb-10 h-[350px] w-[300px] shadow-lg"
          >
            <h1>{`${selectedUser.name.first} ${selectedUser.name.middle} ${selectedUser.name.last}`}</h1>
            <h1>{selectedUser.email}</h1>
            <h1>{selectedUser.phone}</h1>
            <h1>{selectedUser.isBusiness ? "Business" : "Personal"}</h1>
            <div className="flex w-full gap-5">
              <Button
                gradientMonochrome="info"
                onClick={() => editAuthLevel(selectedUser)}
              >
                Edit
              </Button>
              <Button
                gradientMonochrome="failure"
                onClick={() => deleteUser(selectedUser)}
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
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
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
  );
};

export default Crm;
