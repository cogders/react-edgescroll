import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export const UPWARDS = "upwards";
export const DOWNWARDS = "downwards";

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
    const { delayBeforeActive } = props;

    timerId = setTimeout(() => {
      setDragOn();
    }, delayBeforeActive);
  };

  function handleDragEnd() {
    clearTimeout(timerId);
    clearInterval(intervalId);
    setDragOff();
    setMouseClickOff();
  };

  function handleDragLeave() {
    clearTimeout(timerId);
    clearInterval(intervalId);
  };

  function handleMouseLeave() {
    handleDragLeave();
  };

  function handleDragEnter() {
    const { scrollDelay, direction, scrollContainer } = props;

    const scrollAmount = direction === UPWARDS ? -scrollContainer.innerHeight / 2 : scrollContainer.innerHeight / 2;

    scrollContainer.scrollBy({
      top: scrollAmount,
      behavior: "smooth"
    });

    // eslint-disable-next-line
    intervalId = setInterval(function() {
      scrollContainer.scrollBy({
        top: scrollAmount,
        behavior: "smooth"
      });
    }, scrollDelay);
  };

  function handleMouseDown() {
    const { delayBeforeActive } = props;
    timerId = setTimeout(() => {
      setMouseClickOn();
      setDragOn();
    }, delayBeforeActive);
  };

  function handleMouseUp() {
    clearTimeout(timerId);
    clearInterval(intervalId);
    setMouseClickOff();
    setDragOff();
  };

  function handleMouseEnter() {
    if (isMouseClicked) {
      handleDragEnter();
    }
  };

  function handleReset() {
    clearTimeout(timerId);
    clearInterval(intervalId);
    setMouseClickOff();
    setDragOff();
  }

  useEffect(() => {
    if (!dragEnterRef || !dragEnterRef.current) return;

    const dragEnterEl = dragEnterRef.current;

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
      const { scrollContainer } = props;

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

  const { activeStyle, inactiveStyle } = props;

  const mergedStyle = isDragging ? activeStyle : inactiveStyle;

  return (
    <div
      data-testid="edgescroll-component"
      ref={dragEnterRef}
      style={mergedStyle}
    />
  )
}

EdgeScroll.propTypes = {
  scrollDelay: PropTypes.number,
  direction: PropTypes.string,
  activeStyle: PropTypes.object.isRequired,
  inactiveStyle: PropTypes.object.isRequired,
  scrollContainer: PropTypes.object,
  delayBeforeActive: PropTypes.number
};

EdgeScroll.defaultProps = {
  direction: UPWARDS,
  scrollDelay: 1500, // delay between scrolls
  scrollContainer: window,
  delayBeforeActive: 600  // used to wait xxx miliseconds before becoming active
};

export default EdgeScroll;