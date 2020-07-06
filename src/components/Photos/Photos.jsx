import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import ModalImageView from "../ModalImageView/ModalImageView";
import styles from "./Photos.module.css";
import Loader from "../Loader/Loader";
import { fetchAlbum } from "../../fetchApi/fetchApi";

const Photos = () => {
  const { albumId } = useParams();

  const [album, setAlbum] = useState({});
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    fetchAlbum(albumId, setLoading, setAlbum);
  }, [albumId]);

  const switchModalImageView = () => {
    setModalOpen((prev) => !prev);
  };

  const photos =
    album.pictures &&
    album.pictures.map((picture, idx) => (
      <div key={picture.id} className={styles.image}>
        <img
          src={picture.thumbnailUrl}
          alt="thumbnail"
          onClick={() => {
            setCurrentImageIdx(idx);
            switchModalImageView(true);
          }}
        ></img>
      </div>
    ));

  return (
    <div className="main_container">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="page_header">Album '{album.title}'</div>
          <div className={styles.images_container}>{photos}</div>
        </Fragment>
      )}
      {album.pictures && album.pictures[currentImageIdx] && (
        <ModalImageView
          isOpen={modalOpen}
          switchModalImageView={switchModalImageView}
          albumPictures={album.pictures}
          currentImageIdx={currentImageIdx}
          setCurrentImageIdx={setCurrentImageIdx}
        />
      )}
    </div>
  );
};

export default Photos;
