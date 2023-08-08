const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: { model: Product }
    })
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: { model: Product }
    })

    if (!tag) {
      return res.status(404).json({ message: "Cannot find a tag" })
    }
    res.status(200).json(tag)

  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)

  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!updatedTag) {
      return res.status(404).json({ message: "Cannot find a tag" })
    }

    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!deletedTag) {
      return res.status(404).json({ message: "Cannot find a tag" })
    }

    res.status(200).json(deletedTag)
  } catch (err) {
    res.status(500).json({ message: "Error", error: err })
  }
});

module.exports = router;
