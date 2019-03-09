const { Router } = require('express');
const router = Router();
const Photo = require('../models/photo');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDDINARY_API_KEY,
    api_secret: process.env.CLOUDDINARY_API_SECRET
});

const fs = require('fs-extra');

router.get('/', async (req, res) => {
    const photos = await Photo.find();
    res.render('images', { photos });
});

router.get('/images/add', async (req, res) => {
    const photos = await Photo.find();
    res.render('image_form', { photos });
});

router.post('/images/add', async (req, res) => {
    const { title, description } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const photo = new Photo({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    });
    await photo.save();
    await fs.unlink(req.file.path);
    res.redirect('/');
});

router.get('/image/delete/:id' , async (req , res) => {
    const { id } = req.params;
    const photo = await Photo.findByIdAndDelete(id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result);
    res.redirect('/images/add');
})

module.exports = router;