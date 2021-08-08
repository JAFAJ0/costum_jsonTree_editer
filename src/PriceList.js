import React, { useState } from "react";
const PriceList = ({
  prices,
  setPrices,
  nPrice,
  setNPrice,
  addNPrice,
  removePrice
}) => {
  const [isexpandedP, setIsexpandedP] = useState(false);
  return (
    <div className="coordinates">
      <h3>price</h3>
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
        onClick={() => setIsexpandedP(!isexpandedP)}
      >
        {!isexpandedP
          ? String.fromCodePoint(parseInt("002B", 16))
          : String.fromCodePoint(parseInt("02D7", 16))}
      </button>
      {isexpandedP && (
        <>
          <p>Type:String</p>
          {prices.map((price, i) => {
            return (
              <div style={{ margin: "5%" }}>
                <textarea
                  key={i}
                  style={{ width: "65%" }}
                  value={price}
                  onChange={(e) => setPrices(e.target.value, i)}
                  onKeyPress={(e) => removePrice(e.key, i)}
                  type="text"
                />
              </div>
            );
          })}
          <p>Type and press enter to add node</p>
          <input
            style={{ width: "65%" }}
            value={nPrice}
            onKeyPress={(e) => addNPrice(e.key)}
            onChange={(e) => setNPrice(e.target.value)}
            type="text"
          />
        </>
      )}
    </div>
  );
};
export default PriceList;
