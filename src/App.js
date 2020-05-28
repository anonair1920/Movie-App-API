import React, { useState, useEffect } from "react";
import { Form, Button, FormControl, ListGroup } from "react-bootstrap";
import MovieList from "./components/MovieList";
import "./App.css";

const apiKey = process.env.REACT_APP_APIKEY;

export default function App() {
  let searchContents = "";
  let [movieList, setMovieList] = useState(null);

  const getNowPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    let data = await fetch(url);
    let result = await data.json();
    setMovieList(result.results);
    console.log("data from api", result);
  };

  const searchByKeyword = (e) => {
    let newList = [];
    searchContents = e.target.value;
    console.log("user typing: ", searchContents);
    if (searchContents === "") {
      setMovieList(movieList);
    } else {
     newList = movieList.filter(movie => {
        movie.title.toLowerCase().includes(searchContents.toLowerCase());
      })
    }
    setMovieList(newList);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  if (movieList === null) {
    return (
      <div>
        <h1>Loading...!</h1>
      </div>
    );
  }

  return (
    <div>
      <Form inline>
        <FormControl
          onChange={(e) => searchByKeyword(e)}
          type="text"
          placeholder="Search"
          className="mr-sm-2"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <div className="container">
        <MovieList  movieList={movieList} />
      </div>
      <button>next page</button>
    </div>
  );
}
