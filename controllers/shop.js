const controllerProducts = require('../models/product');
const controllerCategories = require('../models/category');

module.exports.getIndex = (req, res, next) => {
    controllerProducts.findAll({
        attributes: ['id', 'name', 'price', 'image']
    })
        .then(products => {
            controllerCategories.findAll()
                
                .then(categories => {
                    res.render('shop/products', {
                        title: 'Homepage',
                        categories: categories,
                        products: products,
                        user : req.session.user,
                        isAuthenticated: req.session.isAuthenticated,
                        path: '/',
                    })
                })

        })
        .catch(err => {
            console.log(err)
        })
}
module.exports.getProducts = (req, res, next) => {

    controllerProducts.findAll({
        attributes: ['id', 'name', 'price', 'image']
    })
        .then(products => {
            controllerCategories.findAll()
                .then(categories => {
                    res.render('shop/products', {
                        title: 'Homepage',
                        categories: categories,
                        user : req.session.user,
                        products: products,
                        isAuthenticated: req.session.isAuthenticated,
                        path: '/'
                    })
                })

        })
        .catch(err => {
            console.log(err)
        })
}
module.exports.getProduct = (req, res, next) => {
    controllerProducts.findAll({
        attributes: ['id', 'name', 'price', 'state', 'image'],
        where: { id: req.params.productid }
    })
        .then(products => {
            res.render('shop/product-detail',
                {
                    title: products[0].name,
                    product: products[0],
                    user : req.session.user,
                    path: '/admin/products',
                    isAuthenticated: req.session.isAuthenticated,
                })
        })
}
module.exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const model = [];
    controllerCategories.findAll()
        .then(categories => {
            model.categories = categories
            const category = categories.find(i => i.id == categoryid)
            return category.getProducts()
        })
        .then(product => {

            res.render('shop/products', {
                length: product.length,
                title: 'Products in',
                user : req.session.user,
                categories: model.categories,
                isAuthenticated: req.session.isAuthenticated,
                products: product,
                path: '/products'
            })
        })


}
module.exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
        }).then(products => {
            res.render('shop/cart', {
                title: 'Cart',
                user : req.session.user,
                products: products,
                isAuthenticated: req.session.isAuthenticated,
                path: '/cart'
            })

        })
}

module.exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let quantity = 1;
    let userCart;

    req.user.getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts({ where: { id: productId } })
        }).then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                quantity += product.cartitem.quantity;
                return product
            }
            return controllerProducts.findByPk(productId);
        }).then(product => {
            userCart.addProduct(product, {
                through: {
                    quantity: quantity
                }
            })
        }).then(() => {
            res.redirect('/cart')
        })
}

module.exports.deletePostCartItem = (req, res, next) => {
    const productId = req.body.productid;

    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: productId } })
        }).then(products => {
            product = products[0];
            return product.cartitem.destroy()
        }).then(() => {
            res.redirect('/cart')
        })
}
module.exports.getOrders = (req, res, next) => {
    2
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            res.render('shop/orders',
                {
                    title: 'Orders',
                    path: '/orders',
                    orders: orders,
                    user : req.session.user,
                    isAuthenticated: req.session.isAuthenticated,
                })
        })
}

module.exports.postOrder = (req, res, next) => {
    let userCart;
    req.user.getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts()
        }).then(products => {
            return req.user.createOrder()
                .then(order => {
                    order.addProducts(products.map(product => {
                        product.orderitem = {
                            quantity: product.cartitem.quantity,
                            price: product.price
                        }
                        return product
                    }))
                })
        }).then(() => {
            userCart.setProducts(null);
        }).then(() => {
            res.redirect('/')
        })
}
module.exports.deletePostOrders = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            orders.orderItem.setProducts(null)
        })
}