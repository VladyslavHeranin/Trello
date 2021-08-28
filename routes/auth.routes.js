const { Router } = require("express")
const User = require("../models/User")
const List = require("../models/List")
const Item = require("../models/Item")
const router = new Router()
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")

const { check, validationResult } = require("express-validator")
const authMiddleware = require("../middleware/auth")

router.post("/registration",
    [
        check("email", "некоректный email").isEmail(),
        check("password", "минимум 6 символов").isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const {
                email,
                password,
                name,
            } = req.body

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "uncorrect request",
                    error
                })
            }

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: `user with email ${email} already exist` })
            }

            const hashedPassword = await bcrypt.hash(password, 7)

            const user = new User({
                name,
                email,
                password: hashedPassword,
            })

            await user.save()

            return res.json({ message: "User was created" })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })

router.post("/login",
    async (req, res) => {

        const { email, password } = req.body

        try {

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: "Invalid password" })
            }

            const lists = await List.find({ id: user._id })

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                token,
                lists: lists,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            })



        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    }
)


router.post("/list",
    async (req, res) => {

        const { id, name } = req.body

        const list = new List({ id, name })

        await list.save()

        const lists = await List.find({ id: id })

        const user = await User.findOne({ _id: id })

        try {
            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                token,
                lists: lists,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                message: `Good !!!`
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })



router.get("/auth", authMiddleware,
    async (req, res) => {

        const lists = await List.find({ id: req.user.id })

        const user = await User.findOne({ _id: req.user.id })

        try {
            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                token,
                lists: lists,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            })
        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })


router.delete("/delList/:id", authMiddleware,
    async (req, res) => {

        const curentId = req.params.id

        const list = await List.findOne({ _id: curentId })

        await list.remove()

        const lists = await List.find({ id: req.user.id })

        const user = await User.findOne({ _id: req.user.id })

        const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

        try {
            return res.json({
                token,
                lists: lists,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })


router.delete("/deleteItem/:id", authMiddleware,
    async (req, res) => {

        const item = await Item.findOne({ _id: req.params.id })

        const list = await List.findOne({ _id: item.listId })

        await item.remove()

        await List.updateOne(list, { 'items': await list.items.filter(i => i._id != req.params.id) })

        const lists = await List.find({ id: req.user.id })

        const user = await User.findOne({ _id: req.user.id })

        try {
            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                token,
                lists: lists,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })





router.post("/createItem",
    async (req, res) => {

        const { listId, id, name } = req.body

        const item = new Item({ id, listId, name })

        await item.save()

        const list = await List.findOne({ _id: listId })

        await list.update({ $push: { "items": item } })

        const user = await User.findOne({ _id: id })

        const lists = await List.find({ id: id })

        const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

        try {

            return res.json({
                token,
                lists: lists,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    }
)


module.exports = router

