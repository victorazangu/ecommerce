import mongoose, { Schema } from 'mongoose'
import Order from '../models/order.js'
import OrdertItem from '../models/ordertItem.js'
import ordertItem from '../models/ordertItem.js'

const createOrder = async (req, res) => {
    const validUserId = mongoose.Types.ObjectId.isValid(req.body.user)
    if (!validUserId) {
        res.status(400).json({ message: 'Invalid user Id' })
        return
    }
    try {
        const orderItemsId = Promise.all(
            req.body.orderItems.map(async (orderItem) => {
                let newOrdewrIten = new OrdertItem({
                    quantity: orderItem.quantity,
                    product: orderItem.product,
                })
                newOrdewrIten = await newOrdewrIten.save()
                return newOrdewrIten.id
            })
        )
        const orderItemIdsResolved = await orderItemsId

        const order = await Order.create({
            orderItems: orderItemIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: req.body.totalPrice,
            user: req.body.user,
        })
        if (order) {
            res.status(201).json(order)
        } else {
            res.status(500).json({ message: 'Error creating order' })
        }
    } catch (e) {
        console.log(e.message)
    }
}

const getAllOrders = async (req, res) => {
    const orderList = await Order.find()
        .populate('user', [
            'name',
            'email',
            'street',
            'country',
            'zip',
            'mobile',
        ])
        .populate('orderItems')
        .sort('dateOrdered')
    if (!orderList) {
        res.status(404).json({ message: 'No order were found' })
    }
    res.status(200).json(orderList)
}
const getOrderById = async (req, res) => {
    try {
        const validOrderId = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!validOrderId) {
            res.status(400).json({ message: 'Invalid order Id' })
            return
        }

        const order = await Order.findById(req.params.id)
            .populate('user', [
                'name',
                'email',
                'street',
                'country',
                'zip',
                'mobile',
            ])
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: 'category',
                },
            })

        if (!order) {
            res.status(404).json({ message: 'No order were found' })
        }

        res.status(200).json(order)
    } catch (e) {
        console.error(e.message)
    }
}
const updateOrderStatus = async (req, res) => {
    const isValidOrderId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidOrderId) {
        res.status(400).json({ message: 'Invalid order Id' })
        return
    }

    await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    )
        .then((order) => {
            if (order) {
                res.status(200).json({
                    success: true,
                    message: 'Order is updated',
                    data: order,
                })
            } else {
                res.status(404).json({ message: 'Order not found' })
            }
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error while updating order',
                error: e.message,
            })
        })
}
const deleteOrder = async (req, res) => {
    const isValidOrderId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidOrderId) {
        res.status(400).json({ message: 'Invalid order Id' })
        return
    }

    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if (!order) {
            res.status(404).json({ message: 'Order not found' })
            return
        }

        await order.orderItems.map(async (ordertItem) => {
            await OrdertItem.findByIdAndDelete(ordertItem)
        })

        res.status(204).json({ success: true, message: 'Order is deleted' })
    } catch (e) {
        res.status(500).json({
            message: 'Error deleting order',
            error: e.message,
        })
    }
}

export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
}
