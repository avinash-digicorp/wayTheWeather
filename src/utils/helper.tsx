type ITemperature = {
  fahrenheit: number;
  celsius: number;
  fahrenheitTemp: string;
  celsiusTemp: string;
};
export const getFormattedTemperature = (temp = 0): ITemperature => {
  const fahrenheit = ((temp - 273.15) * 9) / 5 + 32;
  const celsius = temp - 273.15;
  const fahrenheitTemp = `${Math.round(fahrenheit)}°F`;
  const celsiusTemp = `${Math.round(celsius)}°C`;

  return {fahrenheit, celsius, fahrenheitTemp, celsiusTemp};
};
