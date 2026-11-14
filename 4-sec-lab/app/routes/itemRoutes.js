const express = require('express');
const router  = express.Router();
const Item    = require('../models/Item');

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Fetch all items
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Bad Request
 */
router.post('/items', async (req, res) => {
  try {
    console.log('📥 POST recieved /items. Datas:', req.body);
    const item = await Item.create({ 
      name: req.body.name 
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ 
      error: err.message 
    });
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
});

module.exports = router;
