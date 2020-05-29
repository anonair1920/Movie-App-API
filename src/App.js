import React, { useState, useEffect } from "react";
import { Form, Button, FormControl, Pagination } from "react-bootstrap";
import MovieList from "./components/MovieList";
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
    console.log("genre list: ", result.genres);
    setGenreList(result.genres);
  };

  const getNowPlaying = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    let data = await fetch(url);
    let result = await data.json();
    setMovieList(result.results);
    console.log("now playing movies: ", result);
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

  let changePage = () => {
    page++;
    getNowPlaying();
    setMovieList(movieList);
  };

  useEffect(() => {
    getGenreList();
  }, []);

  if (genreList === null || movieList === null) {
    return <h1>l o a d i n g . . . !</h1>;
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
        <Button variant="outline-danger">Search</Button>
      </Form>
      <div className="listRow">
        <MovieList genresListApp={genreList} movieList={movieList} />
      </div>
      <div className='pagiBox'>
        <Pagination onClick={()=>{changePage()}}>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Item>{6}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
}
