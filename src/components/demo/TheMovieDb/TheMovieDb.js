import React, { useState, useEffect } from "react";
import "./App.css";

import MoviesList from "../../MoviesList";

function TheMovieDb() {
  const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=`;

  const [pageNumber, setPageNumber] = useState(1);

  const LANGUAGE_QUERY = `&language=en-US&page=${pageNumber}`;

  const GET_POPULAR_MOVIES = `${BASE_URL}${api_key}${LANGUAGE_QUERY}`;
  const [highestRatedMovies, setHighestRatedMovies] = useState([]);

  let [fetchMovieClicked, setFetchMovieClicked] = useState(false);

  const [collapseAllButton, setCollapseAllButton] = useState(false);

  useEffect(() => {
    fetch(GET_POPULAR_MOVIES)
      .then((response) => response.json())
      .then((data) => fetchHighestRatedMovies(data));
  }, [pageNumber,GET_POPULAR_MOVIES]);

  function fetchHighestRatedMovies(data) {
    const highestRatedMovies = data.results.map((movieData) => {
      return {
        id: movieData.id,
        title: movieData.title,
        rating: movieData.vote_average,
      };
    });
    setHighestRatedMovies(highestRatedMovies);
  }

  const nextPageHandler = () => {
    setPageNumber((prevState) => prevState + 1);
  };

  const prevPageHandler = () => {
    if (pageNumber <= 1) {
      setPageNumber(1);
    } else {
      setPageNumber((prevState) => prevState - 1);
    }
  };

  const collapseCardHandler = () => {
    setFetchMovieClicked(false);
    setCollapseAllButton(false);
  };

  const FetchMoviesHandler = () => {
    setFetchMovieClicked(true);
    setCollapseAllButton(true);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMoviesHandler}>Fetch Movies</button>
      </section>
      {fetchMovieClicked ? (
        <section>
          <div className="pageHeaders">
            <p className="popular_header">Most popular</p>
            <button className="prevButton" onClick={prevPageHandler}>
              prev
            </button>
            <p className="popular_header">{pageNumber}</p>
            <button className="nextButton" onClick={nextPageHandler}>
              next
            </button>
          </div>
          <MoviesList movies={highestRatedMovies} />
        </section>
      ) : (
        ""
      )}
      {!collapseAllButton ? (
        ""
      ) : (
        <section>
          <button onClick={collapseCardHandler}>Collapse All</button>
        </section>
      )}
    </React.Fragment>
  );
}

export default TheMovieDb;
