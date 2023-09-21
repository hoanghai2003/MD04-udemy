import { useEffect, useState } from "react";
import HeaderAdmin from "../HeaderAdmin";
import NavbarAdmin from "../NavbarAdmin";
import "./UserAdmin.css";
import axios from "axios";

interface UserData {
  register_id: number;
  full_name: string;
  register_email: string;
  roles: number;
}

function UserAdmin() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/register/allUser")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container-header">
        <div className="header">
          <HeaderAdmin />
        </div>
        <div className="navbar">
          <NavbarAdmin />
          {/*  */}
          <div className="conatiner-useradmin">
            <div className="useradmin">
              <div className="iconusers">
                <i className="fa-solid fa-user-tag users"></i>
              </div>
              <i className="fa-solid fa-angle-right"></i>
              <span>User</span>
            </div>
            <div className="search-user">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          {/*  */}
          <div className="table-user">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Stt</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Chức vụ</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.register_id}</td>
                      <td>{user.full_name}</td>
                      <td>{user.register_email}</td>
                      <td>{user.roles === 0 ? "Admin" : "User"}</td>
                      <td>
                        <div className="btn-admin btn-user">
                          <button>Sửa</button>
                          <button>Xoá</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAdmin;
