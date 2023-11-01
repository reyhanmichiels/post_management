import { Comment } from "./comment.model.js";
import { Post } from "./post.model.js";
import { User } from "./user.model.js";

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);
