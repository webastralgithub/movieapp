// MovieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './MovieList.css'; // Import CSS file for styling

function MovieList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0); // For pagination
  const moviesPerPage = 8; // Movies per page
  const pagesVisited = pageNumber * moviesPerPage;

  useEffect(() => {
    // Fetch movies from backend API
    axios.get('http://localhost:5000/api/movies')
      .then((response) => {
       setMovies(response.data.movies);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const displayMovies = movies
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((movie) => (
      <Link key={movie.id} to={`/edit-movie/${movie.id}`} className="movie-link">
        <div className="movie-item">
          <img src={"http://localhost:5000/" + movie.image} alt={movie.title} className="movie-image" />
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p>Year: {movie.publishYear}</p>
          </div>
        </div>
      </Link>
    ));

  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {movies.length == 0 &&

        <div className='login empty-page-content'>
          <h1 className='login-header'>Your movie list is empty</h1>
          <button onClick={() => navigate("/add-movie")}>Add a new movie</button>
        </div>

      }
      {movies.length > 0 && <div className='movies-header'>
        <Link to="/add-movie">
          <h3>My movies <img src="/plus.png" /></h3>
        </Link>

          <div><h3  onClick={()=>{
          localStorage.removeItem("token")
          navigate("/")
        }}>Logout<img src="/logout.png" /></h3>
    </div>

      </div>}
      {movies.length > 0 && <div className="movie-container">

        <div className="movie-grid">{displayMovies}</div>
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'pagination'}
          previousLinkClassName={'previous'}
          pageClassName={'pagenum'}
          nextLinkClassName={'next'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
        />
      </div>}
    </>
  );
}

export default MovieList;
