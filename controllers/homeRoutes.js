const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
try {
    const postData = await Post.findAll({
    include: [
        {
        model: User,
        attributes: ["username"],
        },
    ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
    posts,
    logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}
});

router.get("/post/:id", async (req, res) => {
try {
    const postData = await Post.findByPk(req.params.id, {
    include: [
        {
        model: User,
        attributes: ["username"],
        },
        {
        model: Comment,
        include: [User],
        },
    ],
    });

    const post = postData.get({ plain: true });

    res.render("post", {
    ...post,
    logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}
});

router.get("/dashboard", withAuth, async (req, res) => {
try {
    const postData = await this.Post.findAll({
    where: { user_id: req.session.user_id },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
    posts,
    logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}
});
router.get("/dashboard/newpost", withAuth, async (req, res) => {
res.render("create");
});

router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    res.render("edit", {
    ...post,
    logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}
});

router.get("/login", (req, res) => {
if (req.session.logged_in) {
    res.redirect("/profile");
    return;
}

res.render("login");
});

module.exports = router;
