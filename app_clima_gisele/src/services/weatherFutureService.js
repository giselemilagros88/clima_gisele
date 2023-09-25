import { ajax } from "../tools/ajax.js";

export const getCityWeatherFuture = async city => {
    const optionsRequest = {
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast",
        params: {
            q: city,
            appid: "21e3195e9bfeb6879e788ec605b09ab0",
            units: "metric" // Grados centígrados
        }
    };
    return await ajax(optionsRequest);
}