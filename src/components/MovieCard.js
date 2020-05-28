import React from "react";
import { Card, Button, ListGroupItem, ListGroup } from "react-bootstrap";

export default function MovieCard(props) {
  let movie = props.movie;
  return (
    <div className='col-3'>
      <Card className="container" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
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
      </Card>
    </div>
  );
}
