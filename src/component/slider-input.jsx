import React from "react";
import { numberWithCommas } from "../utils/config";

function SliderInput({
  title,
  state,
  underlineTitle,
  onChange,
  min,
  max,
  labelMin,
  labelMax
}) {
  return (
    <>
      <span className="title">{title}</span>
      {state > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineTitle}
        </span>
      )}
      <div>
        <input
          min={min}
          max={max}
          onChange={onChange}
          className="slider"
          type="range"
          value={state}
        />
        <div className="lables">
          <label>{labelMin ?? numberWithCommas(min)}</label>
          <b>{numberWithCommas(state)}</b>
          <label>{labelMax ?? numberWithCommas(max)}</label>
        </div>
      </div>
    </>
  );
}

export default SliderInput;
