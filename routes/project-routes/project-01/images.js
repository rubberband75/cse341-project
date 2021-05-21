const router = require('express').Router();
var multer = require('multer');

const imagesController = require('../../../controllers/project-controllers/project-01/images')

router.get('/upload', imagesController.getUploadImage)
router.post('/upload', multer().single('image'), imagesController.postUploadImage)

router.get('/:imageID', imagesController.getImage)

module.exports = router;