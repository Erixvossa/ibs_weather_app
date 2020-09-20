import React from "react";

const Forecast = ({ temp, nextDate, icon }) => {

    const todayTemp = temp;
    const todayDate = nextDate;
    const todayIcon = icon


    return(
    <div className="forecast-card">
        <img
            alt=""
            className="forecast-card__image"
            src={`${todayIcon}`}
        />
        <p className="forecast-card__title">{todayDate}</p>
        <p className="forecast-card__title">Температура: {todayTemp}&#176;</p>
        <p className=""></p>

    </div>
    );
};

export default Forecast;