import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Miriam",
  email: "miriamorli@seznam.cz",
  password: "miriamorli123",
  avatar: "https://i.pravatar.cc/100?u=zzzz",
};

const AuthentificationContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthentificationProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthentificationContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
}

function useAuthentification() {
  const context = useContext(AuthentificationContext);
  if (context === undefined)
    throw new Error("You are trying to use context outside the CityProvider");

  return context;
}

export { AuthentificationProvider, useAuthentification };
