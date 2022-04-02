import React, { useEffect, useState, useContext } from "react";
import server_addr from "../config";
import { CategoryCtx } from "../context";

const DELETECategory = (id) => {
  return fetch(`http://${server_addr}/categories/${id}`, { method: "DELETE" });
};

const PUTCategory = (id, newName) => {
  return fetch(`http://${server_addr}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
    }),
  });
};

const CategoryElement = ({ element }) => {
  const { UpdateCategories, UpdateActivities } = useContext(CategoryCtx);
  const [newCategoryName, setNewCategoryName] = useState("");
  return (
    <tr>
      <td>{element.name}</td>
      <td>{element.id}</td>
      <td>
        <form>
          <div className="input">
            <input
              className="inputForm"
              type="text"
              placeholder="Type category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <div
              className="buttonForm"
              onClick={(e) => {
                e.preventDefault();
                PUTCategory(element.id, newCategoryName)
                  .then((r) => r.json())
                  .then(() => {
                    console.log(`Modified category with id ${element.id}`);
                    UpdateCategories();
                  });
              }}
            >
              Send
            </div>
          </div>
        </form>
      </td>
      <td>
        <div
          className="button"
          onClick={() => {
            DELETECategory(element.id)
              .then((r) => r.json())
              .then(() => {
                UpdateCategories();
                UpdateActivities();
                console.log(`Deleted category with id "${element.id}"`);
              });
          }}
        >
          <p className="deleteBtn">DELETE</p>
          <div className="button2">
            <p className="deleteBtn2">X</p>
          </div>
        </div>
      </td>
    </tr>
  );
};

const CategoriesList = () => {
  const { categories, UpdateCategories } = useContext(CategoryCtx);

  useEffect(() => {
    UpdateCategories();
  }, []);

  return (
    <div>
      <h2 className="title">LIST CATEGORIES</h2>
      {/* <button>Reload</button> */}
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Id</td>
            <td>Update</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, pos) => (
            <CategoryElement key={pos} element={category} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesList;
