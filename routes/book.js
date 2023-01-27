const { randomInt, DiffieHellmanGroup } = require("crypto")
const express = require("express")
const router = express.Router()
let bookList = require('../list.json')
// const { nanoid } = require("nanoid");
// import { nanoid } from 'nanoid'

// bookList=JSON.parse(bookList)


/**
 * @swagger
 * components:
 *    schemas:
 *       Book:
 *          type: object
 *          required:
 *              - title
 *              - author
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto generated id
 *              title:
 *                  type: string
 *                  descprition: title of book
 *              author:
 *                  type: string
 *                  description: author of book
 *          example:
 *             id: abc
 *             title: eth_Blockchain
 *             author: Raghav Gupta
 */


/**
 * @swagger
 * tags:
 *  name: Books 
 *  description: Books APIS
 */

/**
 * @swagger
 * /books:
 *   get:
 *      summary: Returns a list of books 
 *      tags: [Books]
 *      responses:
 *          200:
 *              description: The List of all books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 */

router.get('/', (req, res) => {
    console.log(bookList['books'])
    res.send(bookList['books'])
})

/**
 * @swagger
 * /books/{id}:
 *         get:
 *          summary: Returns book with the given id
 *          tags: [Books]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                type: string
 *                required: true
 *                description: The book id
 *          responses:
 *              200:
 *                  description: Book with given id
 *                  content:
 *                      application/json:
 *                          schema:
 *                                  $ref: '#/components/schemas/Book'
 *              404:
 *                  description: Book not found
 */

router.get('/:id', (req, res) => {
    const arr = bookList['books']
    const result = arr.find(obj => obj.id === req.params.id)
    result ? res.send(result) : res.sendStatus(404)
})

/**
 * @swagger
 * /books:
 *      post:
 *          summary: Create a new book
 *          tags: [Books]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Book'
 *          responses:
 *              200:
 *                  description: Book created 
 *                  content:
 *                      application/json:
 *                          schema:
 *                                  $ref: '#/components/schemas/Book'
 *              500:
 *                  description: server error
 */


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

/**
 * @swagger
 * /books/{id}:
 *  put:
 *   summary: Update an existing book
 *   tags: [Books]
 *   parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The book id
 *   requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Book'
 *   responses:
 *            200:
 *               description: book updated sucessfully
 *               content:
 *                      application/json:
 *                          schema:
 *                                  $ref: '#/components/schemas/Book'
 *            404:
 *                description: book not found
 *            500:
 *                description : server error
 */
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