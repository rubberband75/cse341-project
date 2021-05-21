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

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        userId: req.user,
        title: title,
        imageUrl: imageUrl,
        description: description,
        price: price,
        tags: [],
    });
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

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDesc;
            return product.save()
        })
        .then(result => {
            res.redirect('/project/01/admin');
        })
        .catch(err => console.error(err))
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByIdAndRemove(productId)
        .then(result => {
            res.redirect('/project/01/admin');
        })
        .catch(err => console.error(err));
};

exports.getUploadImage = (req, res, next) => {
    Image.find()
        .then(images => {
            res.render('project-views/project-01/admin/upload-image', {
                title: 'Upload Image',
                path: '/project/01/admin/upload-image',
                images: images
            });
        })
        .catch(err => console.err(err))
}

exports.postUploadImage = (req, res, next) => {
    console.log({ file: req.file })

    const image = new Image({ ...req.file })

    // const image = new Image({
    //     name: req.body.name,
    //     desc: req.body.desc,
    //     img: {
    //         data: req.file.buffer,
    //         contentType: req.file.mimetype
    //     }
    // });

    console.log({ image })

    image
        .save()
        .then(result => {
            res.redirect('/project/01/admin/upload-image');
        })
        .catch(err => console.error(err))
}
