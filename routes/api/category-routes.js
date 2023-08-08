const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(data)

  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })

    if (!data) {
      return res.status(404).json({ message: "No category found" })
    }
    res.status(200).json(data)

  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!updatedCategory) {
      res.status(404).json({ message: "No category found" })
      return
    }

    res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deletedCategory) {
      res.status(404).json({ message: "No category found with the id" })
      return
    }

    res.status(200).json(deletedCategory)

  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err })
  }
});

module.exports = router;
