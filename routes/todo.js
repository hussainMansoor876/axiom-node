const express = require('express')
const router = express.Router()
const { addTodo, getAll, updateTodo, deleteTodo } = require('../controllers/todo')

router.post('/add_todo', addTodo)

router.get('/get_all/:id', getAll)

router.put('/update_todo', updateTodo)

router.delete('/delete_todo/:id', deleteTodo)

module.exports = router