import React from "react";

import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
import { useState, useEffect } from "react";
import { Forecast } from "../../Services/ApiCalls";

function DoubleLineChart({ city, type }) {
  // Use data for the information sent by the API, dates to set the labels for day and hour and results for the filtered data itself that the graphics will use. In this case, we will be working with two datasets.
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [resultsSet1, setResultsSet1] = useState([]);
  const [resultsSet2, setResultsSet2] = useState([]);

  // Depending on the type of graphic the results will be set with one type of data or another and the labels also change.
  let dataTypeSet1;
  let dataTypeSet2;
  let labelTypeSet1;
  let labelTypeSet2;
  switch (type) {
    case "temperature":
      dataTypeSet1 = data.map((data) => data.main.temp_max);
      dataTypeSet2 = data.map((data) => data.main.temp_min);
      labelTypeSet1 = "Max temperatures forecast in ºC";
      labelTypeSet2 = "Min temperatures forecast in ºC";
      break;
    case "feelslike":
      dataTypeSet1 = data.map((data) => data.main.temp);
      dataTypeSet2 = data.map((data) => data.main.feels_like);
      labelTypeSet1 = "Temperatures forecast in ºC";
      labelTypeSet2 = "Feels like in ºC";
      break;
  }
  // Initial state for the data that will go into the chart
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [""],
      },
      {
        label: "",
        data: [],
        backgroundColor: [""],
      },
    ],
  });

  let options = {
    responsive: true,
  };
  // Asynchronous calls to the API, first get the forecast data for each city, depending on the city that we're receiving from the dashboard buttons, then set the dates and results when the data is received and, finally, set all of it into the graphics.
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
          fill: {
            target: "origin",
            above: "#FF9A5A1E",
            below: "#FF9A5A1E",
          },
          backgroundColor: ["#FF9A5A"],
        },

        {
          label: labelTypeSet2,
          data: resultsSet2,
          fill: {
            target: "origin",
            above: "#ef47651f",
            below: "#ef47651f",
          },
          backgroundColor: ["#EF4765"],
        },
      ],
    });
  }, [dates, resultsSet1, resultsSet2]);

  return <Line data={chartData} options={options} />;
}

export default DoubleLineChart;
