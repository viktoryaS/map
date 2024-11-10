import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

import styles from "./CityList.module.css";
import { useCities } from "../context/CitiesContext";

function CityList() {
const {cities, isLoading} = useCities();

    if (isLoading) return <Spinner />;

    if(!cities.length) return <Message message="Add Your first city by clicking " />

    return (
        <ul className={styles.cityList}>
            {cities.map(city => (<CityItem city={city} key={city.id} />))}
        </ul>
    )
}
export default CityList;