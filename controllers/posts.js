import Posts from '../models/posts.js';

export default {
  async getAll(req, res, next) {
    try {
      const posts = await Posts.findAll();
      res.json({
        status: 'ok',
        posts,
      });
    } catch (e) {
      next(e);
    }
  },

  async getOne(req, res, next) {
    try {
      const post = await Posts.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      }

      res.json({
        status: 'ok',
        post,
      });
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const { title, content } = req.body;
      const author_id = req.userId;

      const post = await Posts.create({ title, content, author_id });

      res.json({
        status: 'ok',
        post,
      });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const { title, content } = req.body;
      const postId = req.params.id;

      const post = await Posts.update(postId, { title, content });

      res.json({
        status: 'ok',
        post,
      });
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const postId = req.params.id;

      await Posts.remove(postId);

      res.json({
        status: 'ok',
        message: 'Post deleted',
      });
    } catch (e) {
      next(e);
    }
  }
};

