import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.bz/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <Movie
            key={movie.id}
            id={movie.id}
            year={movie.year}
            coverImg={movie.medium_cover_image}
            title={movie.title}
            summary={movie.description_full}
            genres={movie.genres}
          />
        </div>
      )}
    </div>
  );
}

export default Detail;
