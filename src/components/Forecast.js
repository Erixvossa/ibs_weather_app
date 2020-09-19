import React from "react";

const Forecast = ({ temp, nextDate, icon }) => {

    const todayTemp = temp;
    const todayDate = nextDate;
    const todayIcon = icon


    return(
    <div className="forecast-card">
        <img
            alt=""
            className=""
            src={`${todayIcon}`}
        />
        <p className="forecast-card__title">{todayDate}</p>
        <p className="">Температура: {todayTemp}&#176;</p>
        <p className=""></p>

    </div>
    );
};

export default Forecast;