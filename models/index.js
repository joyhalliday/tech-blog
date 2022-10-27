//user has blog posts and comments
//blog post is owned by a user and it owns comments
//comments are owned by user and blog post

const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
foreignKey: "user_id",
});

Post.belongsTo(User, {
foreignKey: "user_id",
onDelete: "cascade",
});

Comment.belongsTo(User, {
foreignKey: "user_id",
onDelete: "cascade",
});

Comment.belongsTo(Post, {
foreignKey: "post_id",
onDelete: "cascade",
});

User.hasMany(Comment, {
foreignKey: "user_id",
onDelete: "cascade",
});

Post.hasMany(Comment, {
foreignKey: "post_id",
onDelete: "cascade",
});

module.exports = { User, Post, Comment };