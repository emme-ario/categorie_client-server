import React, { useContext } from "react";
import server_addr from "../config";
import { CategoryCtx } from "../context";

const DeleteCategories = () => {
  return fetch(`http://${server_addr}/categories`, { method: "DELETE " });
};

const DeleteAll = () => {
  const { UpdateCategories } = useContext(CategoryCtx);
  return (
    <button
      placeholder="delete all"
      onClick={() => {
        DeleteCategories()
          .then(r.json())
          .then(() => {
            console.log("Delete all categories");
            UpdateCategories();
          });
      }}
    >
      Delete all
    </button>
  );
};

export default DeleteAll;
