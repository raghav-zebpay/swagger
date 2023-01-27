const { randomInt, DiffieHellmanGroup } = require("crypto")
const express = require("express")
const router = express.Router()
let bookList = require('../list.json')








router.get('/', (req, res) => {
    console.log(bookList['books'])
    res.send(bookList['books'])
})



router.get('/:id', (req, res) => {
    const arr = bookList['books']
    const result = arr.find(obj => obj.id === req.params.id)
    result ? res.send(result) : res.sendStatus(404)
})




router.post('/', (req, res) => {
    try {
        const book = {
            id: "raghav_gup",
            ...req.body
        }

        bookList['books'].push(book)
        res.send(book)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.put('/:id', (req, res) => {
    const arr = bookList['books']
    console.log(arr)
    let result = arr.find(obj => obj.id === req.params.id)
    if (!result) {
        res.sendStatus(404)
    }
    try {
        let index = arr.findIndex(obj => obj.id === req.params.id)
        const new_book = {
            id: arr[index].id,
            ...req.body
        }
        arr[index] = new_book
        res.send(new_book)
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router