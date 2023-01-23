import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/navbar";
import SelectGenre from "../components/selectgenre";
import Slider from "../components/slider";
import NotAvailable from "../components/notavailabe";

export default function TVShows() {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
    }
    // eslint-disable-next-line
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // eslint-disable-next-line
  const [user, setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser.uid);
    } else {
      navigate("/login");
    }
  });

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
