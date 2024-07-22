import { useCityContext } from "../contexts/CityContext";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList() {
  const { cities, isLoading } = useCityContext();

  const countries = cities.reduce((array, city) => {
    if (!array.map((el) => el.country).includes(city.country))
      return [...array, { country: city.country, emoji: city.emoji }];
    else return array;
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your city by clicking on the map" />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
