import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setTitle(json.data.movie.title);
    setDetail(json.data.movie.description_full);
    setBackgroundImage(json.data.movie.large_cover_image);
    setGenres(json.data.movie.genres);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <div>title: {title}</div>
      <div>detail: {detail}</div>
      <div>
        genres
        <ul>
          {genres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={backgroundImage} />
      </div>
    </div>
  );
}

export default Detail;
