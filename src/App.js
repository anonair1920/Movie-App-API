import React, { useState, useEffect } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import MovieList from "./components/MovieList";
import PagiBox from "./components/PagiBox";
import "./App.css";

const apiKey = process.env.REACT_APP_APIKEY;
let page = 1;

export default function App() {
  let searchContents = "";
  let [movieList, setMovieList] = useState(null);
  let [genreList, setGenreList] = useState(null);

  const getGenreList = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    let data = await fetch(url);
    let result = await data.json();
    getNowPlaying();
    console.log("genre list data: ", result.genres);
    setGenreList(result.genres);
  };

  const getNowPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    let data = await fetch(url);
    let result = await data.json();
    setMovieList(result.results);
    console.log("now playing movies data: ", result.results);
  };

  const getTopRated = async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
    let data = await fetch(url);
    let result = await data.json();
    setMovieList(result.results);
    console.log("top rated movies data: ", result.results);
  };

  const getUpComing = async () => {
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
    let data = await fetch(url);
    let result = await data.json();
    setMovieList(result.results);
    console.log("up coming movies data: ", result.results);
  };

  const getPopular = async () => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
    let data = await fetch(url);
    let result = await data.json();
    setMovieList(result.results);
    console.log("latest movies data: ", result.results);
  };

  const nextPage = () => {
    page++;
    getNowPlaying();
    setMovieList(movieList);
  };

  const previousPage = () => {
    if (page === 1) {
      alert("you're at first page!!");
      getNowPlaying();
      setMovieList(movieList);
    } else page--;
    getNowPlaying();
    setMovieList(movieList);
  };
  const searchByKeyword = (e) => {
    let newList = [];
    searchContents = e.target.value;
    console.log("user typing: ", searchContents);
    if (searchContents == "") {
      setMovieList(movieList);
    } else {
      newList = movieList.filter((movie) => {
        movie.title.toLowerCase().includes(searchContents.toLowerCase());
      });
    }
    setMovieList(newList);
  };

  useEffect(() => {
    getGenreList();
  }, []);

  if (genreList === null || movieList === null) {
    return <h1>l o a d i n g . . . !</h1>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <Button disabled variant="danger">
          One More EPISODE{" "}
        </Button>{" "}
        <Button
          onClick={() => {
            getTopRated();
          }}
          variant="outline-danger"
        >
          Top Rated
        </Button>{" "}
        <Button
          onClick={() => {
            getPopular();
          }}
          variant="outline-danger"
        >
          Popular
        </Button>{" "}
        <Button
          onClick={() => {
            getUpComing();
          }}
          variant="outline-danger"
        >
          Up Coming
        </Button>
        <Form inline>
          <FormControl
            onChange={(e) => searchByKeyword(e)}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-danger">Search</Button>
        </Form>
      </div>
      <div className="listRow">
        <MovieList genresListApp={genreList} movieList={movieList} />
      </div>
      <div className="pagiBox d-flex justify-content-evenly">
        <Button
          onClick={() => {
            previousPage();
          }}
          variant="outline-danger"
        >
          Previous Page
        </Button>
        <Button
          onClick={() => {
            nextPage();
          }}
          variant="outline-danger"
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}
