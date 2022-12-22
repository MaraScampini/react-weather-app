import React from "react";

import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
import { useState, useEffect } from "react";
import { Forecast } from "../../Services/ApiCalls";

function DoubleLineChart({ city, type }) {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [resultsSet1, setResultsSet1] = useState([]);
  const [resultsSet2, setResultsSet2] = useState([]);

  let dataTypeSet1;
  let dataTypeSet2;
  let labelTypeSet1;
  let labelTypeSet2;
  switch (type) {
    case "temperature":
      dataTypeSet1 = data.map((data) => data.main.temp_max);
      dataTypeSet2 = data.map((data) => data.main.temp_min);
      labelTypeSet1 = "Max temperatures forecast";
      labelTypeSet2 = "Min temperatures forecast";
      break;
    case "feelslike":
      dataTypeSet1 = data.map((data) => data.main.temp);
      dataTypeSet2 = data.map((data) => data.main.feels_like);
      labelTypeSet1 = "Temperatures forecast";
      labelTypeSet2 = "Feels like";
      break;
  }

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: ["#000000"],
      },
      {
        label: "",
        data: [],
        backgroundColor: ["#FF2D00"],
      },
    ],
  });
  useEffect(() => {
    Forecast(city).then((data) => setData(data));
  }, []);
  useEffect(() => {
    Forecast(city).then((data) => setData(data));
  }, [city]);
  useEffect(() => {
    setDates(data.map((data) => data.dt_txt.slice(5, 16)));
    setResultsSet1(dataTypeSet1);
    setResultsSet2(dataTypeSet2);
  }, [data]);
  useEffect(() => {
    setChartData({
      labels: dates,
      datasets: [
        {
          label: labelTypeSet1,
          data: resultsSet1,
          backgroundColor: ["#000000"],
        },
        {
          label: labelTypeSet2,
          data: resultsSet2,
          backgroundColor: ["#FF2D00"],
        },
      ],
    });
  }, [dates, resultsSet1, resultsSet2]);

  return <Line data={chartData} />;
}

export default DoubleLineChart;