import React from "react";

export default function AdminPanel({ teachers, setTeachers }) {
  const verifyTeacher = (id) => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === id ? { ...teacher, verified: true } : teacher
    );
    setTeachers(updatedTeachers);
  };

  return (
    <div>
      <h3>Unverified Teachers</h3>
      <ul>
        {teachers
          .filter((teacher) => !teacher.verified)
          .map((teacher) => (
            <li key={teacher.id}>
              {teacher.username} -{" "}
              <button
                className="btn btn-success btn-sm"
                onClick={() => verifyTeacher(teacher.id)}
              >
                Verify
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}