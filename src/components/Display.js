import React from "react";
import { convertTimes, getDate } from "./HelperFunctions";
import Forecast from "./Forecast";

const Display = ({ data, time }) => {
    const gettingDate = getDate();

    return (
        <div className="current-weather">
            <img
                alt=""
                className="current-weather__image"
                src={`${data.icon}`}
            />
            <p className="current-weather__paragraph">{data.text}</p>
            <div className="current-weather__time-container">
                <p>{data.name}</p>
                <span className="">{`${time}`}</span>
                <span className="">{`${gettingDate}`}</span>
            </div>


        </div>
    );
};

export default Display;