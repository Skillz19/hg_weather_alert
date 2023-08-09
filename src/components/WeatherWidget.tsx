import styles from '../assets/css/WeatherReportWidget.module.css';
import Card from './UI/Card';
import { ReactComponent as CompassIcon } from '../assets/icons/compass.svg'
import { windDegreeToText, kelvinToCelsius, kelvinToFahrenheit } from '../assets/utility/conversionFunctions';

export interface WeatherWidgetProps{
 icon: string,
 wind: {deg: number, speed: number, gust: number},
 time: Date,
 temp: number,
 description: string
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({icon, wind, time, description, temp}) => {

    return (<Card className={styles.container}>
        <div className={styles['report-container']}>
            <h2>Weather Report</h2>
            <div className={styles['weather-report']}>
                <div className={styles['icon-windSpeed']}>
                    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon' />
                    <div className={styles['windSpeed']}>
                        <CompassIcon
                            width="20px"
                            height="20px"
                            style={{ transform: `rotate(${-47 + wind.deg}deg)`, marginLeft: '1.5rem' }}
                        />
                        <p className={styles['windDetails']}>
                            <strong>{wind.speed} M/S</strong>&nbsp;{windDegreeToText(wind.deg)}
                        </p>
                    </div>
                </div>
                <div className={styles['day-temp']}>
                    <h3>{time.toLocaleString('en-US', { weekday: 'long' })}</h3>
                    <p className={styles.paragraph}>
                        {description}
                    </p>
                    <p style={{ marginTop: '-0.5rem' }}>
                        {kelvinToCelsius(temp).toFixed(2)}&deg;C / {kelvinToFahrenheit(temp).toFixed(2)}&deg;F
                    </p>
                </div>
            </div>
        </div>
    </Card>);
};

export default WeatherWidget;