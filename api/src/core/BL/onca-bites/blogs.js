const BlogDL = require("../../DL/Onca-Bites/blog");

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
class BlogBL {
  constructor() {
    this.BlogDL = new BlogDL();
  }
  async GetBlogList(spID) {
    return await this.BlogDL.GetBlogList(spID);
  }
  async AddUpdateBlogs(objData, file) {
    let fileName = Date.now() + "-" + file.originalName;
    await pipeline(
      file.stream,
      fs.createWriteStream(
        `${__dirname}/../../../../../client/public/uploadedImages/${fileName}`
      )
    );
    let obj = {
      ...objData,
      P_ImagePath: `/uploadedImages/${fileName}`,
    };
    return await this.BlogDL.AddUpdateBlogs(obj);
  }
  async AddUpdateBlogsDetails(obj) {
    return await this.BlogDL.AddUpdateBlogsDetails(obj);
  }
  async RemoveBlogs(data) {
    return await this.BlogDL.RemoveBlogs(data);
  }
}
module.exports = BlogBL;
