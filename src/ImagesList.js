import React, { useState } from "react";
const ImagesList = ({
  images = [],
  setimages,
  Aimage,
  setAimages,
  addimage,
  removeImage
}) => {
  const [isexpandedI, setIsexpandedI] = React.useState(false);
  return (
    <div className="coordinates">
      <h3>images</h3>
      <button
        className="button"
        style={{
          marginTop: "0.5%",
          margin: "auto",
          border: "none",
          width: 30,
          height: 40,
          color: "grey",
          background: "lightblue"
        }}
        type="button"
        onClick={() => setIsexpandedI(!isexpandedI)}
      >
        {!isexpandedI
          ? String.fromCodePoint(parseInt("002B", 16))
          : String.fromCodePoint(parseInt("02D7", 16))}
      </button>
      <p>Clear and press enter to delete node</p>
      {isexpandedI && (
        <>
          <p>Type:string</p>
          {images.map((image, i) => {
            return (
              <div style={{ margin: "5%" }} key={i}>
                <textarea
                  style={{ width: "65%" }}
                  value={image}
                  onChange={(e) => setimages(e.target.value, i)}
                  onKeyPress={(e) => removeImage(e.key, i)}
                  type="text"
                />
              </div>
            );
          })}
          <p>Type and press enter to add node</p>
          <input
            style={{ width: "65%" }}
            value={Aimage}
            onKeyPress={(e) => addimage(e.key)}
            onChange={(e) => setAimages(e.target.value)}
            type="text"
          />
        </>
      )}
    </div>
  );
};
export default ImagesList;
