const BlogBL = require("../../core/BL/onca-bites/blogs");

class BlogServices {
    constructor() {
        this.blogBL = new BlogBL();
    }
    async GetBlogList(spID) {
        return await this.blogBL.GetBlogList(spID)
    }
    async AddUpdateBlogs(objData, file) {
        return this.blogBL.AddUpdateBlogs(objData, file)
    }
    //only to change blog details not image path
    async AddUpdateBlogsDetails(objData) {
        return this.blogBL.AddUpdateBlogsDetails(objData)
    }
    async RemoveBlogs(data) {
        return await this.blogBL.RemoveBlogs(data)
    }
}

module.exports = BlogServices