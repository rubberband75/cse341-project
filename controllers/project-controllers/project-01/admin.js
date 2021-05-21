const Product = require('../../../models/project-models/project-01/product')
const Image = require('../../../models/project-models/project-01/image')

exports.getAdminDashboard = (req, res, next) => {
    Product.find().then(products => {
        res.render('project-views/project-01/admin', {
            title: 'Admin',
            path: '/project/01/admin',
            products: products,
        });
    })
};

exports.getAddProduct = (req, res, next) => {
    res.render('project-views/project-01/admin/edit-product', {
        title: 'Add Product',
        path: '/project/01/admin',
        editing: false,
    });
};

exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    let product = new Product({
        userId: req.user,
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        tags: [],
    });

    if (req.file) {
        const image = new Image({ ...req.file })
        await image.save();
        product.image = image;
    }

    product
        .save()
        .then(result => {
            res.redirect('/project/01/admin');
        })
        .catch(err => console.error(err))
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).send(`Product ${productId} not found`);
            }
            res.render('project-views/project-01/admin/edit-product', {
                title: 'Edit Product',
                path: '/project/01/admin',
                product: product,
                editing: true,
            });
        })
        .catch(err => console.error(err))
};

exports.postEditProduct = async (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;

    try {
        let product = await Product.findById(prodId);
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;

        if (req.file) {
            const image = new Image({ ...req.file })
            await image.save();
            product.image = image;
        }

        await product.save()

    } catch (error) {
        console.error(error)

    } finally {
        res.redirect('/project/01/admin');
    }
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByIdAndRemove(productId)
        .then(result => {
            res.redirect('/project/01/admin');
        })
        .catch(err => console.error(err));
};
