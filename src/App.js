import React, { useState, useEffect } from "react";
import { Form, Button, FormControl, Navbar, Container } from "react-bootstrap";
import MovieList from "./components/MovieList";
import Pagination from "react-js-pagination";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import ReactModal from "react-modal";
import YouTube from "@u-wave/react-youtube";
import "./App.css";

export default function App() {
  const apiKey = process.env.REACT_APP_APIKEY;
  let searchContents = "";
  let [movieList, setMovieList] = useState(null);
  let [genreList, setGenreList] = useState(null);
  let [totalResult, setTotalResult] = useState(0);
  let [page, setPage] = useState(1);
  let [modalOpen, setModalOpen] = useState(false);
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
    console.log("we have ", result.total_results, "movies");
    setMovieList(result.results);
    setTotalResult(result.total_results);
    console.log("now playing movies data: ", result.results);
    // console.log("find this", result)
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

  let handlePageChange = async (page) => {
    console.log(`active page is ${page}`);
    setPage(page);
    console.log("hi page", page);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    let data = await fetch(url);
    let result = await data.json();
    setMovieList(result.results);
  };

  const highRated = () => {
    const sortedArr = movieList.sort((a, b) => b.vote_average - a.vote_average);
    setMovieList([...sortedArr]);
    console.log(sortedArr);
    console.log("show me rates");
  };

  const lowRated = () => {
    const sortedArr = movieList.sort((a, b) => a.vote_average - b.vote_average);
    setMovieList([...sortedArr]);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };
  // const nextPage = () => {
  //   page++;
  //   getNowPlaying();
  //   setMovieList(movieList);
  // };

  // const previousPage = () => {
  //   if (page === 1) {
  //     alert("you're at first page!!");
  //     getNowPlaying();
  //     setMovieList(movieList);
  //   } else page--;
  //   getNowPlaying();
  //   setMovieList(movieList);
  // };
  const searchByKeyword = (e) => {
    let newList = [];
    searchContents = e.target.value;
    console.log("user typing: ", searchContents);
    if (searchContents === "") {
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
    <div className="d-flex">
      <div>
        <SideNav
          className="sideBar"
          // onSelect={(selected) => {}}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="nowPlaying">
            <NavItem eventKey="home">
              <NavIcon>
                <i
                  className="fas fa-fw fa-home"
                  style={{ fontSize: "0.5em" }}
                />
              </NavIcon>
              <NavText>One More EPISODE</NavText>
            </NavItem>
            <NavItem eventKey="upComing">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "0.5em" }}
                />
              </NavIcon>
              <NavText
                onClick={() => {
                  getUpComing();
                }}
              >
                Up Coming{" "}
              </NavText>
            </NavItem>{" "}
            <NavItem eventKey="topRated">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "0.5em" }}
                />
              </NavIcon>
              <NavText
                onClick={() => {
                  getTopRated();
                }}
              >
                Top Rated
              </NavText>
              <NavItem eventKey="highRated">
                {" "}
                <NavText
                  onClick={() => {
                    highRated();
                  }}
                >
                  High Rated
                </NavText>
              </NavItem>
              <NavItem eventKey="lowRated">
                <NavText
                  onClick={() => {
                    lowRated();
                  }}
                >
                  Low Rated
                </NavText>{" "}
              </NavItem>
            </NavItem>
            <NavItem eventKey="highRated">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "0.5em" }}
                />
              </NavIcon>
              <NavText
                onClick={() => {
                  getPopular();
                }}
              >
                Popular{" "}
              </NavText>
              <NavItem eventKey="charts/linechart">
                {" "}
                <NavText
                  onClick={() => {
                    getPopular();
                  }}
                >
                  Most Popular
                </NavText>
              </NavItem>
              <NavItem eventKey="charts/linechart">
                {" "}
                <NavText
                  onClick={() => {
                    getPopular();
                  }}
                >
                  Least Popular
                </NavText>
              </NavItem>
            </NavItem>
            <NavItem eventKey="highRated">
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "0.5em" }}
                />
              </NavIcon>
              <NavText
                onClick={() => {
                  getPopular();
                }}
              >
                Category{" "}
              </NavText>
              <NavItem></NavItem>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
      <div>
        <div>
          {" "}
          <Navbar
            className="navBox ml-5 font-weight-bolder"
            expand="lg"
            variant="light"
            bg="danger"
          >
            <Container>
              <Navbar.Brand float="right" text="light">
                1++ EPISODE
              </Navbar.Brand>
              <NavItem>
                {" "}
                <Form inline>
                  <FormControl
                    onChange={(e) => searchByKeyword(e)}
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button variant="outline-light">Search</Button>
                </Form>
              </NavItem>
            </Container>
          </Navbar>{" "}
        </div>

        <div className="listRow ml-5 mr-0">
          <MovieList
            openModal={openModal}
            genresListApp={genreList}
            movieList={movieList}
          />
        </div>
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
              top: "40px",
              left: "40px",
              right: "40px",
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
          <YouTube width="100%" height="85%" video="x2to0hs" autoplay />
          <Button
            className="float-right"
            variant="outline-danger"
            onClick={() => {
              closeModal();
            }}
          >
            x
          </Button>
        </ReactModal>
        <div className="paginationLine">
          <Pagination
            className="pagination"
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={totalResult}
            pageRangeDisplayed={10}
            onChange={handlePageChange.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    </div>
  );
}
