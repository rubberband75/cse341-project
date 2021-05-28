const Image = require("../../../models/project-models/project-01/image");

exports.getImage = (req, res, next) => {
  const imageID = req.params.imageID;
  Image.findById(imageID)
    .then((image) => {
      res.set("Cache-control", "public, max-age=31536000");
      res.contentType(image.mimetype);
      res.send(Buffer.from(image.buffer, "binary"));
    })
    .catch((err) => next(new Error(err)));
};

exports.getUploadImage = (req, res, next) => {
  Image.find({}, "_id originalname size")
    .then((images) => {
      console.log(images);
      res.render("project-views/project-01/upload-image", {
        title: "Upload Image",
        path: "/project/01/images/upload",
        images: images,
      });
    })
    .catch((err) => next(new Error(err)));
};

exports.postUploadImage = (req, res, next) => {
  const image = new Image({ ...req.file });

  image
    .save()
    .then((result) => {
      res.redirect("/project/01/images/upload");
    })
    .catch((err) => next(new Error(err)));
};
