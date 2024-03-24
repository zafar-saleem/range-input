import { RangeInputProps } from "./RangeInputInterfaces";

const RangeInput = ({
  ...props
}: RangeInputProps) => {
  const {
    min,
    max,
    width,
    withLabel,
    currentValue,
    isDragging,
    onMouseDown,
    onTouchStart,
    onKeyDown,
    sliderRef
  } = props;

  return (
    <div
      ref={sliderRef}
      role="slider"
      tabIndex={0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onKeyDown={onKeyDown}
      style={{ width: width ? `${width}px` : '100%' }}
      className="range-input"
    >
      <div
        className="range-input__bar"
        style={{
        width: `${((currentValue - min) / (max - min)) * 100}%`
      }}
      >
        <span className="range-input__handle" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
          <span className={`range-input__label ${!withLabel && 'sr-only'}`}>{currentValue}</span>
        </span>
      </div>
    </div>
  )
}

export default RangeInput;
