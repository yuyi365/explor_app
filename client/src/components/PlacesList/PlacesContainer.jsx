import { useEffect } from "react";
import PlacesCard from "./PlacesCard";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Grid,
} from "@material-ui/core";

const PlacesContainer = ({ savedPlaces, setSavedPlaces, handleDelete }) => {
  useEffect(() => {
    fetch("/places").then((res) => {
      if (res.ok) {
        res.json().then((data) => setSavedPlaces(data));
      } else {
        res.json().then((errors) => console.log(errors));
      }
    });
  }, []);

  const mapSavedPlaces = savedPlaces.map((myPlace) => {
    return (
      <PlacesCard
        key={myPlace.id}
        id={myPlace.id}
        myPlace={myPlace}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <Box
      container
      noValidate
      sx={{ mt: 3 }}
      style={{ justifyContent: "center" }}
    >
      <Typography gutterBottom variant="h5">
        My Places
      </Typography>
      <Grid item xs={12} sx={{ mt: 3 }} align="center">
        {mapSavedPlaces}
      </Grid>
    </Box>
  );
};

export default PlacesContainer;
