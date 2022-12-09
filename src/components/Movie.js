import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  const date = new Date(props.releaseDate).toLocaleDateString("en-UK");

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h5>Released on: {date}</h5>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;
