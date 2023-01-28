import { useState, useEffect, useRef } from "react";
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
  const [currentPosition, setCurrentPosition] = useState(null);
  const refSliderContainer = useRef();

  useEffect(() => {
    const autoSlide = async function () {
      if (currentIndex < images.length) {
        if (currentIndex < 0) {
          setCurrentIndex(images.length - 1);
          setSliderXPosition((images.length - 1) * -100);
        } else {
          setTimer(
            setTimeout(() => {
              setCurrentIndex((preState) => preState + 1);
              setSliderXPosition((prevState) => prevState - 100);
            }, 3000)
          );
        }
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
    refSliderContainer.current.blur();
    setIsSliderStop(false);
  };

  const sliderChangeHandler = function (e, to) {
    clearTimeout(timer);

    if (!to) {
      const index = +e.target.getAttribute("index");
      setCurrentIndex(index);
      setSliderXPosition(index * -100);
    }
    if (to === "next") {
      setCurrentIndex((prevState) => prevState + 1);
      setSliderXPosition((prevState) => prevState - 100);
    }
    if (to === "prev") {
      setCurrentIndex((prevState) => prevState - 1);
      setSliderXPosition((prevState) => prevState + 100);
    }
  };
  const startTouchHandler = function (e) {
    const position = e.targetTouches[0].clientX;
    setCurrentPosition(position);
  };

  const endTouchHandler = function (e) {
    //在mobile上在touch/click結束時將不會把focus留在element上，這樣便不會觸發onMouseEnter
    if (!e.target.closest("button")) {
      e.preventDefault();
    }
    startSliderHandler();
  };

  const moveTouchHandler = function (e) {
    if (!currentPosition) return;
    const movedPosition = e.targetTouches[0].clientX;
    const diffDistance = Math.floor(movedPosition - currentPosition);

    if (diffDistance < -50) {
      sliderChangeHandler(null, "next");
      setCurrentPosition(null);
    }
    if (diffDistance > 50) {
      setCurrentPosition(null);
      sliderChangeHandler(null, "prev");
    }
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
      <div
        onTouchStart={startTouchHandler}
        onTouchMove={moveTouchHandler}
        onTouchEnd={endTouchHandler}
        ref={refSliderContainer}
        className={`${styles.sliders_container} center`}
      >
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
