import React from "react";

const Forecast = (props) => {

    const todayData = props.data;
    console.log(todayData);
    // const { date } = props.data;
    // console.log(date);

    return(
    <div className="forecast-card">
        <p className="forecast-card__title">Завтра</p>
        {/*<p className="">{props.data.date}</p>*/}
        <p className=""></p>

    </div>
    );
};

export default Forecast;