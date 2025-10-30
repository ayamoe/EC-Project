import { Button } from "@mui/material";
import { getTeacher, setTeacher } from "../api/axiosConfig";
import { useState } from "react";
import { useApp } from "../ThemedApp";

const TeacherList = () => {
  const [teacher, setTea] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const { mode, setMode, teachers } = useApp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTea((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (!teacher.name || !teacher.email || !teacher.phone) {
      setError("❌ Please fill in all the fields.");
      return;
    }

    // Optional: validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(teacher.email)) {
      setError("❌ Invalid email format.");
      return;
    }

    // Optional: validate phone number
    if (!/^\d{7,15}$/.test(teacher.phone)) {
      setError("❌ Invalid phone number (7-15 digits).");
      return;
    }

    try {
      await setTeacher(teacher);

      // ✅ Reset input values
      setTea({
        name: "",
        email: "",
        phone: "",
      });

      setError(""); // clear error
      setMode(true); // hide form
    } catch (err) {
      setError("❌ Failed to add teacher. Server error.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxHeight: "500px",
        overflowY: "auto",
        overflowX: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ padding: 20 }}>
        {error && (
          <label
            style={{ marginBottom: 10, display: "block", color: "red" }}
          >
            {error}
          </label>
        )}

        <Button onClick={() => setMode(!mode)}>Show Form</Button>
      </div>

      {!mode && (
        <form style={{ padding: 20 }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: 10 }}>Name</label>
            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              className="p-2 border rounded-lg w-60"
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: 10 }}>Email</label>
            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              className="p-2 border rounded-lg w-60"
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ marginRight: 10 }}>Phone</label>
            <input
              type="text"
              name="phone"
              value={teacher.phone}
              onChange={handleChange}
              className="p-2 border rounded-lg w-60"
            />
          </div>

          <button type="submit">Add teacher</button>
        </form>
      )}

      <div>
        <table border="1" cellPadding="5">
          <thead>
            <tr style={{ backgroundColor: "GrayText" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((tea) => (
              <tr key={tea.id} style={{backgroundColor : "lightgrey"}}>
                <td
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "lightyellow",
                  }}
                >
                  {tea.id}
                </td>
                <td style={{ padding: "8px 16px" }}>{tea.name}</td>
                <td style={{ padding: "8px 16px" }}>{tea.email}</td>
                <td style={{ padding: "8px 16px" }}>{tea.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;
