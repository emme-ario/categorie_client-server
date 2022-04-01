import React, { useState, useContext } from "react";
import server_addr from "../config";
import { ActivityCtx } from "../context";

const POSTActivity = (activity, categoryId) => {
  return fetch(`http://${server_addr}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: activity,
      categoryId: categoryId,
    }),
  });
};

const CreateActivity = () => {
  const [activity, setActivity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { UpdateActivities } = useContext(ActivityCtx);

  return (
    <>
      <form>
        <div className="input">
          <input
            className="inputNew"
            type="text"
            placeholder="Type new activity name..."
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <input
            className="inputNew"
            style={{ width: "150px" }}
            type="text"
            placeholder="Type category id..."
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
          <div
            className="buttonNew"
            onClick={(e) => {
              e.preventDefault();
              POSTActivity(activity, categoryId)
                .then((r) => r.json())
                .then(() => {
                  console.log(`created new activity "${activity}"`);
                  UpdateActivities();
                });
            }}
          >
            create
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateActivity;
