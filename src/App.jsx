import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterComp from "./Components/FilterComp";
import React, { useEffect, useState } from "react";
import "./App.css";
export default function App() {
  const [movies, SetMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [sort, setSort] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);

  const API = "https://swapi.dev/api/films/?format=json";

  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.results) {
        SetMovies(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData(API);
  }, []);

  const searchMovie = (event) => {
    const str = event.target.value?.toLowerCase().trim();
    setSearchTerm(str);
  };

  useEffect(() => {
    renderMovie();
  }, [searchTerm]);

  useEffect(() => {
    console.log(sort);
  }, [sort]);

  const sortHandler = (event) => {
    const selectedSort = event.target.value;
    setSort(selectedSort);
  };

  const onMovieClickHandler = (episode_id) => {
    const selectedMovie = movies.find(
      (movie) => movie.episode_id === episode_id
    );
    setMovieDetails(selectedMovie);
  };

  const renderMovie = () => {
    let filteredMovies = movies;
    if (searchTerm.length > 0) {
      filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }
    if (sort) {
      if (sort === "Episode") {
        filteredMovies = filteredMovies.sort(
          (a, b) => a.episode_id - b.episode_id
        );
      }
      if (sort === "Year") {
        const compareReleaseData = (a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return dateB - dateA;
        };
        filteredMovies = filteredMovies.sort(compareReleaseData);
      }
    }
    return filteredMovies.map((i, index) => {
      return (
        <li
          style={{ cursor: "pointer", margin: "30px" }}
          onClick={() => onMovieClickHandler(i.episode_id)}
          key={index}
        >
          <div className="d-flex justify-content-between">
            <span>
              <p>
                Episode {i.episode_id} - {i.title}
              </p>
            </span>
            <span>{i.release_date}</span>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <FilterComp searchMovie={searchMovie} sortHandler={sortHandler} />
      <section className="row">
        <div className="left col-6">
          <ul>{renderMovie()}</ul>
        </div>
        <div className="right col-6">
          {movieDetails ? (
            <article>
              <h1>{movieDetails.title}</h1>
              <p>{movieDetails.opening_crawl}</p>
              <p>Director: {movieDetails.director}</p>
              <p>Producer: {movieDetails.producer}</p>
            </article>
          ) : null}
        </div>
      </section>
    </>
  );
}
