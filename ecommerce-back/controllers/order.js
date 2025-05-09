import Order from '../models/order.js';
import { errorHandler } from '../helpers/dbErrorHandler.js';
import dotenv from 'dotenv'
dotenv.config()
// sendgrid for email npm i @sendgrid/mail
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID);

export const orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

export const create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'rahnikaurbansal@gmail.com',
            from: 'rahnidemeis@gmail.com',
            subject: `A new order is received`,
            html: `
            <p>Customer name:</p>
            <p>Total products: ${order.products.length}</p>
            <p>Total cost: £${order.amount}</p>
            <p>Login to dashboard to view the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));

        // email to buyer
        const emailData2 = {
            to: order.user.email,
            from: 'rahnidemeis@gmail.com',
            subject: `You order is in process`,
            html: `
        <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
        <h2>Total products: ${order.products.length}</h2>
        <h2>Transaction ID: ${order.transaction_id}</h2>
        <h2>Order status: ${order.status}</h2>
        <h2>Product details:</h2>
        <hr />
        ${order.products
                    .map(p => {
                        return `<div>
                    <h3>Product Name: ${p.name}</h3>
                    <h3>Product Price: £${p.price}</h3>
                    <h3>Product Quantity: ${p.count}</h3>
            </div>`;
                    })
                    .join('--------------------')}
        <h2>Total order cost: ${order.amount}<h2>
        <p>Thank your for shopping with us.</p>
    `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));

        res.json(data);
    });
};

export const listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

export const getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

export const updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};