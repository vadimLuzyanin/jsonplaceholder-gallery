import React, { useState, useEffect, Fragment } from "react";
import styles from "./AuthorsList.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import clsx from "clsx";
import { fetchAuthorsList } from "../../fetchApi/fetchApi";

const AuthorsList = () => {
  const [authorsList, setAuthorsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAuthorsList(setLoading, setAuthorsList);
  }, []);

  const authors = authorsList.map((author) => (
    <Link to={`${process.env.PUBLIC_URL}/authors/${author.id}/albums`} key={author.id} className="link">
      <div className={clsx(["list_item", styles.author])}>{author.name}</div>
    </Link>
  ));

  return (
    <div className="main_container">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="page_header">Authors list</div>
          <div className="list_container">{authors}</div>
        </Fragment>
      )}
    </div>
  );
};

export default AuthorsList;
