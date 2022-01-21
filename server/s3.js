const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.uploadS3 = (req, res, next) => {
    if (!req.file) {
        // something went wrong
        console.log("NO!");
        return res.sendStatus(500);
    } else {
        const { filename, mimetype, size, path } = req.file;
        const promise = s3
            .putObject({
                Bucket: "moses-imageboard",
                ACL: "public-read",
                Key: filename,
                Body: fs.createReadStream(path),
                ContentType: mimetype,
                ContentLength: size,
            })
            .promise();

        promise
            .then(() => {
                next();
                fs.unlink(path, () => {
                    console.log(
                        "first man on the moon, jk image deleted from uploads folder"
                    );
                });
            })
            .catch("err000r", console.log);
    }
};
