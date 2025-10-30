import { useEffect, useState } from "react";
import { setTeachingInfo } from "../api/axiosConfig";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";

export default function TeaInfoForm() {
  const { mode, setMode, series, teachers, subject, loading } = useApp();
  const navigate = useNavigate();

  // ✅ Initialize all state properly
  const [serie, setSerie] = useState("");
  const [tea, setTea] = useState("");
  const [sub, setSub] = useState("");
  const [tdelay, setDelay] = useState("");
  const [dateofteach, setDateofteach] = useState("");
  const [tin, setIn] = useState("");
  const [tout, setOut] = useState("");
  const [present, setPresent] = useState("");
  const [tcourse, setCourse] = useState("");
  const [session, setSession] = useState("Live");
  const [error, setError] = useState("");
  const [message,setMessage]= useState('')
  const times = [
    { id: 1, t: "6:30 AM" },
    { id: 2, t: "8:30 AM" },
    { id: 3, t: "10:30 AM" },
    { id: 4, t: "12:30 PM" },
  ];

  const sessions = [
    { id: 1, name: "Live" },
    { id: 2, name: "Delay" },
  ];

  // Convert time string to minutes
  const changeNumber = async (data) => {
    const [timePart, meridiem] = data.split(" ");
    const [hour, minute] = timePart.split(":").map(Number);
    if (meridiem === "PM" && hour < 12) {
      return (hour + 12) * 60 + minute;
    } else if (meridiem === "AM" && hour === 12) {
      return minute; // 12 AM is 0 hours
    } else {
      return hour * 60 + minute;
    }
  };

  const submitForm = async () => {
    

    try {
      // ✅ Frontend validation
      if (!dateofteach || !tea || !serie || !sub || !tcourse) {
        setError("Please fill out all required fields.");
        return;
      }

      if (session === "Delay" && (!tdelay || !present)) {
        setError("Please enter delay duration and present percentage.");
        return;
      }

      if (session === "Live" && (!tin || !tout)) {
        setError("Please enter time in and time out for Live session.");
        return;
      }

      const td = session === "Delay" ? await changeNumber(tdelay) : 0;
      const timein = session === "Live" ? await changeNumber(tin) : 0;
      const timeout = session === "Live" ? await changeNumber(tout) : 0;

      const selectserie = series.find((s) => s.Series === serie);
      const selectteacher = teachers.find((t) => t.name === tea);
      const selectsub = subject.find((s) => s.name === sub);

      if (!selectserie || !selectteacher || !selectsub) {
        setError("Invalid selection for series, teacher, or subject.");
        return;
      }

      const duration = session === "Live" ? timeout - timein : td;

      await setTeachingInfo(
        selectsub.id,
        selectteacher.id,
        selectserie.id,
        timein,
        timeout,
        duration,
        session,
        tcourse,
        dateofteach,
        present
      );

      setTimeout(() => setMode(!mode), 500);
      setMessage("Data is SuccessFully Added Teaching Info Table and Payment Tabel")
      
    } catch (e) {
      console.error("Submit Error:", e);
      setError("Something went wrong while submitting the form.");
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div
      style={{
        maxHeight: "530px",
        overflowY: "auto",
        border: "1px solid #ccc",
        backgroundColor: "lightcyan",
      }}
    >
      <Typography sx={{ color: "red", padding: "10px 20px" }}>{error}</Typography>
       <Typography sx={{ color: "green", padding: "10px 20px" }}>{message}</Typography>
      <Box style={{ paddingTop: 20 }}>
        <label style={{ paddingRight: 20, paddingLeft: 20 }}>Date OF Teach</label>
        <input
          type="text"
          value={dateofteach}
          onChange={(e) => setDateofteach(e.target.value)}
          className="p-2 border rounded-lg w-60"
        />
        <Divider style={{ padding: 10 }} />
      </Box>

      <Box style={{ paddingTop: 10 }}>
        <label style={{ paddingRight: 20, paddingLeft: 20 }}>Select Teacher</label>
        <select
          value={tea}
          onChange={(e) => setTea(e.target.value)}
          className="p-2 border rounded-lg w-60"
          style={{ paddingInlineEnd: 20, paddingRight: 30 }}
        >
          <option value="">choose</option>
          {teachers.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>

        <label style={{ paddingRight: 20, paddingLeft: 100 }}>Select Serie</label>
        <select
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
          className="p-2 border rounded-lg w-60"
          style={{ paddingInlineEnd: 20, paddingRight: 30 }}
        >
          <option value="">choose</option>
          {series.map((data) => (
            <option key={data.id} value={data.Series}>
              {data.Series}
            </option>
          ))}
        </select>
        <Divider style={{ padding: 10 }} />
      </Box>

      <Box style={{ paddingTop: 10 }}>
        <label style={{ paddingRight: 20, paddingLeft: 20 }}>Select Subject</label>
        <select
          value={sub}
          onChange={(e) => setSub(e.target.value)}
          className="p-2 border rounded-lg w-60"
          style={{ paddingInlineEnd: 20, paddingRight: 30 }}
        >
          <option value="">choose</option>
          {subject.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>

        <label style={{ paddingRight: 20, paddingLeft: 100 }}>Select Session</label>
        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="p-2 border rounded-lg w-60"
          style={{ paddingInlineEnd: 20, paddingRight: 30 }}
        >
          {sessions.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>
        <Divider style={{ padding: 10 }} />
      </Box>

      {session === "Delay" && (
        <Box style={{ padding: 20 }}>
          <label style={{ paddingTop: 20, paddingRight: 10, paddingLeft: 20 }}>Delay Session</label>
          <label style={{ paddingRight: 10, paddingLeft: 20 }}>Duration</label>
          <input
            type="text"
            list="time-options-delay"
            value={tdelay}
            onChange={(e) => setDelay(e.target.value)}
            className="p-2 border rounded-lg w-60"
          />
          <label style={{ paddingRight: 10, paddingLeft: 20 }}>Percent</label>
          <input
            type="text"
            value={present}
            onChange={(e) => setPresent(e.target.value)}
            className="p-2 border rounded-lg w-60"
          />

          <datalist id="time-options-delay">
            {times.map((s) => (
              <option key={s.id} value={s.t}></option>
            ))}
          </datalist>

          <Divider style={{ padding: 10 }} />
        </Box>
      )}

      {session === "Live" && (
        <Box style={{ padding: 20 }}>
          <label style={{ paddingLeft: 20 }}>Live Session</label>
          <label style={{ paddingRight: 10, paddingLeft: 10 }}>From</label>
          <input
            type="text"
            list="time-options-tin"
            value={tin}
            onChange={(e) => setIn(e.target.value)}
            className="p-2 border rounded-lg w-60"
          />
          <label style={{ paddingRight: 20, paddingLeft: 20 }}>To</label>
          <input
            type="text"
            list="time-options-tout"
            value={tout}
            onChange={(e) => setOut(e.target.value)}
            className="p-2 border rounded-lg w-60"
          />

          <datalist id="time-options-tin">
            {times.map((s) => (
              <option key={s.id} value={s.t}></option>
            ))}
          </datalist>
          <datalist id="time-options-tout">
            {times.map((s) => (
              <option key={s.id} value={s.t}></option>
            ))}
          </datalist>

          <Divider style={{ padding: 10 }} />
        </Box>
      )}

      <label style={{ paddingRight: 20, paddingLeft: 20 }}>Teaching Resource Data</label>
      <Box sx={{ display: "flex", paddingLeft: 5, paddingTop: 2 }}>
        <input
          type="text"
          value={tcourse}
          onChange={(e) => setCourse(e.target.value)}
          className="p-2 border rounded-lg w-60"
          style={{ width: "900px" }}
        />
      </Box>

      <Box style={{ display: "flex", justifyContent: "left", padding: 20, color: "greenyellow" }}>
        <IconButton style={{ color: "Blueviolet" }} onClick={submitForm}>
          Submit Form
        </IconButton>
      </Box>
    </div>
  );
}
