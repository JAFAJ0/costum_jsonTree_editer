import React, { useState } from "react";
const CoordinatesPoint = ({
  coordinates,
  setXY,
  cKey,
  cValue,
  setCKey,
  setCValue,
  addcoorinates,
  removecoorinates
}) => {
  const [isexpandedC, setIsexpandedC] = useState(false);
  return (
    <div className="coordinates">
      <h3>coordinates</h3>
      <button
        className="button"
        style={{
          marginTop: "0.5%",
          //marginRight: "5%",
          margin: "auto",
          border: "none",
          width: 30,
          height: 40,
          color: "grey"
        }}
        type="button"
        onClick={() => setIsexpandedC(!isexpandedC)}
      >
        {!isexpandedC
          ? String.fromCodePoint(parseInt("002B", 16))
          : String.fromCodePoint(parseInt("02D7", 16))}
      </button>
      {isexpandedC && (
        <>
          <p> Type: number</p>
          {Object.entries(coordinates).map(([key, value]) => {
            return (
              <>
                <textarea
                  value={key}
                  key={key}
                  onChange={(e) => setXY(value, e.target.value)}
                  onKeyPress={(e) => removecoorinates(e.key, key, value)}
                  type="textarea"
                />
                <textarea
                  value={value}
                  onChange={(e) => setXY(e.target.value, key)}
                  onKeyPress={(e) => removecoorinates(e.key, key, value)}
                  type="textarea"
                />
              </>
            );
          })}
          <p>Type and press enter to add node</p>
          <textarea
            value={cKey}
            onKeyPress={(e) => addcoorinates(e.key)}
            onChange={(e) => setCKey(e.target.value)}
            type="textarea"
          />
          <textarea
            value={cValue}
            onKeyPress={(e) => addcoorinates(e.key)}
            onChange={(e) => setCValue(parseFloat(e.target.value))}
            type="textarea"
          />
        </>
      )}
    </div>
  );
};
export default CoordinatesPoint;
