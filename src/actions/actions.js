import { FETCHING_DATA, FETCH_ERROR, GET_VALUE, GOT_DATA } from "../constants/actionsConstants";

import axios from "axios";


export function getData(apiKey, result) {
    return async function (dispatch) {
        dispatch({type: FETCHING_DATA});
        try {
            const axiosData = await axios.get(
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${result}&days=3`
            );
            const allData = axiosData.data;

            const {location, current, forecast} = allData;
            const {name} = location;
            const tomorrow = forecast.forecastday[1];
            const tomorrowTemp = tomorrow.day.avgtemp_c;
            const tomorrowDate = tomorrow.date;
            const tomorrowIcon = tomorrow.day.condition.icon;

            const dayAfterTomorrow = forecast.forecastday[2];
            const dayAfterTomorrowTemp = dayAfterTomorrow.day.avgtemp_c;
            const dayAfterTomorrowDate = dayAfterTomorrow.date;
            const dayAfterTomorrowIcon = dayAfterTomorrow.day.condition.icon;

            const {condition,} = current;
            const todayTempetature = current.temp_c;
            const {icon, text} = condition;
            const obj = {
                todayTempetature,
                name,
                icon,
                text,
                tomorrowTemp,
                tomorrowDate,
                tomorrowIcon,
                dayAfterTomorrowTemp,
                dayAfterTomorrowDate,
                dayAfterTomorrowIcon
            }

            dispatch({type: GOT_DATA, payload: obj});
        } catch (error) {
            console.log(error.response);
            dispatch({type: FETCH_ERROR, payload: error.response.data.message});
        }
    }
}

export function getValue(value) {
    return (
        { type: GET_VALUE, payload: value }
    )
}
