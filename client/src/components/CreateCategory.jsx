import React, { useState, useContext } from "react";
import server_addr from "../config";
import { CategoryCtx } from "../context";

const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const { UpdateCategories } = useContext(CategoryCtx);

  const POSTCategory = () => {
    return fetch(`http://${server_addr}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: category,
      }),
    });
  };

  return (
    <>
      <form>
        <div className="input">
          <input
            className="inputNew"
            type="text"
            placeholder="Type new category name..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div
            className="buttonNew"
            onClick={(e) => {
              e.preventDefault();
              POSTCategory()
                .then((r) => r.json())
                .then(() => {
                  console.log(`New category "${category}" created`);
                  UpdateCategories();
                });
            }}
          >
            Create
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateCategory;
