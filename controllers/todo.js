const { Todos } = require('../models')

const addTodo = (req, res) => {
    try {
        const { body } = req

        if (!body?.task || !body?.userId) {
            return res.send({ success: false, message: 'Please provide task' })
        }

        let todo = new Todos(body)

        todo.save()
            .then(() => {
                res.send({ success: true, message: 'Successfully Added Task', todo: { _id: todo?._id, task: todo?.task } })
            })
            .catch(e => {
                console.log('e', e)
                return res.send({ success: false, message: 'Something Went Wrong!' })
            })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

const getAll = (req, res) => {
    try {
        const userId = req?.params?.id

        Todos.find({ userId }, { __v: 0 }, (err, tasks) => {
            if (err || !tasks?.length) {
                return res.send({ success: false, message: 'No Task Found!' })
            }

            return res.send({ success: true, tasks })
        }).sort({ task: 1 })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

const updateTodo = (req, res) => {
    try {
        const { body } = req

        if (!body?._id || !body?.task) {
            return res.send({ success: false, message: 'Please provide task' })
        }

        Todos.findByIdAndUpdate(body?._id, { task: body?.task }, { new: true, fields: { __v: 0 } }, (err, todo) => {
            if (err || !todo) {
                return res.send({ success: false, message: 'No Task Found!' })
            }

            return res.send({ success: true, todo })
        })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = req?.params?.id

        if (!id) {
            return res.send({ success: false, message: 'Please Provide todo id!' })
        }

        await Todos.findByIdAndDelete(id)

        return res.send({ success: true, message: 'Successfully deleted!' })
    }
    catch (e) {
        console.log('e', e)
        return res.send({ message: e?.message, success: false })
    }
}

module.exports = {
    addTodo,
    getAll,
    updateTodo,
    deleteTodo
}