const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 2500;

const categoryFunctions = require("./categoryFunctions.js");
const activityFunctions = require("./activityFunctions.js");

const statusAlive = (req, res) => {
  res.json({ server: "alive" });
};

app.get("/", statusAlive);

app.get("/categories", categoryFunctions.getCategories);
// app.get('/categories/name=:name', categoryFunctions.getIdFromName)
app.get("/categories/:categoryId", categoryFunctions.getCategory);
app.post("/categories", categoryFunctions.createCategory);
app.put("/categories/:categoryId", categoryFunctions.updateCategory);
app.delete("/categories/", categoryFunctions.deleteCategories);
app.delete("/categories/:categoryId", categoryFunctions.deleteCategory);

app.get("/activities", activityFunctions.getActivities);
app.get("/activities/:activityId", activityFunctions.getActivity);
app.post("/activities", activityFunctions.createActivity);
app.put("/activities/:activityId", activityFunctions.updateActivity);
app.delete("/activities/", activityFunctions.deleteActivities);
app.delete("/activities/:activityId", activityFunctions.deleteActivity);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on port", PORT);
});
