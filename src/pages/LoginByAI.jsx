import PageNavigation from "../components/PageNavigation";
import styles from "./Login.module.css";
import { useState } from "react";
import { useAuthentification } from "../contexts/AuthentificationContextByAI";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthentification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Attempt to login with email and password
    const success = login(email, password);

    // Navigate to "/app" if login is successful
    if (success) {
      navigate("/app");
    } else {
      alert("Sorry, wrong email or password.");
    }
  };

  return (
    <main className={styles.login}>
      <PageNavigation />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
}
