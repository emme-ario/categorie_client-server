import React, { useState } from "react";
import server_addr from "./config";
import CreateCategory from "./components/CreateCategory";
import GetCategories from "./components/GetCategories";
import DeleteCategories from "./components/DeleteCategories";
import { CategoryCtx } from "./context";
import CreateActivity from "./components/CreateActivity";
import GetActivities from "./components/GetActivities";
import DeleteActivities from "./components/DeleteActivities";
import { ActivityCtx } from "./context";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);

  const UpdateCategories = () =>
    fetch(`http://${server_addr}/categories`)
      .then((r) => r.json())
      .then((body) => setCategories(body));

  const UpdateActivities = () =>
    fetch(`http://${server_addr}/activities`)
      .then((r) => r.json())
      .then((body) => setActivities(body));

  return (
    <main>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          gap: "50px",
        }}
      >
        <div>
          <CategoryCtx.Provider
            value={{ categories, setCategories, UpdateCategories }}
          >
            <GetCategories />
            <br></br>
            <CreateCategory />
            {/* <DeleteCategories /> */}
          </CategoryCtx.Provider>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <ActivityCtx.Provider
            value={{ activities, setActivities, UpdateActivities }}
          >
            <GetActivities />
            <br></br>
            <CreateActivity />
            {/* <DeleteActivities /> */}
          </ActivityCtx.Provider>
        </div>
      </div>
    </main>
  );
}

export default App;
