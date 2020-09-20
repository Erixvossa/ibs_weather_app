import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Display from "./Display";
import Form from "./Form";
import Forecast from "./Forecast";
import { getData, getValue } from "../actions/actions";

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
        dispatch(getData(apiKey, result));
    }, [result, dispatch]);

    const getCity = value => {
        dispatch(getValue(value));
    };

    const getTime = () => {
        const time = new Date().toLocaleTimeString();
        setTime(time);
    };


    return (
        <>
            {!error ? (
                <>
                    {!loading ? (
                        <>
                            <Form getCity={getCity} />
                            <Display data={data} time={time} />
                            <div className="forecast-container">
                                <Forecast temp={data.tomorrowTemp} nextDate={data.tomorrowDate} icon={data.tomorrowIcon}/>
                                <Forecast temp={data.dayAfterTomorrowTemp} nextDate={data.dayAfterTomorrowDate} icon={data.dayAfterTomorrowIcon}/>
                            </div>
                        </>
                    ) : (
                        <h1 className="loading-state">Подождите, идет загрузка</h1>
                    )}
                </>
            ) : (
                <h2 className="error-message">Ошибка:{error}</h2>
            )}
        </>
    );
};

export default MainApp;