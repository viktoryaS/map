import { useEffect, useState } from "react";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL ="https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

function Form() {
  const [mapLat, matLng] = useUrlPosition();
  console.log(mapLat, 'hello');

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");


  useEffect(function() {
    async function fetchCityDate() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=&longitude=0`)
        const data = await res.json();
        console.log(data);
        // Если нажали на карте на воду то выдается ошибка
        if (!data.countryCode) throw new Error("Тут нет города ")
        setCityName(data.city || data.locality || "");
        setCountry(data.coutryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch(err) {
        setGeocodingError(false)
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityDate()
  },[mapLat, matLng])

  if(isLoadingGeocoding) return <Spinner />

  if(!geocodingError) return <Message message={geocodingError} />

  return (  
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
      <Button type="primary">Add</Button>
      <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
