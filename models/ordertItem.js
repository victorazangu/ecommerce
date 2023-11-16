import { Schema, model } from 'mongoose'

var orderItemSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
})

export default model('OrderItem', orderItemSchema)
