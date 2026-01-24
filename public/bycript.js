const bcrypt = require("bcrypt");

(async () => {
  const hash1 = await bcrypt.hash("123456", 10);
  const hash2 = await bcrypt.hash("123456", 10);

  console.log(hash1); // different string
  console.log(hash2); // different string

  console.log(await bcrypt.compare("123456", hash1)); // true
  console.log(await bcrypt.compare("123456", hash2)); // true
})();