import Joi from 'joi';

const blogSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  category: Joi.string().required(),
  media: Joi.array().items(Joi.object({
    url: Joi.string().required().custom((value, helpers) => {
      const isValidUrl = /^(https?:\/\/|www\.)/.test(value);
      const isValidFilename = /^[\w,\s-]+\.[A-Za-z]{3,4}$/.test(value); 
      if (isValidUrl || isValidFilename) return value;
      return helpers.error('any.invalid');
    }).messages({
      'any.invalid': `"media.url" must be a valid URL or filename`
    }),
    type: Joi.string().valid('image', 'video').required(),
  
  })).optional(),
});

export const validateCreateBlog = (data) => {
  return blogSchema.validate(data);
};

export const validateUpdateBlog = (data) => {
  return blogSchema.validate(data);
};
