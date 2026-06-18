export const sanitizeInput = (
  req,
  res,
  next
) => {
  const clean = (obj) => {
    if (!obj) return;

    for (const key in obj) {
      if (
        key.startsWith("$") ||
        key.includes(".")
      ) {
        delete obj[key];
      } else if (
        typeof obj[key] === "object"
      ) {
        clean(obj[key]);
      }
    }
  };

  clean(req.body);
  clean(req.query);
  clean(req.params);

  next();
};