import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext"

import styles from "./CountryList.module.css";

function CountryList() {
    const {cities, isLoading} = useCities();
    
        if (isLoading) return <Spinner />;

        if(!cities.length) 
            return 
        (<Message message="Add Your first city by clicking " />)
        
// Функция которая переберает масив городов и создает масив стран
        const countries = cities.reduce((arr,city) => {
            // проверяем есть ли текущии горада в масиве
            if (!arr.map(el => el.country).includes(city.country))
                return [...arr,{country: city.country,  emoji: city.emoji}]
            else return arr;
        },[])
    
        return (
            <ul className={styles.countryList}>
                {countries.map(country => (<CountryItem country={country} key={country.country} />))}
            </ul>
        )

}
export default CountryList;