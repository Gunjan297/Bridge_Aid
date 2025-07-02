import DataUriParser from "datauri/parser.js" // Library to convert buffers into Data URIs

import path from "path" //Node.js built-in module to deal with file paths and extensions.

const getDataUri = (file)=>{
  const parser = new DataUriParser();

  const extName = path.extname(file.originalname).toString(); //path.extname(...) extracts the file extension (e.g., ".pdf" from "resume.pdf").

  return parser.format(extName, file.buffer);
  //parser.format() converts this buffer (file.buffer is a Buffer containing the raw file data) into a Data URI string, using the correct MIME type for the extension.
}

export default getDataUri;

// This utility function:
// ✅ Converts a file buffer (e.g., an uploaded file in req.file)
// ✅ Into a Data URI string (e.g., data:application/pdf;base64,...)
// ✅ Which you can use to upload to services like Cloudinary, S3, etc., without writing the file to disk.