import React, { useContext } from "react";
import server_addr from "../config";
import { ActivityCtx } from "../context";

const DeleteActivities = () => {
  return fetch(`http://${server_addr}/activities`, { method: "DELETE" });
};

const DeleteAll = () => {
  const { UpdateActivities } = useContext(ActivityCtx);
  return (
    <button
      placeholder="delete all"
      onClick={() => {
        DeleteActivities()
          .then((r) => r.json())
          .then(() => {
            console.log("delete all activities");
            UpdateActivities();
          });
      }}
    >
      Delete all
    </button>
  );
};

export default DeleteAll;
