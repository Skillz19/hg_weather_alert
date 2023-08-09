import styles from '../assets/css/DetailsPage.module.css'
import DetailTable, { DetailTableProps } from '../components/DetailTable';
import { kelvinToCelsius, windDegreeToText } from '../assets/utility/conversionFunctions';
import WeatherWidget, { WeatherWidgetProps } from '../components/WeatherWidget';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LocationsState from '../interfaces/LocationsState';
import { getCurrentWeatherDetails } from '../actions/locationsActions';
import { useEffect, useState } from 'react';

const DetailsPage = () => {
    const params = useParams();
    const nav = useNavigate();
    const locations = useSelector((state: LocationsState) => state.locations);
    const [data, setData] = useState<any>(undefined);
    //---
    useEffect(() => {
        const loc = locations[+params.index!];
        //--- if index is wrong or location does not exist navigate to not found page
        if (!loc) {
            nav('/*')
            return;
        }
        getCurrentWeatherDetails(loc).then(response => {
            setData(response);
        });
    }, [params.index, locations, nav])

    if (!data)
        return <></>;
    //---
    const timezone = data.timezone / 3600;
    const time = new Date(data.dt * 1000);
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    //---
    const locationDetails: DetailTableProps = {
        className: styles['location-details'],
        contents: [
            { name: 'Location', value: `${locations[+params.index!].name? `${locations[+params.index!].name}` : 'N/A'}` },
            { name: 'Latitude', value: `${data.coord.lat ? `${data.coord.lat}` : 'N/A'}` },
            { name: 'Longitude', value: `${data.coord.lon ? `${data.coord.lon}` : 'N/A'}` },
            { name: 'Timezone', value: `${timezone? `GMT ${timezone >= 0 ? '+' + timezone : timezone}` : 'N/A'}` },
            { name: 'Sunrise', value: `${sunrise ? `${sunrise.getHours().toString().padStart(2, '0')}:${sunrise.getMinutes().toString().padStart(2, '0')}` : 'N/A'}` },
            { name: 'Sunset', value: `${sunset ? `${sunset.getHours().toString().padStart(2, '0')}:${sunset.getMinutes().toString().padStart(2, '0')}` : 'N/A'}` }
        ]
    }
    //---
    const temp_details: DetailTableProps = {
        contents: [{ name: 'Temperature', value: `${data.main.temp ? `${kelvinToCelsius(data.main.temp).toFixed(2)}\u00B0C` : 'N/A'}` },
        { name: 'Feels like', value: `${data.main.feels_like ? `${kelvinToCelsius(data.main.feels_like).toFixed(2)}\u00B0C` : 'N/A'}` },
        { name: 'Temp max', value: `${data.main.temp_max ? `${kelvinToCelsius(data.main.temp_max).toFixed(2)}\u00B0C` : 'N/A'}` },
        { name: 'Temp min', value: `${data.main.temp_min ? `${kelvinToCelsius(data.main.temp_min).toFixed(2)}\u00B0C` : 'N/A'}` },
        { name: 'Humidity', value: `${data.main.humidity ? `${data.main.humidity}%` : 'N/A'}` },
        { name: 'Ground Level', value: `${data.main.grnd_level ? `${data.main.grnd_level} hPa` : 'N/A'}` },
        { name: 'Sea Level', value: `${data.main.sea_level ? `${data.main.sea_level} hPa` : 'N/A'}` }
        ],
        className: styles["location-temp-details"]
    };
    const locationWeatherDetails: DetailTableProps = {
        contents: [{ name: 'Description', value: (data.weather[0].description) ? data.weather[0].description : 'N/A' },
        { name: 'Wind Direction', value: `${data.wind.deg ? `${windDegreeToText(data.wind.deg)} (${data.wind.deg.toFixed(0)}\u00B0)` : 'N/A'}` },
        { name: 'Wind Speed', value: `${data.wind.speed ? `${data.wind.speed} m/s` : 'N/A'}` },
        { name: 'Wind Gust', value: `${data.wind.gust ? `${data.wind.gust} m/s` : 'N/A'}` }
        ],
        className: styles["location-wind-details"]
    }
    const widgetProps: WeatherWidgetProps = {
        icon: data.weather[0].icon,
        wind: { ...data.wind },
        time: time,
        temp: data.main.temp,
        description: data.weather[0].main
    };
    const handleCloseClick = () => {
        //--- navigate to home when close button is clicked
        nav('/');
    }
    return (
        <div className={styles["weather-details"]}>
            <div className={styles["header-container"]}>
                <h1 className={styles["header-title"]}>Current Weather Details</h1>
                <div className={styles["close-icon"]} onClick={handleCloseClick}>
                    <span>&times;</span>
                </div>
            </div>
            <div className={styles.top}>
                <WeatherWidget icon={widgetProps.icon} temp={widgetProps.temp} description={widgetProps.description}
                    wind={widgetProps.wind} time={widgetProps.time} />
                <DetailTable data-testid="location-details-table" contents={locationDetails.contents} className={locationDetails.className} />
            </div>
            <div className={styles.top}>
                <DetailTable data-testid="weather-details-table" contents={locationWeatherDetails.contents} className={locationWeatherDetails.className} />
                <DetailTable data-testid="temp-details-table" contents={temp_details.contents} className={temp_details.className} />
            </div>
        </div>
    );
};

export default DetailsPage;