import "./styles.css";
import { saveAs } from "file-saver";
import React, { useState, useEffect } from "react";
import CoordinatesPoint from "./coordinatesPoint";
import ImagesList from "./ImagesList";
import UserList from "./userList";
import PriceList from "./PriceList";
export default function App() {
  const [items, setItems] = useState();
  const [error, setError] = useState(null);
  const [isexpanded, setIsexpanded] = useState(false);
  const [images, setImages] = useState();
  const [users, setUsers] = useState();
  const [prices, setPrices] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [aImage, setAImage] = useState("");
  const [cKey, setCKey] = useState("");
  const [cValue, setCValue] = useState(0);
  const [nPrice, setNPrice] = useState("$");
  const [uKeys, setUKeys] = useState();
  const [uValues, setUValues] = useState();
  const [name, setName] = useState("");
  function save(name) {
    var FileSaver = require("file-saver");
    var blob = new Blob([JSON.stringify(items)], {
      type: "application/json;charset=utf-8"
    });
    FileSaver.saveAs(blob, name);
  }
  function setusers(value, id, key) {
    const newuser = users.map((user, iid) => {
      if (iid === id) {
        if (Object.keys(user).includes(key)) {
          user = {
            ...user,
            [key]: value
          };
        } else {
          delete user[Object.keys(user).find((key) => user[key] === value)];
          user = {
            ...user,
            [key]: value
          };
        }
      }
      return user;
    });
    console.log(newuser);
    setUsers(newuser);
    setItems({
      ...items,
      users: newuser
    });
  }
  function setuKeys(value, i) {
    const newuKeys = uKeys.map((ukey, uid) => {
      if (uid === i) {
        ukey = value;
      }
      return ukey;
    });
    setUKeys(newuKeys);
  }
  function setuValues(value, i) {
    const newuValues = uValues.map((uValue, uid) => {
      if (uid === i) {
        uValue = value;
      }
      return uValue;
    });
    setUValues(newuValues);
  }
  function addUp(value, i) {
    if (value === "Enter" && uKeys[i] && uValues[i]) {
      const newuser = users.map((user, iid) => {
        if (iid === i) {
          user = {
            ...user,
            [uKeys[i]]: uValues[i]
          };
        }
        return user;
      });
      setUsers(newuser);
      setItems({
        ...items,
        users: newuser
      });
    }
  }
  function removeUp(keyE, i, key, value) {
    if (keyE === "Enter" && (key.trim() === "" || value.trim() === "")) {
      const newusers = users.map((user, uid) => {
        if (uid === i) {
          if (Object.keys(user).includes(key)) {
            delete user[key];
          } else {
            delete user[Object.keys(user).find((key) => user[key] === value)];
          }
        }
        return user;
      });
      console.log(newusers);
      setUsers(newusers);
      setItems({
        ...items,
        users: newusers
      });
    }
  }
  function setimages(value, id) {
    const newImages = images.map((image, iid) => {
      if (iid === id) {
        image = value;
      }
      return image;
    });
    setImages(newImages);
    console.log(images);
    setItems({
      ...items,
      images: newImages
    });
  }
  function addAimage(value) {
    if (value === "Enter" && aImage.trim() !== "\n") {
      const newimage = images.concat(aImage);
      setAImage("");
      setImages(newimage);
      setItems({
        ...items,
        images: newimage
      });
    }
  }
  function removeImage(value, i) {
    if (value === "Enter" && images[i].trim() === "") {
      const newimage = images.slice(0, i).concat(images.slice(i + 1));
      setImages(newimage);
      setItems({
        ...items,
        images: newimage
      });
    }
  }
  const setXY = async (value, key) => {
    if (Object.keys(coordinates).includes(key)) {
      setCoordinates((prevState) => ({
        ...prevState,
        [key]: parseFloat(value)
      }));
    } else {
      delete coordinates[
        Object.keys(coordinates).find((key) => coordinates[key] === value)
      ];
      setCoordinates((prevState) => ({
        ...prevState,
        [key]: parseFloat(value)
      }));
    }
    setItems({
      ...items,
      coordinates: coordinates
    });
  };
  function addcoorinates(value) {
    if (value === "Enter" && cKey.trim() !== "\n" && !isNaN(cValue)) {
      console.log(isNaN(cValue));
      setCoordinates((prevState) => ({
        ...prevState,
        [cKey]: parseFloat(cValue)
      }));
      setCKey("");
      setCValue("");
      setItems({
        ...items,
        coordinates: coordinates
      });
    }
  }
  function removecoorinates(keyE, key, value) {
    console.log("u" + key + "u", value);
    if (keyE === "Enter" && (key.trim() === "" || isNaN(value))) {
      const newC = coordinates;
      if (Object.keys(newC).includes(key)) {
        delete newC[key];
      } else {
        delete newC[Object.keys(newC).find((key) => newC[key] === value)];
      }
      console.log(newC);
      setCoordinates(newC);
      setItems({
        ...items,
        coordinates: coordinates
      });
    }
  }
  function setPrice1(value, id) {
    const newprices = prices.map((price, iid) => {
      if (iid === id) {
        price = value;
      }
      return price;
    });
    setPrices(newprices);
    setItems({
      ...items,
      price: newprices
    });
  }
  function addNPrice(value) {
    if (value === "Enter" && nPrice.trim() !== "\n") {
      const newprices = prices.concat(nPrice);
      setNPrice("$");
      setPrices(newprices);
      setItems({
        ...items,
        price: newprices
      });
    }
  }
  function removePrice(value, i) {
    if (value === "Enter" && prices[i].trim() === "") {
      const newprices = prices.slice(0, i).concat(prices.slice(i + 1));
      setPrices(newprices);
      setItems({
        ...items,
        price: newprices
      });
    }
  }
  useEffect(() => {
    fetch("https://bs-random-json.vercel.app/api/data")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setUsers(result.users);
          setImages(result.images);
          setPrices([].concat([result.price])); //turn price to be an arrary in order to easily add nodes inside it...
          setCoordinates(result.coordinates);
          setUKeys(Array(result.users.length).fill(""));
          setUValues(Array(result.users.length).fill(""));
        },
        (error) => {
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="name">
          <p>Root</p>
          <textarea
            value={name}
            placeholder={"Enter a name you want"}
            style={{ marginTop: "0%", width: "10%" }}
            onChange={(e) => setName(e.target.value)}
            type="textarea"
          />
          <button
            class="button"
            style={{
              margin: "1%",
              border: "none",
              width: 60,
              height: 30,
              color: "black"
            }}
            type="button"
            onClick={() => save(name)}
          >
            Save
          </button>
        </div>
        <button
          class="button"
          style={{
            marginTop: "0.5%",
            marginLeft: "49%",
            border: "none",
            width: 30,
            height: 40,
            color: "grey"
          }}
          type="button"
          onClick={() => setIsexpanded(!isexpanded)}
        >
          {!isexpanded
            ? String.fromCodePoint(parseInt("002B", 16))
            : String.fromCodePoint(parseInt("02D7", 16))}
        </button>
        {isexpanded && (
          <div className="total">
            <UserList
              users={users}
              size={users === null ? 0 : users.length}
              setusers={setusers}
              uKeys={uKeys}
              uValues={uValues}
              setuKeys={setuKeys}
              setuValues={setuValues}
              addUp={addUp}
              removeUp={removeUp}
            />
            <ImagesList
              images={images}
              setimages={setimages}
              Aimage={aImage}
              setAimages={setAImage}
              addimage={addAimage}
              removeImage={removeImage}
            />
            <CoordinatesPoint
              coordinates={coordinates}
              setXY={setXY}
              cKey={cKey}
              setCKey={setCKey}
              cValue={cValue}
              setCValue={setCValue}
              addcoorinates={addcoorinates}
              removecoorinates={removecoorinates}
            />
            <PriceList
              prices={prices}
              setPrices={setPrice1}
              nPrice={nPrice}
              setNPrice={setNPrice}
              addNPrice={addNPrice}
              removePrice={removePrice}
            />
          </div>
        )}
      </>
    );
  }
}
