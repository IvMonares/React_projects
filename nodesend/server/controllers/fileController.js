const shortid = require("shortid");
const multer = require("multer");
const fs = require("fs");
const Link = require("../models/Link");

exports.uploadFile = (req, res) => {
    const multerConfig = {
        limits: { fileSize: req.user ? 10 * 1024 * 1024 : 1024 * 1024 },
        storage: (fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + `/../uploads`);
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substr(
                    file.originalname.lastIndexOf(".", file.originalname.length)
                );
                const filename = shortid.generate();
                cb(null, `${filename}${extension}`);
            },
        })),
    };

    const upload = multer(multerConfig).single("file");

    upload(req, res, async (error) => {
        console.log(req.file);

        if (!error) {
            res.json({ file: req.file.filename });
        } else {
            res.status(400).json({ error: error });
        }
    });
};

exports.downloadFile = async (req, res, next) => {
    // Get url
    const { filename } = req.params;

    // Verify url exists
    const link = await Link.findOne({ filename });
    if (!link) {
        // Serve response that will take user back to frontend
        res.set("Content-Type", "text/html");
        res.send(
            Buffer.from(`
        <!DOCTYPE html>
        <html>
           <head>
              <title>404</title>
           </head>
           <body>
           <script>
             window.history.back();
           </script>
           </body>
        </html>
        `)
        );
        return next();
    }

    // Serve file
    const filepath = __dirname + `/../uploads/` + req.params.filename;
    res.download(filepath, link.org_filename);

    if (link.downloads <= 1) {
        // Delete DB record
        await Link.findOneAndRemove({ filename });
        next();
    } else {
        // Decreace download count
        link.downloads--;
        await link.save();
    }
};

exports.deleteFile = (req, res) => {
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.params.filename}`);
        console.log("File deleted");
    } catch (error) {
        console.log(error);
    }
};
