const success = (res, status, message, data = {}) =>
  res.status(status).json({ success: true, message, data });

const failure = (res, status, message, errors = undefined) => {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(status).json(body);
};

module.exports = { success, failure };