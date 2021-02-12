const router = require("express").Router();
const BlogServices = require("../../services/Onca-Bites/blogs-service");
const blogServices = new BlogServices();
const multer = require('multer');
const upload = multer();



router.get("/OncaBitesGetBlogList", async (req, res) => {
    let spID = req.query.spID;
    let result = await blogServices.GetBlogList(spID);
    res.send(result)
})

router.post("/OncaBitesAddUpdate", upload.single("img"), async (req, res) => {
    if (req.body === null) {
        return null;
    }
    let objData = req.body;
    let file = req.file;
    let result = await blogServices.AddUpdateBlogs(objData, file);
    res.send(result);
});

//route only for update blog details not imagepath
router.post("/OncaBitesUpdateDetails", async (req, res) => {
    if (req.body === null) {
        return null;
    }
    let result = await blogServices.AddUpdateBlogsDetails(req.body);
    res.send(result);
});


router.post("/OncaBiteUpdateStatus", async (req, res) => {

    if (req.body === null) {
        return null;
    }
    let result = await blogServices.RemoveBlogs(req.body);
    res.send(result);
});
module.exports = router;
