import { useEffect, useState } from "react";
import PlacesCard from "./PlacesCard";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";

const PlacesContainer = ({ savedPlaces, setSavedPlaces, handleDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlace, setSelectedPlace] = useState("all");

  const visiblePlaces = savedPlaces
    .filter((place) => {
      console.log(place);
      return selectedCategory === "all" || place.category === selectedCategory;
    })
    .filter((place) => {
      return selectedPlace === "all" || place.location === selectedPlace;
    });

  const classes = useStyles();

  useEffect(() => {
    fetch("/places").then((res) => {
      if (res.ok) {
        res.json().then((data) => setSavedPlaces(data));
      } else {
        res.json().then((errors) => console.log(errors));
      }
    });
  }, []);

  const mapSavedPlaces = visiblePlaces?.map((myPlace) => {
    return (
      <PlacesCard
        key={myPlace.id}
        id={myPlace.id}
        myPlace={myPlace}
        handleDelete={handleDelete}
      />
    );
  });

  let placeArr = savedPlaces.map((myPlace) => {
    return myPlace.location;
  });
  let unique = [...new Set(placeArr)];
  const mapUniquePlaces = unique.map((place) => {
    return <MenuItem value={place}>{place}</MenuItem>;
  });

  return (
    <>
      <Box
        container
        noValidate
        sx={{ mt: 3 }}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel>Type of Place</InputLabel>
          <Select onChange={(e) => setSelectedCategory(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="restaurant">Restaurants</MenuItem>
            <MenuItem value="hotel">Hotels</MenuItem>
            <MenuItem value="attraction">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Location (City)</InputLabel>

          <Select onChange={(e) => setSelectedPlace(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            {mapUniquePlaces}
          </Select>
        </FormControl>
      </Box>

      <Box
        container
        noValidate
        sx={{ mt: 3 }}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <Grid item xs={6} sx={{ mt: 3 }} align="center">
          <Typography gutterBottom variant="h4" color="primary">
            My Places
          </Typography>
          {visiblePlaces.length > 0 ? (
            mapSavedPlaces
          ) : (
            <Grid item xs={6} sx={{ mt: 3 }} align="center">
              <Box container noValidate sx={{ mt: 3 }}>
                <Typography gutterBottom variant="h5" color="secondary">
                  {`Looks like you have yet to find ${selectedCategory}s in ${selectedPlace}!`}
                </Typography>
              </Box>

              <Box container noValidate sx={{ mt: 3 }}>
                <Button
                  href="/"
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 10 }}
                >
                  Search for {`${selectedCategory}s`}
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default PlacesContainer;
