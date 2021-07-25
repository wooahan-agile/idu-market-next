import React, { useState, useEffect, useRef } from "react";

const Introduce = ({ prevSectionOffset, nextSectionOffset, getOffsetTop }) => {
  const [scrollViewYoutube, setScrollViewYoutube] = useState(false);
  const [touchStartPageY, setTouchStartPageY] = useState(0);
  const [touchEndPageY, setTouchEndPageY] = useState(0);

  const ref = useRef();
  const handleScroll = () => {
    const pageScrollY = window.scrollY;

    if (pageScrollY >= 1900) {
      setTimeout(() => setScrollViewYoutube(true), 300);
    } else {
      setScrollViewYoutube(false);
    }
  };

  const onTouchScreenStart = (e) => {
    setTouchStartPageY(e.changedTouches[0].pageY);
  };

  const onTouchScreenEnd = (e) => {
    setTouchEndPageY(e.changedTouches[0].pageY);

    if (touchStartPageY && touchEndPageY) {
      if (touchStartPageY >= touchEndPageY) {
        window.scrollTo({ top: nextSectionOffset });
      } else {
        window.scrollTo({ top: prevSectionOffset });
      }
    }
  };

  const onWheel = (e) => {
    if (e.deltaY >= 100) {
      window.scrollTo({ top: nextSectionOffset });
    } else {
      window.scrollTo({ top: prevSectionOffset });
    }
  };

  useEffect(() => {
    getOffsetTop(ref.current.offsetTop);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={ref}
      onWheel={onWheel}
      onTouchStart={onTouchScreenStart}
      onTouchEnd={onTouchScreenEnd}
      id="home-introduce"
      className="home-introduce"
    >
      <div className="container">
        <div className="intro-desc-box">
          <h5>Idu Market</h5>
          <h2>아이두 마켓 소개 영상</h2>
        </div>
        <div className={scrollViewYoutube ? "youtube-box show" : "youtube-box"}>
          <iframe
            className="intro-youtube"
            title="iuam intro youtube"
            src="https://www.youtube.com/embed/f6bLhqHekY8"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default Introduce;
