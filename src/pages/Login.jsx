import PageNavigation from "../components/PageNavigation";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuthentification } from "../contexts/AuthentificationContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("miriamorli@seznam.cz");
  const [password, setPassword] = useState("miriamorli123");
  const { login, isAuthenticated } = useAuthentification();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    } else alert("Wrong email or password.");
  }

  useEffect(() => {
    isAuthenticated && navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);
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
            placeholder="email@example.com"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="enter your password..."
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
