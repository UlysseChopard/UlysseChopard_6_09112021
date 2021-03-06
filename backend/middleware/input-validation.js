const validateInput = (schema, property = "body") => {
  property = property.split(".");
  return (req, res, next) => {
    const data = property.reduce((acc, val) => acc[val], req);
    const { error } = schema.validate(data);
    if (error) {
      const errorMsg = error.details.map((detail) => detail.message).join("\n");
      console.error("erreur input", errorMsg);
      res.status(422).json({ error: errorMsg });
    } else {
      next();
    }
  };
};

module.exports = validateInput;
