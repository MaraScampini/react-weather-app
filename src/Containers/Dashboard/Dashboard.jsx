import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RegionContext } from "../../Context/RegionContext";

import "../../App.css";
import BarChart from "../../Components/BarChart/BarChart";
import DoubleLineChart from "../../Components/DoubleLineChart/DoubleLineChart";
import LineChart from "../../Components/LineChart/LineChart";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();
  // Initial state for the cities and buttons that will appear in the dashboard.
  let [cities, setCities] = useState({
    city1: "",
    city2: "",
    city3: "",
  });
  let [buttons, setButtons] = useState({
    button1: "",
    button2: "",
    button3: "",
  });
  // Use the region stored in our context's state to determine which cities we will be able to see in the dashboard. Use localStorage to store that data so it won't be lost if the user recharges the page.
  const { region } = useContext(RegionContext);

  let localRegion = region || localStorage.getItem("region");
  const [city, setCity] = useState("");
  // When the component loads, use the region data available to determine the cities the user can see in the dashboard.
  useEffect(() => {
    switch (localRegion) {
      case "europe":
        setCities({
          city1: "madrid,es",
          city2: "london,uk",
          city3: "paris,fr",
        });
        setButtons({
          button1: "Madrid",
          button2: "London",
          button3: "Paris",
        });
        setCity("madrid,es");
        break;
      case "northamerica":
        setCities({
          city1: "new%20york,us",
          city2: "los%20angeles,us",
          city3: "toronto,ca",
        });
        setButtons({
          button1: "New York",
          button2: "Los Angeles",
          button3: "Toronto",
        });
        setCity("new%20york,us");

        break;
    }
  }, []);
  // This handler controls the action of the buttons to change cities.
  const clickHandler = (city) => {
    setCity(city);
    return true;
  };
  // Handler to go back to the landing page, removes the region from localStorage.
  const backHandler = () => {
    navigate("/");
    localStorage.removeItem("region");
  };
  // Conditional rendering of the data. If the API calls have been successful, shows the complete dashboard with the graphics. If not, shows a spinner.
  if (city !== "") {
    return (
      <Container fluid className="container">
        <Row>
          <Col className="d-flex justify-content-center">
            <Button onClick={() => clickHandler(cities.city1)} id="cityButton">
              {buttons.button1}
            </Button>
            <Button onClick={() => clickHandler(cities.city2)} id="cityButton">
              {buttons.button2}
            </Button>
            <Button onClick={() => clickHandler(cities.city3)} id="cityButton">
              {buttons.button3}
            </Button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col sm="12" md="5" className="widget">
            <DoubleLineChart city={city} type="feelslike" />
          </Col>
          <Col sm="12" md="5" className="widget">
            <LineChart city={city} type="humidity" />
          </Col>
          <Col sm="12" md="5" className="widget">
            <BarChart city={city} type="windSpeed" />
          </Col>
          <Col sm="12" md="5" className="widget">
            <BarChart city={city} type="windGust" />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button onClick={() => backHandler()} id="cityButton">
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="d-flex align-items-center justify-content-center">
        <div class="lds-dual-ring"></div>
      </Container>
    );
  }
}

export default Dashboard;
