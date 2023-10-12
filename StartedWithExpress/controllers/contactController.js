exports.getContactus = (req, res, next) => {
    res.render('contactus', {
        pageTitle: 'Contact',
        path: '/contactus',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}

exports.Success = (req, res, next) => {
    res.status(200).render('success', { pageTitle: 'Form successfuly filled', path: '/contactus/success' });
}
