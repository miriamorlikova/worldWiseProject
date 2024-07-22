import { useCityContext } from "../contexts/CityContext";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList() {
  const { cities, isLoading } = useCityContext();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
