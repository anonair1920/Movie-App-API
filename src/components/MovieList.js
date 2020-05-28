import React from "react";
import MovieCard from "./MovieCard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MovieList(props) {
  if (props.movieList == null) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="row">
        {props.movieList.map((item) => {
          return <MovieCard movie={item} />;
        })}
      </div>
    </div>
  );
}
