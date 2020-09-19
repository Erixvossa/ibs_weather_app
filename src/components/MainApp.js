import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Display from "./Display";
import Form from "./Form";
import axios from "axios";
import Forecast from "./Forecast";

const MainApp = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const apiKey = "e3c07fef41054dd2865213203201609";
    const dispatch = useDispatch();
    const reducer = useSelector(state => ({
        ...state
    }));
    const { loading, data, error, result } = reducer.mainReducer;

    useEffect(() => {
        const timeID = setTimeout(() => {
            getTime();
        }, 1000);
        return () => clearTimeout(timeID);
    }, [time]);

    useEffect(() => {
        async function getData() {
            dispatch({ type: "FETCHING_DATA" });
            try {
                const axiosData = await axios.get(
                    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${result}&days=3`
                );
                const allData = axiosData.data;

                const { location, current, forecast } = allData;
                const { name } = location;
                const tomorrow = forecast.forecastday[1];
                const tomorrowTemp = tomorrow.day.avgtemp_c;
                const tomorrowDate = tomorrow.date;
                const tomorrowIcon = tomorrow.day.condition.icon;

                const dayAfterTomorrow = forecast.forecastday[2];
                const dayAfterTomorrowTemp = dayAfterTomorrow.day.avgtemp_c;
                const dayAfterTomorrowDate = dayAfterTomorrow.date;
                const dayAfterTomorrowIcon = dayAfterTomorrow.day.condition.icon;

                const { condition, } = current;
                const todayTempetature = current.temp_c;
                const { icon, text } = condition;
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
                console.log(allData);
                console.log(obj);

                dispatch({ type: "GOT_DATA", payload: obj });
            } catch (error) {
                console.log(error.response);
                dispatch({ type: "FETCH_ERROR", payload: error.response.data.message });
            }
        }

        getData();
    }, [result, dispatch]);

    const getCity = value => {
        dispatch({ type: "GET_VALUE", payload: value });
    };

    const getTime = () => {
        const time = new Date().toLocaleTimeString();
        setTime(time);
    };


    return (
        <div>
            {!error ? (
                <div className="">
                    {!loading ? (
                        <div className="">
                            <Form getCity={getCity} />
                            <Display data={data} time={time} />
                            <div className="forecast-container">
                                <Forecast temp={data.tomorrowTemp} nextDate={data.tomorrowDate} icon={data.tomorrowIcon}/>
                                <Forecast temp={data.dayAfterTomorrowTemp} nextDate={data.dayAfterTomorrowDate} icon={data.dayAfterTomorrowIcon}/>
                            </div>
                        </div>
                    ) : (
                        <h1 className="">Loading...</h1>
                    )}
                </div>
            ) : (
                <h1 className="">{error}</h1>
            )}
        </div>
    );
};

export default MainApp;