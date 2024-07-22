import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:8000";
const CityContextValue = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There is a problem with catching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There is a problem with fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewCity = async (newCity) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There is a problem with creating city.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There is a problem with deleting city.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFlag = (flag) => {
    if (flag === undefined) return;
    let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");

    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  return (
    <CityContextValue.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        getFlag,
        setCurrentCity,
        createNewCity,
        deleteCity,
      }}
    >
      {children}
    </CityContextValue.Provider>
  );
}

function useCityContext() {
  const context = useContext(CityContextValue);
  if (context === undefined)
    throw new Error("You are trying to use context outside the CityProvider");
  return context;
}

export { CityContextValue, CityProvider, useCityContext };
