import React, { useState } from "react";
import { nextDate, thisDate, lastDate } from "../../utils/time";

function Header(props) {
  const { selectTilte, selectMode, setSelectMode, RefBody } = props;

  function selectHeader(e) {
    if (e.target.classList.contains("header-arrow-left")) {
      swipeLeft();
    } else if (e.target.classList.contains("header-arrow-right")) {
      swipeRight();
    }
  }

  const RefTitle = React.createRef();

  function showTitle() {
    switch (selectTilte) {
      case "Все дни":
        return "Все дни";
      case thisDate():
        return "Сегодня";
      case nextDate():
        return "Завтра";
      case lastDate():
        return "Вчера";
      default:
        return selectTilte;
    }
  }

  function swipeLeft() {
    if (selectMode === "ToDay") {
      RefBody.current.style.transform = `translate3d(-0vw, 0px, 0px)`;
      RefTitle.current.style.transform = `translate3d(-0vw, 0px, 0px)`;
      setSelectMode("AllDays");
    } else if (selectMode === "TomorrowDay") {
      RefBody.current.style.transform = `translate3d(-100vw, 0px, 0px)`;
      RefTitle.current.style.transform = `translate3d(-100vw, 0px, 0px)`;
      setSelectMode("ToDay");
    }
  }

  function swipeRight() {
    if (selectMode === "ToDay") {
      RefBody.current.style.transform = `translate3d(-200vw, 0px, 0px)`;
      RefTitle.current.style.transform = `translate3d(-200vw, 0px, 0px)`;
      setSelectMode("TomorrowDay");
    } else if (selectMode === "AllDays") {
      RefBody.current.style.transform = `translate3d(-100vw, 0px, 0px)`;
      RefTitle.current.style.transform = `translate3d(-100vw, 0px, 0px)`;
      setSelectMode("ToDay");
    }
  }

  const [touchPosition, setTouchPosition] = useState(null);
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };
  const handleTouchMove = (e) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      swipeRight();
    }
    if (diff < -5) {
      swipeLeft();
    }
    setTouchPosition(null);
  };
  return (
    <header
      className="header"
      onTouchStart={handleTouchStart}
      onClick={selectHeader}
      onTouchMove={handleTouchMove}
    >
      <div className="header-arrow-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="17"
          viewBox="0 0 19 17"
          fill="none"
        >
          <path
            d="M7.33494 14.75C8.29719 16.4167 10.7028 16.4167 11.6651 14.75L17.2942 5C18.2565 3.33333 17.0537 1.25 15.1292 1.25L3.87083 1.25C1.94633 1.25 0.743522 3.33334 1.70577 5L7.33494 14.75Z"
            stroke="var(--textColor)"
          />
        </svg>
      </div>
      <div className="title maintitle" ref={RefTitle}>
        <div className="titleAll title-text">{showTitle()}</div>
        <div className="titleToDay title-text">Сегодня</div>
        <div className="titleTomorrowDay title-text">Завтра</div>
      </div>
      <div className="header-arrow-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="17"
          viewBox="0 0 19 17"
          fill="none"
        >
          <path
            d="M7.33494 14.75C8.29719 16.4167 10.7028 16.4167 11.6651 14.75L17.2942 5C18.2565 3.33333 17.0537 1.25 15.1292 1.25L3.87083 1.25C1.94633 1.25 0.743522 3.33334 1.70577 5L7.33494 14.75Z"
            stroke="var(--textColor)"
          />
        </svg>
      </div>
    </header>
  );
}
export default Header;
