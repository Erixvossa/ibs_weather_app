import React from "react";
import { getDate } from "./HelperFunctions";


const Display = ({ data, time }) => {
    const gettingDate = getDate();

    return (
        <div className="current-weather">
            <img
                alt={data.text}
                className="current-weather__image"
                src={`${data.icon}`}
            />
            <p className="current-weather__paragraph">Температура: {data.todayTempetature}&#176;</p>
            <p className="current-weather__paragraph">{data.text}</p>
            <div className="current-weather__time-container">
                <p className="current-weather__title">{data.name}</p>
                <span className="">{`${time}`}</span>
                <span className="">{`${gettingDate}`}</span>
            </div>


        </div>
    );
};

export default Display;