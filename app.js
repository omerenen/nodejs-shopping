const express = require('express');
const app = express();

// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store)
//pug
app.engine('pug', require('pug').__express)

app.set('view engine', 'pug');
app.set('views', './view/pugs');

//routes

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const accountRoutes = require('./routes/account');

const sequelize = require('./utility/database');

//sequelize
const Product = require('./models/product');
const Category = require('./models/category');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartitem');
const Order = require('./models/order');
const OrderItem = require('./models/orderitem');

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    store: new sequelizeStore({
        db: sequelize
    }),
    saveUninitialized: false,
    // cookie: {
    //     // cookie nin kaç saniye sonra silineceğini belirler
    //     maxAge: 60000
    // }
}))


app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            req.user = user;
            next()
        })
})
//call routes
app.use(adminRoutes);
app.use(shopRoutes);
app.use(accountRoutes);

//get files
app.use(express.static('public'))

const appError = require('./controllers/error')
//404 page
app.use(appError.Page404Error)

Product.belongsTo(Category);
Category.hasMany(Product)

Product.belongsTo(User);
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

let _user;

sequelize
    .sync()
    // .then(() => {
    //     User.findByPk()
    //         .then((user) => {
    //             return user
    //         }).then(user => {
    //             _user = user
    //             return user.getCart()
    //         }).then(cart => {
    //             if (!cart) {
    //                 return _user.createCart()
    //             }
    //             return cart
    //         })
    .then(() => {
        Category.count()
            .then(count => {
                if (count === 0) {
                    Category.bulkCreate([
                        { name: 'Bilgisayar', description: 'bilgisayar kategorisi' },
                        { name: 'Telefon', description: 'telefon kategorisi' }
                    ])
                }
            })
    })
    // })

app.listen(3000, () => {
    console.log("port 3000'den dinleniyor.")
});