import React, { useState, useEffect, Fragment } from "react";
import styles from "./Albums.module.css";
import { useParams, Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import clsx from "clsx";

import { fetchAuthor } from "../../fetchApi/fetchApi";

const Albums = () => {
  const { authorId } = useParams();

  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState({ albums: [], authorName: "" });

  useEffect(() => {
    fetchAuthor(authorId, setLoading, setAuthor);
  }, [authorId]);
  
  const albums = author.albums.map((album) => (
    <Link
      to={`${process.env.PUBLIC_URL}/authors/${authorId}/albums/${album.id}/photos`}
      key={album.id}
      className="link"
    >
      <div className={clsx(["list_item", styles.album])}>
        <div className={styles.image_container}>
          <img className={styles.image} src={album.pictures[0].url} alt="" />
        </div>
        <div>{album.title}</div>
        <div>Photos in album: {album.pictures.length}</div>
      </div>
    </Link>
  ));

  return (
    <div className="main_container">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="page_header">Albums of {author.authorName}</div>
          <div className="list_container">{albums}</div>
        </Fragment>
      )}
    </div>
  );
};

export default Albums;
