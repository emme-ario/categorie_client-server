const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database("./prova.db");

const getActivities = (req, res) => {
  database.all("SELECT * FROM activity", function (err, rows) {
    if (err) {
      res.json([]);
    } else {
      res.json(rows);
    }
  });
};

const getActivity = (req, res) => {
  database.all(
    "SELECT * FROM activity WHERE id = " + req.params.activityId,
    (err, rows) => {
      if (err) res.json({ status: "SQL error" });
      else res.json(rows);
    }
  );
};

const createActivity = (req, res) => {
  const stmt = database.prepare(
    "INSERT INTO activity (name, category_id) VALUES (?, ?)"
  );
  const name = req.body.name;
  const categoryId = parseInt(req.body.categoryId);
  if (name && categoryId) {
    stmt.run(name, categoryId);
    stmt.finalize();
    database.all("SELECT last_insert_rowid() AS rowid", (err, rows) => {
      res.json({
        id: rows[0].rowid,
        location: `/activites/${rows[0].rowid}`,
      });
    });
  } else {
    res.json({ status: "error" });
  }
};

const deleteActivities = (req, res) => {
  database.run("DELETE FROM activity");
  database.run("UPDATE SQLITE_SEQUENCE SET SEQ = '0' WHERE NAME = 'activity'");
  res.json({ deleted: "true" });
};

const deleteActivity = (req, res) => {
  try {
    const { activityId } = req.params;
    const stmt = database.prepare("DELETE FROM activity WHERE id = ?");
    stmt.run(activityId);
    stmt.finalize();
    res.json({ idActivity: activityId });
  } catch (err) {
    res.json(err);
  }
};

const updateActivity = (req, res) => {
  const stmt = database.prepare(
    `UPDATE activity SET name = "${req.body.name}", category_id = (?) \ WHERE id = ${req.params.activityId}`
  );
  stmt.run(req.body.category_id);
  stmt.finalize();
  res.json({ request: "PUT" });
};

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  deleteActivities,
  deleteActivity,
  updateActivity,
};
