import { useState, useEffect } from "react";
import styles from "./ImageSlider.module.css";

const images = [
  {
    imageNo: "i001",
    fileName: "slider1_1200w.jpg",
    alt: "Accessories on a table",
  },
  {
    imageNo: "i002",
    fileName: "slider2_1200w.jpg",
    alt: "Accessories on a table",
  },
  {
    imageNo: "i003",
    fileName: "slider3_1200w.jpg",
    alt: "Accessory looks like astronaut",
  },
];

function ImageSlider() {
  const [sliderXPosition, setSliderXPosition] = useState(0);
  const [timer, setTimer] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliderStop, setIsSliderStop] = useState(false);

  useEffect(() => {
    const autoSlide = async function () {
      if (currentIndex < images.length) {
        setTimer(
          setTimeout(() => {
            setCurrentIndex((preState) => preState + 1);
            setSliderXPosition((prevState) => prevState - 100);
          }, 3000)
        );
      } else {
        setCurrentIndex(0);
        setSliderXPosition(0);
      }
    };

    if (isSliderStop) return;
    autoSlide();
  }, [currentIndex, isSliderStop]);

  const stopSliderHandler = function () {
    setIsSliderStop(true);
    clearTimeout(timer);
  };
  const startSliderHandler = function () {
    setIsSliderStop(false);
  };

  const sliderChangeHandler = function (e) {
    const index = +e.target.getAttribute("index");
    clearTimeout(timer);
    setCurrentIndex(index);
    setSliderXPosition(index * -100);
  };

  const sliderImage = images.map((img, i) => {
    return (
      <div
        className={styles.img_box}
        key={img.imageNo}
        index={i}
        onMouseEnter={stopSliderHandler}
        onMouseLeave={startSliderHandler}
      >
        <img
          className={styles.img}
          src={require(`../../images/slider/${img.fileName}`)}
          alt={img.alt}
        />
      </div>
    );
  });

  const sliderButtons = images.map((img, i) => (
    <button
      key={`b00${i}`}
      className={styles.slider_selector}
      style={{ backgroundColor: i === currentIndex && "#FFF" }}
      index={i}
      onClick={sliderChangeHandler}
    ></button>
  ));

  return (
    <>
      <div className={`${styles.sliders_container} center`}>
        <div
          className={styles.slider_box}
          style={{ transform: `translateX(${sliderXPosition}%)` }}
        >
          {sliderImage}
        </div>
        <div className={styles.slider_selectors_box}>{sliderButtons}</div>
      </div>
    </>
  );
}

export default ImageSlider;
