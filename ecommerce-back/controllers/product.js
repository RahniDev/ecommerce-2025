import formidable from 'formidable'
import _ from 'lodash'
import fs from 'fs'
import Product from '../models/product.js'
import { errorHandler } from '../helpers/dbErrorHandler.js'

export const productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                })
            }
            req.product = product
            next()
        })
}

export const read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

export const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }

        let product = new Product(fields)

        if (files.photo) {
            // console.log("Files Photo", files.photo)
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1MB in size."
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

export const remove = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            deletedProduct,
            message: "Product deleted successfully"
        })
    })
}

export const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        // check for all fields
        // const {name, description, price, category, quantity, shipping} = fields
        // if (!name || !description || !price || !category || !quantity || !shipping) {
        // return res.status(400).json({
        //     error: "All fields are required"
        // })
        // }

        let product = req.product
        product = _.extend(product, fields)

        if (files.photo) {
            // console.log("Files Photo", files.photo)
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1MB in size."
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}


// return products based on best selling / new arrivals


export const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .then((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                })
            }
            res.send(products)
        })
}

// it will find products based on the req product
// other products that have same category will be returned
export const listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                })
            }
            res.json(products)
        })
}

export const listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            })
        }
        res.json(categories)
    })
}
// // route - make sure its post
// router.post("/products/by/search", listBySearch);

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */



export const listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

export const listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {}
    // assign search value to query.name 
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' }
        // assign category value to query.category
        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category
        }
        // find the product based on query object with 2 properties 
        // search and category 
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        }).select('-photo')
    }
}

export const decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        }
    })

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: "Could not update product"
            })
        }
        next()
    })
}