import { useState } from "react";
import '../../assets/styles/employee/profile.css';

function Profile() {

  const [profile, setProfile] = useState({
    name: "Sadiya Syed",
    id: "17",
    department: "HR",
    email: "sadiya@email.com",
    phone: "9876543210",
    address: "Palanpur"
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile-container">

      <h2>Employee Profile</h2>

      <table className="profile-table">

        <tbody>

          <tr>
            <td>Name</td>
            <td>
              <input type="text" name="name" value={profile.name} onChange={handleChange} />
            </td>
          </tr>

          <tr>
            <td>Id</td>
            <td>
              <input
                type="text"
                name="id"
                value={profile.id}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Department</td>
            <td>
              <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Phone</td>
            <td>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </td>
          </tr>

          <tr>
            <td>Address</td>
            <td>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
              />
            </td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default Profile;