import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Display from "./Display";
import Forecast from "./Forecast";
import axios from "axios";

const MainApp = () => {
    const [data, setData] = useState({});
    const [value, setValue] = useState("");
    const [withData, setWithData] = useState(false);
    const [result, setResult] = useState("las vegas");
    const apiKey = "e3c07fef41054dd2865213203201609";

    useEffect(() => {
        async function getData(city) {
            try {
                const axiosData = await axios.get(
                    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
                );
                // const obj = axiosData.data;
                const allData = axiosData.data;

               const { current, forecast } = allData;
               const tomorrow = forecast.forecastday[1];



               const { condition } = current;
               const { icon, text } = condition;
                const obj = {
                    icon,
                    text,
                    tomorrow
                }



                setData(obj);
                console.log(tomorrow);
                console.log(allData);
                console.log(obj);
                setWithData(true);
            } catch (error) {
                console.log(error.message);
                alert("city not found");
            }
        }

        getData(result);
    }, [result]);

    const handleChange = e => {
        const val = e.target.value;
        setValue(val);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setResult(value);
        console.log(value);
        setValue("");
    };



    return (
        <div className="body">
            {withData ? (
                <div className="container">
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="search city"
                                onChange={handleChange}
                                name="value"
                                value={value}
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <Display data={data} />

                </div>
            ) : (
                <h1 className="loading">Loading...</h1>
            )}
        </div>
    );
};

export default MainApp;