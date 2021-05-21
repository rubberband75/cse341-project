const router = require('express').Router();
var multer = require('multer');

const imagesController = require('../../../controllers/project-controllers/project-01/images')

const isAuth = require('../../../middlewares/is-auth');

router.get('/upload', isAuth, imagesController.getUploadImage)
router.post('/upload', isAuth, multer().single('image'), imagesController.postUploadImage)

router.get('/:imageID', imagesController.getImage)

module.exports = router;