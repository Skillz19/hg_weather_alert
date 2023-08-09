import { render } from '@testing-library/react';
import WeatherWidget from './WeatherWidget';

describe('WeatherWidget component', () => {
    test('renders weather icon image', () => {
        const props = {
            icon: '10d', // Pass the desired icon value
            wind: { deg: 180, speed: 5, gust: 7 },
            time: new Date(),
            temp: 293.15,
            description: 'Cloudy',
        };

        const { getByAltText } = render(<WeatherWidget {...props} />);
        const iconImage = getByAltText('weather icon');

        expect(iconImage).toBeInTheDocument();
    });

    test('displays wind speed', () => {
        const props = {
            icon: '10d',
            wind: { deg: 180, speed: 5, gust: 7 },
            time: new Date(),
            temp: 293.15,
            description: 'Cloudy',
        };

        const { getByText } = render(<WeatherWidget {...props} />);
        const windSpeed = getByText(/5\s*M\/S/i);
        
        expect(windSpeed).toBeInTheDocument();
    });


    test('displays correct day of the week', () => {
        const props = {
            icon: '10d',
            wind: { deg: 180, speed: 5, gust: 7 },
            time: new Date('2023-07-15T12:00:00Z'), 
            temp: 293.15,
            description: 'Cloudy',
        };

        const { getByText } = render(<WeatherWidget {...props} />);
        const dayOfWeek = getByText('Saturday'); 

        expect(dayOfWeek).toBeInTheDocument();
    });


    test('displays temperature in Celsius and Fahrenheit', () => {
        const props = {
            icon: '10d',
            wind: { deg: 180, speed: 5, gust: 7 },
            time: new Date(),
            temp: 293.15, // 20°C
            description: 'Cloudy',
        };

        const { getByText } = render(<WeatherWidget {...props} />);
        const tempCelsius = getByText(/20.00\s*°C/i);
        const tempFahrenheit = getByText(/68.00\s*°F/i);

        expect(tempCelsius).toBeInTheDocument();
        expect(tempFahrenheit).toBeInTheDocument();
    });

});

