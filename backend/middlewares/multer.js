 import multer from "multer"

 const storage = multer.memoryStorage() //tells Multer to store uploaded files in memory as Buffer objects.The uploaded file will not be saved to your hard disk.

 export const singleUpload = multer({ storage }).single("file");
 //multer({...}) → creates a configured Multer instance.

// { storage } → tells it how to handle file storage (in this case, in memory).

// single("file") → defines that only one file with field name "file" will be uploaded.




//this "file" name should be same as the one declared in <input type="file"> while sending data from frontend


