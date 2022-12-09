import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [fetchMovieClicked, setFetchMovieClicked] = useState(false);

  const fetchMoviesHandler = useCallback(async  () => {
    setIsLoading(true);
    //setFetchMovieClicked(true);
    setError(null);
    try {
      const response = await fetch("https://react-http-ec552-default-rtdb.firebaseio.com/movies.json");
      if(!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);

      const loadedMovies = [];

      for(const key in data) {
        loadedMovies.push({
          id:key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      //});

      setMovies(loadedMovies);
    }
    catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    //fetch can be used to send data
    const response = await fetch('https://react-http-ec552-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    }); 

    const data = response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>

  if(movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if(error) {
    content = <p>{error}</p>
  }

  if(isLoading) {
    content = <p>Loading..</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <div className="pageHeaders">
          <p className="popular_header">Most popular</p>
        </div>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

//FetchMovieClicked
// {fetchMovieClicked ? (
//   <section>
//     <div className="pageHeaders">
//       <p className="popular_header">Most popular</p>
//     </div>
//     {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//     {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
//     {isLoading && <p>Loading..</p>}
//   </section>
// ) : (
//   ""
// )}

//this is how you send http requests to a backend.
//react to our resource type i.e we need a side effect to happen
//when our resource type changes

// function fetchHighestRatedMovies() {
//   console.log("state of fetchMovieClicked is", fetchMovieClicked);
//   setFetchMovieClicked(true);
//   fetch(GET_POPULAR_MOVIES)
//     .then((response) => response.json())
//     .then((data) => {
//       total_pages = data.total_pages;
//       //console.log(data.total_pages);
//       const highestRatedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.id,
//           title: movieData.title,
//           rating: movieData.vote_average,
//           total_pages: movieData.total_pages,
//         };
//       });
//       setHighestRatedMovies(highestRatedMovies);
//     });
// }

// function fetchMoviesHandler() {
//   setFetchMovieClicked(true);
//   fetch("https://swapi.dev/api/films")
//     .then((response) => response.json())
//     .then((data) => {
//       const transformedMovies = data.results.map((movieData) => {
//         return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseData: movieData.release_date,
//         };
//       });
//       setMovies(transformedMovies);
//     });
// }

// const fetchMoviesHandler = () => {
//   fetch("https://swapi.dev/api/films")
//     .then(response => response.json())
//     .then(movieDetails => setMovies(movieDetails));
// }

//console.log(movies);
//console.log(highestRatedMovies);
