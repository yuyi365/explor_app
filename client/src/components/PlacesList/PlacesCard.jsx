import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@material-ui/core";

import {
  EmailShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

import { EmailIcon, TelegramIcon, WhatsappIcon } from "react-share";

// import useStyles from "./styles";

const PlacesCard = ({ id, myPlace, handleDelete }) => {
  // const classes = useStyles();

  const handleDeleteClick = () => {
    fetch(`places/${id}`, {
      method: "DELETE",
    }).then(() => handleDelete(myPlace));
  };

  // console.log(myPlace.website);

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
              <Typography variant="h4" color="primary">
                {myPlace.name}
              </Typography>
            )}

            {myPlace.location && (
              <Typography variant="h5">Location: {myPlace.location}</Typography>
            )}

            {myPlace.price_level && (
              <Typography variant="subtitle1">
                Price: {myPlace.price_level}
              </Typography>
            )}
          </CardContent>

          <CardContent align="center">
            <Typography variant="subtitle1" color="primary">
              Share with friends
            </Typography>

            {myPlace.website ? (
              <EmailShareButton
                url={`${myPlace.website}`}
                subject="Check out this place that I found using Explor!"
                body={`${myPlace.name} in ${myPlace.location} seems like a cool ${myPlace.category}.`}
              >
                <span className="share-button">
                  <EmailIcon size={35} round={true} />
                </span>
              </EmailShareButton>
            ) : (
              <EmailShareButton
                url={`https://www.google.com/search?q=${myPlace.name}+${myPlace.location}`}
                subject="Check out this place that I found using Explor!"
                body={`${myPlace.name} in ${myPlace.location} seems like a cool ${myPlace.category}.`}
              >
                <span className="share-button">
                  <EmailIcon size={35} round={true} />
                </span>
              </EmailShareButton>
            )}
            {myPlace.website ? (
              <TelegramShareButton
                url={`${myPlace.website}`}
                title={`${myPlace.name} in ${myPlace.location} seems like a cool ${myPlace.category}.`}
              >
                <span className="share-button">
                  <TelegramIcon size={35} round={true} />
                </span>
              </TelegramShareButton>
            ) : (
              <TelegramShareButton
                url={`https://www.google.com/search?q=${myPlace.name}+${myPlace.location}`}
                title={`${myPlace.name} in ${myPlace.location} seems like a cool ${myPlace.category}.`}
              >
                <span className="share-button">
                  <TelegramIcon size={35} round={true} />
                </span>
              </TelegramShareButton>
            )}
            {myPlace.website ? (
              <WhatsappShareButton
                url={`${myPlace.website}`}
                separator="   "
                title={`${myPlace.name} in ${myPlace.location} seems like a cool ${myPlace.category}.`}
              >
                <span className="share-button">
                  <WhatsappIcon size={35} round={true} />
                </span>
              </WhatsappShareButton>
            ) : (
              <WhatsappShareButton
                url={`https://www.google.com/search?q=${myPlace.name}+${myPlace.location}`}
                separator="   "
                title={`${myPlace.name} in ${myPlace.location} seems like a cool ${myPlace.category}.`}
              >
                <span className="share-button">
                  <WhatsappIcon size={35} round={true} />
                </span>
              </WhatsappShareButton>
            )}
          </CardContent>

          {myPlace.website && (
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(myPlace.website, "_blank")}
            >
              Website
            </Button>
          )}

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
