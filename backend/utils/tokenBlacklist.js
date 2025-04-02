const blacklist = new Set();

// Add a token to the blacklist
const add = (token) => {
  blacklist.add(token);
};

// Check if a token is blacklisted
const has = (token) => {
  return blacklist.has(token);
};

module.exports = {
  add,
  has,
};
