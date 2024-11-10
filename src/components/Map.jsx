import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Map.module.css";

function Map() {
   
    const {cities} = useCities();
    const[mapPosition, setMapPosition] = useState([40, 0]) 
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();
// Синхронезировали широту и долготу на карте с полученой широтой и долготой
useEffect(
    function () {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },
   [mapLat, mapLng]
);
useEffect(function() {
// Проверяем существует позиция на карте и только в том случаии если она существует мы хотим задать позицию на карту
    if (geolocationPosition)
        setMapPosition([geolocationPosition.lat,
    geolocationPosition.lng])
},
[geolocationPosition]
)
    return (
        <div className={styles.mapContainer}>
            {/* Если лож то вывести геопозиционую кнопку */}
           {!geolocationPosition && (<Button type="position" onClick={getPosition}>
            {isLoadingPosition ? "Loading..." : "Use your position"}</Button>)}
          <MapContainer
          center={mapPosition}
          zoom={6} 
          scrollWheelZoom={true}
          className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {/*Проходимся по масиву и отбражаем по одному маркеру для обьекта */}
    {cities.map((city) => (
         <Marker position={[city.position.lat, city.position.lng]}
         key={city.id}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
))}
<ChangeCenter position={mapPosition} />
<DetectClick />
  </MapContainer>
        </div>
    )
}
// function для перемещения карты
function ChangeCenter({position}) {
   const map = useMap();
   map.setView(position);
   return null;
}

function DetectClick() {
    // Програмная навигация позволяем сделать переход по какой либо навигации без необходимости кликаать по какой то сылке
    const navigete = useNavigate();

    useMapEvent({
        click: (e) => { 
            console.log(e);
            navigete(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

export default Map;