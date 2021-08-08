import React, { useState } from "react";
const UserList = ({
  users = [],
  size,
  setusers,
  uKeys,
  uValues,
  setuKeys,
  setuValues,
  addUp,
  removeUp
}) => {
  const [expandedUser, setexpandedUser] = React.useState(
    new Array(size).fill(false)
  );
  const [isexpandedU, setIsexpandedU] = React.useState(false);
  function toggleuser(id) {
    const newList = expandedUser.map((item, itemid) => {
      if (id === itemid) {
        item = !item;
      }
      return item;
    });
    setexpandedUser(newList);
  }
  return (
    <div className="users">
      <h3>users</h3>
      <button
        className="button"
        style={{
          marginTop: "0.5%",
          margin: "auto",
          border: "none",
          width: 30,
          height: 40,
          color: "grey"
        }}
        type="button"
        onClick={() => setIsexpandedU(!isexpandedU)}
      >
        {!isexpandedU
          ? String.fromCodePoint(parseInt("002B", 16))
          : String.fromCodePoint(parseInt("02D7", 16))}
      </button>
      <p>Clear and press enter to delete node</p>
      {isexpandedU && (
        <div className="total">
          {users.map((user, i) => {
            return (
              <div style={{ margin: "1%" }} key={i}>
                <p> id : {i}</p>
                <button
                  className="button"
                  style={{
                    marginTop: "0.5%",
                    margin: "auto",
                    border: "none",
                    width: 30,
                    height: 40,
                    color: "grey"
                  }}
                  key={i}
                  type="button"
                  onClick={() => toggleuser(i)}
                >
                  {!expandedUser[i]
                    ? String.fromCodePoint(parseInt("002B", 16))
                    : String.fromCodePoint(parseInt("02D7", 16))}
                </button>
                {expandedUser[i] && (
                  <>
                    <p> Type: String</p>
                    {Object.entries(user).map(([key, value]) => {
                      return (
                        key !== "id" && (
                          <>
                            <textarea
                              value={key}
                              style={{ fontWeight: "bold", border: "none" }}
                              onChange={(e) =>
                                setusers(value, i, e.target.value)
                              }
                              onKeyPress={(e) => removeUp(e.key, i, key, value)}
                              type="textarea"
                            />
                            {typeof value !== "boolean" ? (
                              <textarea
                                value={value}
                                style={{
                                  borderWidth: "0 0 2px"
                                }}
                                onChange={(e) =>
                                  setusers(e.target.value, i, key)
                                }
                                onKeyPress={(e) =>
                                  removeUp(e.key, i, key, value)
                                }
                                type="textarea"
                              />
                            ) : (
                              <>
                                <p></p>
                                <button
                                  className="button"
                                  style={{
                                    marginTop: "0.5%",
                                    margin: "auto",
                                    border: "none",
                                    width: 40,
                                    height: 40
                                  }}
                                  key={i}
                                  type="button"
                                  onClick={() => setusers(!value, i, key)}
                                >
                                  {value ? "true" : "false"}
                                </button>
                              </>
                            )}
                          </>
                        )
                      );
                    })}
                    <p>Type and press enter to add node</p>
                    <textarea
                      value={uKeys[i]}
                      onKeyPress={(e) => addUp(e.key, i)}
                      onChange={(e) => setuKeys(e.target.value, i)}
                      type="textarea"
                    />
                    <textarea
                      value={uValues[i]}
                      onKeyPress={(e) => addUp(e.key, i)}
                      onChange={(e) => setuValues(e.target.value, i)}
                      type="textarea"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default UserList;
