import React, { useState } from "react";
import "./App.css";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const addAssignment = () => {
    if (!title || !subject || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status: "Pending",
    };

    setAssignments([...assignments, newAssignment]);

    setTitle("");
    setSubject("");
    setDueDate("");
  };

  const updateStatus = (id, status) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, status }
          : assignment
      )
    );
  };

  const filteredAssignments = filterSubject
    ? assignments.filter(
        (a) =>
          a.subject.toLowerCase() ===
          filterSubject.toLowerCase()
      )
    : assignments;

  const submittedCount = assignments.filter(
    (a) => a.status === "Submitted"
  ).length;

  const pendingCount = assignments.filter(
    (a) => a.status === "Pending"
  ).length;

  const lateCount = assignments.filter(
    (a) => a.status === "Late"
  ).length;

  return (
    <div className="container">
      <h1>College Assignment Submission Tracker</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addAssignment}>
          Add Assignment
        </button>
      </div>

      <div className="dashboard">
        <div className="card">
          Total: {assignments.length}
        </div>

        <div className="card">
          Submitted: {submittedCount}
        </div>

        <div className="card">
          Pending: {pendingCount}
        </div>

        <div className="card">
          Late: {lateCount}
        </div>
      </div>

      <input
        className="filter"
        type="text"
        placeholder="Filter by Subject"
        value={filterSubject}
        onChange={(e) =>
          setFilterSubject(e.target.value)
        }
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {filteredAssignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.title}</td>
              <td>{assignment.subject}</td>
              <td>{assignment.dueDate}</td>
              <td>{assignment.status}</td>

              <td>
                <select
                  value={assignment.status}
                  onChange={(e) =>
                    updateStatus(
                      assignment.id,
                      e.target.value
                    )
                  }
                >
                  <option>Pending</option>
                  <option>Submitted</option>
                  <option>Late</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
