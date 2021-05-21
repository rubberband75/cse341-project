const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    tags: [{
        type: String
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
})

module.exports = mongoose.model('Product', productSchema)

// const fs = require('fs');
// const path = require('path');

// const Cart = require('./cart');

// const p = path.join(
//     path.dirname(process.mainModule.filename),
//     'data',
//     'project-data',
//     'project-01',
//     'products.json'
// );

// const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         } else {
//             cb(JSON.parse(fileContent));
//         }
//     });
// };

// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price, tags) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//         this.tags = tags;
//     }

//     save() {
//         getProductsFromFile(products => {
//             if (this.id) {
//                 const existingProductIndex = products.findIndex(
//                     prod => prod.id === this.id
//                 );
//                 const updatedProducts = [...products];
//                 updatedProducts[existingProductIndex] = this;
//                 fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//                     console.log(err);
//                 });
//             } else {
//                 this.id = Math.random().toString();
//                 products.push(this);
//                 fs.writeFile(p, JSON.stringify(products), err => {
//                     console.log(err);
//                 });
//             }
//         });
//     }

//     static deleteById(id) {
//         getProductsFromFile(products => {
//             const product = products.find(prod => prod.id === id);
//             const updatedProducts = products.filter(prod => prod.id !== id);
//             fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//                 if (!err) {
//                     Cart.deleteProduct(id, product.price);
//                 }
//             });
//         });
//     }

//     static fetchAll(cb) {
//         getProductsFromFile(cb);
//     }

//     static findById(id, cb) {
//         getProductsFromFile(products => {
//             const product = products.find(p => p.id == id);
//             cb(product);
//         });
//     }

//     static findByTag(tag, cb) {
//         getProductsFromFile(products => {
//             const taggedProducts = products.filter(product => {
//                 return product.tags.includes(tag)
//             })
//             cb(taggedProducts);
//         });
//     }
// };
