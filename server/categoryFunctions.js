const sqlite3 = require("sqlite3").verbose();
const database = new sqlite3.Database("./prova.db");

const getCategories = (req, res) => {
  database.all("SELECT * FROM category", (err, rows) => {
    if (err) res.json([]);
    else res.json(rows);
  });
};

const getCategory = (req, res) => {
  database.all(
    "SELECT * FROM category WHERE id = " + req.params.categoryId,
    (err, rows) => {
      if (err) res.json({ status: "SQL error" });
      else res.json(rows);
    }
  );
};

const createCategory = (req, res) => {
  const stmt = database.prepare("INSERT INTO category (name) VALUES (?)");
  const name = req.body.name;
  stmt.run(name);
  stmt.finalize();
  database.all("SELECT last_insert_rowid() AS rowId", (err, rows) => {
    res.json({
      id: rows[0].rowId,
      location: `/categories/${rows[0].rowId}`,
    });
  });
};

const deleteCategories = (req, res) => {
  database.run("DELETE FROM category");
  database.run("UPDATE SQLITE_SEQUENCE SET SEQ = '0' WHERE NAME = 'category'");
  res.json({ deleted: "true" });
};

const deleteCategory = (req, res) => {
  try {
    const { categoryId } = req.params;
    const stmt = database.prepare("DELETE FROM category WHERE id = ?");
    stmt.run(categoryId);
    stmt.finalize();
    res.json({ idCategory: categoryId });
  } catch (err) {
    res.json(err);
  }
};

const updateCategory = (req, res) => {
  console.log(req.body.name, req.params.categoryId);
  const stmt = database.prepare(
    `UPDATE category SET name = (?) WHERE id = ${req.params.categoryId}`
  );
  stmt.run(req.body.name);
  stmt.finalize();
  res.json({ request: "PUT" });
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategories,
  deleteCategory,
  updateCategory,
};
