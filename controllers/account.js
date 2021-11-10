const User = require('../models/user')

//şifreleme
const bcrypt = require('bcrypt')

const nodeMail = require('nodemailer');
const mailConfig = require('../utility/config');

//reset password 
const crypto = require('crypto');

module.exports.getLogin = (req, res, next) => {
    const errorMessage = req.session.errorLogin || req.session.errorLoginFill;
    console.log(errorMessage)
    delete req.session.errorLogin;
    res.render('account/login', {
        tempData : tempData,
        title: 'Login',
        path: '/login',
        user: req.user,
        errorMessage: errorMessage
    })
}
module.exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        req.session.errorLoginFill = 'Lütfen tüm alanları doldurunuz';
        req.session.tempData = {
            email : email,
        }
        req.session.save(err=>{
            return res.redirect('/login')
        })
    }

    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                req.session.errorLogin = 'Kayıtlı kullanıcı bulunamadı.'
                req.session.save((err) => {
                    console.log(err)
                    return res.redirect('/login')
                })
            }
            bcrypt.compare(password, user.password)
                .then(isSuccess => {
                    if (isSuccess) {
                        const url = req.session.redirectTo || '/'
                        req.session.user = user;
                        req.session.isAuthenticated = true;
                        return req.session.save(() => {
                            res.redirect(url)
                        })
                    }
                })

        })

}
module.exports.getRegister = (req, res, next) => {
    const errorMessage = req.session.errorRegister;
    const errorRegisterFill = req.session.errorRegisterFill;
    const tempData = req.session.tempData
    delete req.session.tempData;
    delete req.session.errorRegister;
    delete req.session.errorRegisterFill;
    res.render('account/register', {
        tempData : tempData,
        title: 'Register',
        path: '/register',
        errorMessage: errorRegisterFill,
    })
}
module.exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    if (!(name && surname && email && password)) {
        req.session.errorRegisterFill = 'Lütfen tüm alanları doldurunuz';
        req.session.tempData = {
            name : name,
            surname : surname,
            email : email,
        }
        req.session.save(err=>{
            return res.redirect('/register')
        })
    }
    User.findOne({ where: { email: email } })
        .then(user => {
            if (user) {
                req.session.errorRegister = 'Bu kullanıcı zaten var!';
                req.session.save((err) => {
                    return res.redirect('/register');
                })
            }
            return bcrypt.hash(password, 10)
        }).then((hashedPass) => {
            return User.create({
                email: email,
                name: name,
                surname: surname,
                password: hashedPass
            })
        }).then(() => {
            res.redirect('/login')
            const transporter = nodeMail.createTransport(`smtps://trayyldz@gmail.com:Saj33133081++@smtp.gmail.com`)
            const mailOptions = {
                from: 'Omer enen',
                to: email,
                subject: 'başarılı',
                text: 'başarılı 2',
                html: 'başarılı 3'
            }
            return transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email has been sended ${email}. State : ${info.response}`)
                }
            });
        })

}
module.exports.getReset = (req, res, next) => {
    const errorMessage = req.session.errorReset
    res.render('account/reset', {
        title: 'Reset',
        path: '/reset',
        errorMessage: errorMessage
    })
}
module.exports.postReset = (req, res, next) => {
    const email = req.body.email
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset-password')
        }
        const token = buffer.toString('hex');

        User.findOne({ where: { email: email } })
            .then(user => {
                console.log(user)

            })
    })


}

module.exports.logOut = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        return res.redirect('/')
    })
}