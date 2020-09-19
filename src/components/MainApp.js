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

                const { current, forecast } = allData;
                const tomorrow = forecast.forecastday[1];
               const { day } = tomorrow;
                const tomorrowTemp = day.avgtemp_c;

                const { condition } = current;
                const { icon, text } = condition;
                const obj = {
                    icon,
                    text,
                    tomorrowTemp
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

    const getCurrTime = () => {
        //  let time = new Date().toLocaleTimeString();
        //  let arr = time.split("");
        //  let dayRnight = arr.slice(-2)[0];
        //  let firstIn = arr[0];
        //  console.log(firstIn);
    };
    getCurrTime();

    return (
        <div>
            {!error ? (
                <div className="">
                    {!loading ? (
                        <div className="">
                            <Form getCity={getCity} />
                            <Display data={data} time={time} />
                            <div className="forecast-container">
                                <Forecast data={data.tomorrowTemp}/>
                                <Forecast data={data.tomorrowTemp}/>
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