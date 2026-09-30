import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <h1>Contact Form Validation</h1>
      <form action="#">
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value.trim())}
          value={name}
        />
        <p>
          {((name.length !== 0 && name.length < 3) || name.length > 15) &&
            "Invalid Name!"}
        </p>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value.trim())}
          value={email}
        />
        <p>
          {email.length !== 0 &&
            !/\S+@\S+\.\S+/.test(email) &&
            "Invalid Email!"}{" "}
        </p>
        <label>Subject:</label>
        <input
          type="text"
          onChange={(e) => setSubject(e.target.value.trim())}
          value={subject}
        />
        <p>
          {((subject.length !== 0 && subject.length < 10) ||
            subject.length > 25) &&
            "Invalid Subject!"}
        </p>
        <label>Message:</label>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value.trim())}
          value={message}
        />
        <p>
          {((message.length !== 0 && message.length < 15) ||
            message.length > 35) &&
            "Invalid Subject!"}
        </p>
        <input type="submit" />
      </form>
    </div>
  );
}
