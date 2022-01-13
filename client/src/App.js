import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";

import Header from "./components/Header/Header";
import HeaderNonUser from "./components/Landing/HeaderNonUser";
import PlacesHeader from "./components/Header/PlacesHeader";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import SignUp from "./components/Landing/SignUp";
import Login from "./components/Landing/Login";
import PlacesContainer from "./components/PlacesList/PlacesContainer";

// import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((foundUser) => {
          setUser(foundUser);
        });
      }
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => {
      return place.rating > rating;
    });
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  // console.log(coordinates);
  // console.log(bounds.sw);

  const handleDelete = (deletedSavedPlace) => {
    setSavedPlaces(
      savedPlaces.filter((savedPlace) => {
        console.log(deletedSavedPlace);
        return savedPlace !== deletedSavedPlace;
      })
    );
  };

  if (user) {
    return (
      <>
        <CssBaseline />

        <Switch>
          <Route exact path="/">
            <Header setCoordinates={setCoordinates} setUser={setUser} />
            <Grid container spacing={3} style={{ width: "100%" }}>
              <Grid item xs={12} md={4}>
                <List
                  places={filteredPlaces.length ? filteredPlaces : places}
                  childClicked={childClicked}
                  isLoading={isLoading}
                  type={type}
                  setType={setType}
                  rating={rating}
                  setRating={setRating}
                  user={user}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Map
                  setCoordinates={setCoordinates}
                  setBounds={setBounds}
                  coordinates={coordinates}
                  places={filteredPlaces.length ? filteredPlaces : places}
                  setChildClicked={setChildClicked}
                />
              </Grid>
            </Grid>
          </Route>

          <Route exact path="/myplaces">
            <PlacesHeader setUser={setUser} />
            <PlacesContainer
              savedPlaces={savedPlaces}
              setSavedPlaces={setSavedPlaces}
              handleDelete={handleDelete}
            />
          </Route>
        </Switch>
      </>
    );
  } else {
    return (
      <div className="app">
        <HeaderNonUser />
        <Switch>
          <Route exact path="/signup">
            <SignUp setUser={setUser} />
          </Route>
          <Route exact path="/">
            <Login setUser={setUser} />
          </Route>
        </Switch>
      </div>
    );
  }
};

export default App;
