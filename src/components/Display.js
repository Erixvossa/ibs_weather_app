import React from "react";
import { convertTimes, timeNow, getDate } from "./HelperFunctions";
import Forecast from "./Forecast";

const Display = ({ data }) => {
    const showSunrise = convertTimes(data.sunrise);
    const showSunset = convertTimes(data.sunset);
    const placeTime = timeNow();
    const gettingDate = getDate();



    return (
        <div className="">
            <div className="">
                <div className="">
                    <p>{data.name}</p>
                </div>
                <div className="">
                    <div className="">
                        <span className="">{`${placeTime}`}</span>
                        <span className="">{`${gettingDate}`}</span>
                    </div>

                </div>
            </div>

            <div className="">
                <div className="">
                    <img
                        alt=""
                        className=""
                        src={`${data.icon}`}
                    />
                    <span className="">{data.text}</span>
                </div>


            </div>

            <div>
                <Forecast data={data}/>
            </div>





        </div>
    );
};

export default Display;