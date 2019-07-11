import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export const UPWARDS = "upwards";
export const DOWNWARDS = "downwards";
const DRAG_DETECT_TIMEOUT = 300;

function useToggle() {
  const [on, setOnState] = useState(false);

  const toggle = () => setOnState(o => !o);
  const setOn = () => setOnState(true);
  const setOff = () => setOnState(false);

  return {on, toggle, setOn, setOff};
}

function EdgeScroll(props) {
  const dragEnterRef = useRef();

  const {
    on: isDragging,
    setOn: setDragOn,
    setOff: setDragOff
  } = useToggle();

  const {
    on: isMouseClicked,
    setOn: setMouseClickOn,
    setOff: setMouseClickOff
  } = useToggle();

  let intervalId;
  let timerId;

  function handleIsDragging () {
    const { scrollDelay, direction } = props;
    if (direction === DOWNWARDS) {
      timerId = setTimeout(() => {
        setDragOn();
      }, scrollDelay);
    } else if (direction === UPWARDS) {
      setDragOn();
    }
  };

  function handleDragEnd() {
    clearInterval(intervalId);
    clearInterval(timerId);
    setDragOff();
    setMouseClickOff();
  };

  function handleDragLeave() {
    clearInterval(intervalId);
  };

  function handleMouseLeave() {
    handleDragLeave();
  };

  function handleDragEnter() {
    const { scrollDelay, direction } = props;

    const scrollAmount = direction === UPWARDS ? -window.innerHeight / 2 : window.innerHeight / 2;

    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth"
    });

    // eslint-disable-next-line
    intervalId = setInterval(function() {
      window.scrollBy({
        top: scrollAmount,
        behavior: "smooth"
      });
    }, scrollDelay);
  };

  function handleMouseDown(e) {
    console.log(e);
    // TODO: detect the y position of the mouse pointer and if bellow y for the edgescroll add event listener to listen for mouse move, when mouse moves out of the top y of the edgescroll turn on the edge scroll, clear mousemove event listener after turning on the edge scroll
    timerId = setTimeout(() => {
      setMouseClickOn();
      setDragOn();
    }, DRAG_DETECT_TIMEOUT);
  };

  function handleMouseUp() {
    clearTimeout(timerId);
    setMouseClickOff();
    setDragOff();
  };

  function handleMouseEnter() {
    if (isMouseClicked) {
      handleDragEnter();
    }
  };

  function handleReset() {
    clearTimeout(this.timerId);
    clearInterval(this.intervalId);
    setMouseClickOff();
    setDragOff();
  }

  useEffect(() => {
    if (!dragEnterRef || !dragEnterRef.current) return;

    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver(e => console.log(e), options);


    const dragEnterEl = dragEnterRef.current;
    observer.observe(dragEnterEl);


    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("dragstart", handleIsDragging);
    window.addEventListener("dragend", handleDragEnd);
    window.addEventListener("focus", handleReset);
    window.addEventListener("blur", handleReset);
    window.addEventListener("contextmenu", handleReset);

    dragEnterEl.addEventListener("dragenter", handleDragEnter);
    dragEnterEl.addEventListener("dragleave", handleDragLeave);
    dragEnterEl.addEventListener("mouseenter", handleMouseEnter);
    dragEnterEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("dragstart", handleIsDragging);
      window.removeEventListener("dragend", handleDragEnd);
      window.removeEventListener("focus", handleReset);
      window.removeEventListener("blur", handleReset);
      window.removeEventListener("contextmenu", handleReset);

      dragEnterEl.removeEventListener("dragenter", handleDragEnter);
      dragEnterEl.removeEventListener("dragleave", handleDragLeave);
      dragEnterEl.removeEventListener("mouseenter", handleMouseEnter);
      dragEnterEl.removeEventListener("mouseleave", handleMouseLeave);

      clearInterval(intervalId);
      clearTimeout(timerId);
    }
  }, [dragEnterRef, isDragging, isMouseClicked]);

  useEffect(() => {
    const dragEnterEl = dragEnterRef.current;
    
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("dragstart", handleIsDragging);
      window.removeEventListener("dragend", handleDragEnd);
      window.removeEventListener("focus", handleReset);
      window.removeEventListener("blur", handleReset);
      window.removeEventListener("contextmenu", handleReset);

      dragEnterEl.removeEventListener("dragenter", handleDragEnter);
      dragEnterEl.removeEventListener("dragleave", handleDragLeave);
      dragEnterEl.removeEventListener("mouseenter", handleMouseEnter);
      dragEnterEl.removeEventListener("mouseleave", handleMouseLeave);

      clearInterval(intervalId);
      clearTimeout(timerId);
    }
  }, []);

  const { style, isChild } = props;
  let height = style.height || 50;

  if (isChild) {
    height = "auto";
    style.position = "absolute";
  }

  const mergedStyle = {
    ...style,
    height: isDragging ? height : 0,
    border: "1px solid red"
  };

  return <div ref={dragEnterRef} {...props} style={mergedStyle} />;
}

EdgeScroll.propTypes = {
  scrollDelay: PropTypes.number,
  direction: PropTypes.string,
  style: PropTypes.object,
  isChild: PropTypes.bool
};

EdgeScroll.defaultProps = {
  direction: UPWARDS,
  scrollDelay: 1500,
  isChild: true,
  style: {}
};

export default EdgeScroll;