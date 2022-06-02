const router = require("express").Router();
const { response } = require("express");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name,
    },
    {
      // Gets a category based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updateCategory) => {
      res.json(updateCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteCategory) => {
      res.json(deleteCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
