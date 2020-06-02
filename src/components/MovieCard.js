import React, { useState } from "react";
import { Card, Badge, Button, ImgOverlay, CardDeck } from "react-bootstrap";
import ReactModal from "react-modal";
import YouTube from "@u-wave/react-youtube";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography";
const apiKey = process.env.REACT_APP_APIKEY;

export default function MovieCard(props) {
  let movie = props.movie;
  let genres = props.genreListMovieList;
  let [discriptionOpen, setDiscriptionOpen] = useState(false);
  let [modalOpen, setModalOpen] = useState(false);
  let [id, setId] = useState(null);

  const showDiscription = () => {};

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (idd) => {
    setModalOpen(true);
    const getVideo = async () => {
      const url = `https://api.themoviedb.org/3/movie/${idd}/videos?api_key=${apiKey}&language=en-US`;
      let data = await fetch(url);
      let result = await data.json();
      console.log("I wanna p", result.results[0].key);
      setId(result.results[0].key);
    };
    getVideo();
  };

  return (
    <div className="mt-5">
      <Card className="mt-5 container imgSize titleLine">
        <Card.Img
          className="hoverImg"
          variant="top"
          rn
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
        />

        <Card.ImgOverlay className="hiddenContent pb-0">
          <Card.Title className="font-weight-bolder">{movie.title}</Card.Title>
          <Card.Text className="font-weight-lighter">
            {movie.genre_ids.map((id) => {
              let test = genres.find((genre) => {
                return id === genre.id;
              }).name;
              // console.log("test", test);
              return (
                <Badge className="mr-2" variant="danger">
                  {test}
                </Badge>
              );
            })}
          </Card.Text>
          <Card.Text className='description'>
          {movie.overview}
          </Card.Text>
        </Card.ImgOverlay>

        <Card.Body>
          <div className="d-flex justify-content-around align-baseline">
            {" "}
            <Box component="fieldset" mb={3} borderColor="transparent">
              {/* <Typography component="legend">Read only</Typography> */}
              <Rating
                name="read-only"
                value={movie.vote_average / 2}
                readOnly
              />
            </Box>
            <Card.Text data-spy="scroll"> {movie.vote_average / 2} </Card.Text>
          </div>
          {/* <Card.Title className="cardbody">{movie.title}</Card.Title> */}
          <Button
            className="float-left"
            onClick={() => {
              openModal(movie.id);
            }}
            variant="outline-danger"
          >
            Trailer
          </Button>
          <Button
            className="float-right"
            variant="outline-danger"
            onClick={() => {
              showDiscription();
            }}
          >
            Discription
          </Button>
        </Card.Body>
      </Card>
      <ReactModal
        className="ml-5"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
          },
          content: {
            position: "absolute",
            top: "85px",
            left: "45px",
            right: "30px",
            bottom: "0px",
            border: "1px solid #000",
            background: "#000",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "0px",
          },
        }}
        isOpen={modalOpen}
      >
        <div className="d-flex align-baseline modalBox">
          <YouTube
            width="100%"
            height="85%"
            className="col-9"
            video={id}
            autoplay
          />
          <div className="col-3 align-baseline">
            {" "}
            <div className="align-bottom">
              <Button
                pointer-events="none"
                className="float-right"
                variant="outline-danger"
                onClick={() => {
                  closeModal();
                }}
              >
                x
              </Button>
              <Button
                className="float-right mr-3"
                variant="outline-danger"
                onClick={() => {
                  console.log("let's watch movies");
                }}
              >
                Watch
              </Button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}
