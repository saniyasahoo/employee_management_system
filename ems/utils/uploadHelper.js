const fs = require('fs');
const path = require('path');

const saveImage = (base64Data, filename) => {
  const uploadsDir = path.join(__dirname, '..', 'uploads', filename);

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const filePath = path.join(uploadsDir, filename);

  fs.writeFileSync(uploadPath, imageFile.data);
};

module.exports = { saveImage };
