import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@material-ui/core";

// import useStyles from "./styles";

const PlacesCard = ({ id, myPlace, handleDelete }) => {
  // const classes = useStyles();

  const handleDeleteClick = () => {
    fetch(`places/${id}`, {
      method: "DELETE",
    }).then(() => handleDelete(myPlace));
  };

  return (
    <Box container noValidate sx={{ mt: 3 }}>
      <Grid item xs={12} sx={{ mt: 3 }} align="center">
        <Card sx={{ maxWidth: 275 }}>
          <CardMedia
            style={{ height: 350 }}
            image={myPlace.image}
            title={myPlace.name}
          />
          <CardContent align="center" sx={{ mt: 3 }}>
            {myPlace.name && (
              <Typography gutterBottom variant="h5">
                {myPlace.name}
              </Typography>
            )}

            {myPlace.location && (
              <Typography gutterButtom variant="subtitle1">
                Location: {myPlace.location}
              </Typography>
            )}
          </CardContent>
          <CardContent align="center">
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              align="right"
              onClick={handleDeleteClick}
            >
              Remove Place
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default PlacesCard;
