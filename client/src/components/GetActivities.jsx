import React, { useEffect, useContext, useState } from "react";
import server_addr from "../config";
import { ActivityCtx } from "../context";

const DELETEActivity = (id) => {
  return fetch(`http://${server_addr}/activities/${id}`, { method: "DELETE" });
};

const GetCategoryName = (id, setCategoryName) => {
  fetch(`http://${server_addr}/categories/${id}`, { method: "GET" })
    .then((r) => r.json())
    .then((result) => {
      try {
        setCategoryName(result[0].name);
      } catch (err) {
        setCategoryName("Error");
      }
    });
};

const ActivityElement = ({ element }) => {
  // console.log(element.name);
  const { UpdateActivities } = useContext(ActivityCtx);
  const [categoryName, setCategoryName] = useState(element.category_id);
  GetCategoryName(element.category_id, setCategoryName);

  return (
    <tr>
      <td>{element.name}</td>
      <td>{element.id}</td>
      <td>{`${categoryName} (${element.category_id})`}</td>
      <td>
        <div
          className="button"
          onClick={() => {
            DELETEActivity(element.id)
              .then((r) => r.json())
              .then(() => {
                UpdateActivities();
                console.log(`Deleted activity with id "${element.id}"`);
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

const GetActivities = () => {
  const { activities, UpdateActivities } = useContext(ActivityCtx);
  useEffect(() => {
    UpdateActivities();
  }, []);
  return (
    <div>
      <h2 className="title">LIST ACTIVITIES</h2>
      {/* <button>Reload</button> */}
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Id</td>
            <td style={{ minWidth: "150px" }}>Category (id)</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <ActivityElement key={index} element={activity} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetActivities;
