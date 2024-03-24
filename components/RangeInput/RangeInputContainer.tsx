"use client";

import React from "react";
import RangeInput from "./RangeInput";
import { RangeInputContainerProps } from "./RangeInputInterfaces";
import "./RangeInputStyles.scss";

const RangeInputContainer = ({ ...props }: RangeInputContainerProps) => {
  const {
    min,
    max,
    initialValue,
    onChange,
    width,
    step = 5,
    withLabel = false,
  } = props;
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [currentValue, updateCurrentValue] = React.useState(initialValue);
  const [isDragging, updateIsDragging] = React.useState(false);

  const moveSliderPosition = React.useCallback((event: any) => {
    const sliderBoundingClientRect = sliderRef.current?.getBoundingClientRect();
    
    if (sliderBoundingClientRect) {
      const posX = (event.clientX) - sliderBoundingClientRect.left;
      const totalWidth = sliderBoundingClientRect.width;
      
      let selectedValue = Math.round((posX / totalWidth) * (max - min) + min);
      selectedValue = Math.max(min, selectedValue);
      selectedValue = Math.min(max, selectedValue);
      
      updateCurrentValue(selectedValue);
    }
  }, [max, min]);

  const handleMouseUp = React.useCallback(() => {
    onChange(currentValue);
    updateIsDragging(false);
  }, [currentValue, onChange]);
  
  const handleMouseMove = React.useCallback((event: Event) => {
    if (isDragging) {
      moveSliderPosition(event);
    }
  },
  [isDragging, moveSliderPosition]);
  
  const handleMouseDown = (event: MouseEvent) => {
    moveSliderPosition(event);
    updateIsDragging(true);
  };
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      let selectedValue = currentValue;
      
      if (event.key === "ArrowLeft") {
      selectedValue = Math.max(currentValue - step, min);
    } else if (event.key === "ArrowRight") {
      selectedValue = Math.min(currentValue + step, max);
    }
    
    updateCurrentValue(selectedValue);
    onChange(selectedValue);
    }
  };
  
  const handleTouchStart = (event: TouchEvent) => {
    updateIsDragging(true);
    moveSliderPosition(event);
  };
  
  const handleTouchMove = React.useCallback((event: Event) => {
      moveSliderPosition(event);
    },
    [moveSliderPosition]
  );
  
  const handleTouchEnd = React.useCallback(() => {
    onChange(currentValue);
    updateIsDragging(false);
  }, [currentValue, onChange]);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      window.addEventListener("touchend", handleTouchEnd);
    }
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchEnd, handleTouchMove]);
  

  return (
    <RangeInput
      min={min}
      max={max}
      width={width}
      withLabel={withLabel}
      currentValue={currentValue}
      isDragging={isDragging}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      sliderRef={sliderRef}
    />
  )
}

export default RangeInputContainer;
