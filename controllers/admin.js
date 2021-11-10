const controllerProducts = require('../models/product');
const controllerCategories = require('../models/category')

module.exports.getProduct = (req, res, next) => {
    controllerProducts.findAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Product',
                products: products,
                path: '/admin/products',
                action: req.query.action,
                user : req.session.user,
                isAuthenticated : req.session.isAuthenticated
            });
        }).catch(err => {
            console.log(err);
        })
}

module.exports.getAddProduct = (req, res, next) => {
    controllerCategories.findAll({
        attributes: ['id', 'name']
    }).then(categories => {
        res.render('admin/add-product', {
            title: 'New Add Product',
            categories: categories,
            path: '/admin/add-product',
            user : req.session.user,
            isAuthenticated : req.session.isAuthenticated

        })
    })
};

module.exports.postAddProduct = (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const state = req.body.state;
    const categoryId = req.body.categoryid;
    const user = req.user

    user.createProduct({
        name: name,
        price: price,
        image: image,
        state: state,
        categoryId: categoryId,
        userId: user.id,
    }).then((result) => {
        res.redirect('/')
    })

};

module.exports.getEditProduct = (req, res, next) => {
    controllerProducts.findByPk(req.params.productid)
        .then(products => {
            controllerCategories.findAll({ attributes: ['id', 'name'] })
                .then(categories => {
                    console.log(categories[0])
                    res.render('admin/edit-product',
                        {
                            title: 'Edit Product',
                            product: products,
                            categories: categories,
                            path: '/admin/products',
                            user : req.session.user,
                            isAuthenticated : req.session.isAuthenticated

                        })
                })

        })
};

module.exports.postEditProduct = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const state = req.body.state;
    const image = req.body.image;
    const price = req.body.price;
    const categoryId = req.body.categoryid
    console.log(req.body.id)
    controllerProducts.findByPk(req.body.id)
        .then(product => {
            product.name = name;
            product.state = state;
            product.image = image;
            product.price = price;
            product.categoryId = categoryId;
            product.save()
                .then(result => {
                    res.redirect('/admin/products?action=edit')
                }).catch(err => {
                    console.log(err)
                })
        })
};

module.exports.deleteProduct = (req, res, next) => {
    controllerProducts.findByPk(req.body.id)
        .then(product => {
            product.destroy()
                .then(result => {
                    res.redirect('/admin/products?action=delete')
                })
        })
}