import React from "react";

interface SharedRangeInputProps {
  min: number;
  max: number;
  width?: number;
  withLabel?: boolean;
}

export interface RangeInputProps extends SharedRangeInputProps {
  currentValue: number;
  isDragging: boolean;
  onMouseDown: (event: any) => void;
  onTouchStart: (event: any) => void;
  onKeyDown: (event: any) => void;
  sliderRef: React.RefObject<HTMLDivElement>;
}

export interface RangeInputContainerProps extends SharedRangeInputProps {
  initialValue: number;
  onChange: (currentValue: number) => void;
  step?: number;
}
