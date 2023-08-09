//---
export const windDegreeToText = (degree: number) => {
    if (degree > 0 && degree < 90)
        return 'NE';
    else if (degree === 90)
        return 'E';
    else if (degree > 90 && degree < 180)
        return 'SE';
    else if (degree === 180)
        return 'S';
    else if (degree > 180 && degree < 270)
        return 'SW';
    else if (degree === 270)
        return 'W';
    else if (degree > 270 && degree < 360)
        return 'NW';
    else
        return ('N');
}
//--- convert temp in kelvin to celsius
export const kelvinToCelsius = (kelvin: number) => {
    const k = 273.15;
    return (kelvin - k);
}
export const celsiusToFahrenheit = (celsius: number) => {
    return celsius * 9 / 5 + 32;
}
export const kelvinToFahrenheit = (kelvin: number) => {
    const celsius = kelvinToCelsius(kelvin);
    const fahrenheit = celsiusToFahrenheit(celsius);
    return fahrenheit;
}