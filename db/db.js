const spicedPg = require("spiced-pg");

const database = "imageboard";

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUserName, dbPassword } = require("../secrets.json");
    db = spicedPg(
        `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
    );
}

console.log(`[db] Connecting to: ${database}`);

module.exports.getImagesAll = () => {
    return db.query(
        `
    SELECT id, url, username, title, description, TO_CHAR(created_at, 'HH24:MI DD.MM.YY') AS posted FROM images ORDER BY id DESC LIMIT 8
    `
    );
};

module.exports.setImageData = (url, username, title, description) => {
    return db.query(
        `
INSERT into images (url, username, title, description) VALUES ($1,$2,$3,$4) RETURNING *

`,
        [url, username, title, description]
    );
};

module.exports.getImageDataById = (id) => {
    return db.query(
        `
        SELECT id, url, username, title, description, TO_CHAR(created_at, 'HH24:MI DD.MM.YY') AS posted FROM images WHERE id = ($1)
    `,
        [id]
    );
};

module.exports.getMore = (id) => {
    return db.query(
        `  SELECT id, url, username, title, description, TO_CHAR(created_at, 'HH24:MI DD.MM.YY') AS posted FROM images
           WHERE id < ($1) ORDER BY id DESC LIMIT 8;
    `,
        [id]
    );
};

module.exports.setCommentData = (imgId, username, comment) => {
    return db.query(
        `
    INSERT into comments (images_id, username, comment) VALUES ($1, $2, $3) RETURNING id AS comment_id, comment, username, TO_CHAR(created_at, 'HH24:MI DD.MM.YY') AS posted
    `,
        [imgId, username, comment]
    );
};

module.exports.getComments = (id) => {
    return db.query(
        `
    SELECT id AS comment_id, comment, username, TO_CHAR(created_at, 'HH24:MI DD.MM.YY') AS posted FROM comments  WHERE images_id = ($1) ORDER BY id DESC
    `,
        [id]
    );
};
