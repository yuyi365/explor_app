import React, { useState, useEffect, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  priceLevel,
  setPriceLevel,
  user,
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  // console.log({ childClicked });

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  // console.log(elRefs);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Discover your next adventure...</Typography>

      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Price</InputLabel>
            <Select
              value={priceLevel}
              onChange={(e) => setPriceLevel(e.target.value)}
            >
              <MenuItem>All</MenuItem>
              <MenuItem value={"$"}>$</MenuItem>
              <MenuItem value={"$ - $$"}>$ - $$</MenuItem>
              <MenuItem value={"$$"}>$$</MenuItem>
              <MenuItem value={"$$ - $$$"}>$$ - $$$</MenuItem>
              <MenuItem value={"$$$"}>$$$</MenuItem>
              <MenuItem value={"$$$ - $$$$"}>$$$ - $$$$</MenuItem>
              <MenuItem value={"$$$$"}>$$$$</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                  user={user}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
