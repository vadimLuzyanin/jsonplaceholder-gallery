import React, { useState, useEffect } from "react";
import styles from "./ModalImageView.module.css";
import clsx from "clsx";

const ModalImageView = ({
  isOpen,
  switchModalImageView,
  albumPictures,
  currentImageIdx,
  setCurrentImageIdx,
}) => {
  const [prevImageIdx, setPrevImageIdx] = useState(0);
  const [slidingDist, setSlidingDist] = useState(0);

  const goBack = () => {
    if (currentImageIdx > 0) {
      setCurrentImageIdx((prev) => prev - 1);
      setSlidingDist(1);
    }
  };
  const goForward = () => {
    if (currentImageIdx < albumPictures.length - 1) {
      setCurrentImageIdx((prev) => prev + 1);
      setSlidingDist(1);
    }
  };

  useEffect(() => {
    setSlidingDist(Math.abs(currentImageIdx - prevImageIdx));
    setPrevImageIdx(currentImageIdx);
  }, [currentImageIdx]);

  const images =
    albumPictures &&
    albumPictures.map((item) => (
      <img className={styles.image} src={item.url} alt="" key={item.id} />
    ));

  return (
    <div
      className={clsx(styles.container, !isOpen && styles.container__hidden)}
      onClick={switchModalImageView}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div
          className={clsx([styles.action_button, styles.action_button_left])}
          onClick={goBack}
        >
          <svg
            className={styles.action_button_left__arrow}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
          </svg>
        </div>
        <div className={styles.images_scroll_container}>
          <div
            className={styles.imageContainer}
            style={{
              transform: `translateX(${currentImageIdx * -100}%)`,
              transition: slidingDist === 1 && "all 0.3s",
            }}
          >
            {images}
          </div>
        </div>
        <div
          className={clsx([styles.action_button, styles.action_button_right])}
          onClick={goForward}
        >
          <svg
            className={styles.action_button_right__arrow}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ModalImageView;
