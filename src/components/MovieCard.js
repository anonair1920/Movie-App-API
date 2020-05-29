import React from "react";
import { Card, Button, ListGroupItem, ListGroup, Badge } from "react-bootstrap";

export default function MovieCard(props) {
  let movie = props.movie;
  let genres = props.genreListMovieList;
  return (
    <div className="">
      <Card className="mt-5 container imgSize titleLine">
        <Card.Img
          className="hoverImg"
          variant="top"
          rn
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
        />

        <Card.ImgOverlay className="hiddenContent">
        <Card.Title >{movie.title}</Card.Title>
          <Card.Title>
            {movie.genre_ids.map((id) => {
              let test = genres.find((genre) => {
                return id === genre.id;
              }).name;
              console.log("test", test);
              return <Badge variant="danger">{test}</Badge>;
            })}
          </Card.Title>
          <Card.Text data-spy="scroll">{movie.overview}</Card.Text>
        </Card.ImgOverlay>

        <Card.Body className='cardbody'>
          <Card.Title >{movie.title}</Card.Title>
        </Card.Body>
      </Card>
      {/* <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src=
        />
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            <i className="fas fa-star"></i>
            {movie.vote_average}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{movie.release_date}</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <Card.Body className="d-flex justify-content-evenly">
          <Button variant="primary">Go somewhere</Button>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card> */}
    </div>
  );
}
