import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const PlaceDetails = ({ place, selected, refProp, user }) => {
  const classes = useStyles();

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  console.log(place);

  const handleAddPlace = () => {
    const placeInfo = {
      name: place.name,
      location: place.ranking_geo,
      image: place.photo.images.large.url,
      user_id: user.id,
    };

    fetch("/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeInfo),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newPlace) => {
          console.log(newPlace);
          alert(
            `You have sucessfully added ${newPlace.name} to your saved places!`
          );
        });
      } else {
        res.json().then((errors) => console.log(errors));
      }
    });
  };

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://smallbizclub.com/wp-content/uploads/2015/12/4-Things-You-Should-Know-About-Opening-a-Restaurant.jpg"
        }
        title={place.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterButtom variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterButtom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterButtom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>

        {place?.awards?.map((award) => (
          <Box
            my={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            TripAdvisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
          <Button size="small" color="primary" onClick={handleAddPlace}>
            Add To My Places
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
