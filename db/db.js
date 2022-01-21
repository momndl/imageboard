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

module.exports.test = () => {
    return db.query("SELECT * from users");
};

module.exports.getImagesAll = () => {
    return db.query(
        `
    SELECT * FROM images ORDER BY id DESC LIMIT 8
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
        SELECT * FROM images WHERE id = ($1)
    `,
        [id]
    );
};

module.exports.getMore = (id) => {
    return db.query(
        `  SELECT url, title, id, ( SELECT id FROM images ORDER BY id ASC LIMIT 1 ) AS "lowestId" FROM images
           WHERE id < ($1) ORDER BY id DESC LIMIT 8;    
    `,
        [id]
    );
};

module.exports.setCommentData = (imgId, username, comment) => {
    return db.query(
        `
    INSERT into comments (images_id, username, comment) VALUES ($1, $2, $3) RETURNING *
    `,
        [imgId, username, comment]
    );
};

module.exports.getComments = (id) => {
    return db.query(
        `
    SELECT comment, username, created_at FROM comments  WHERE images_id = ($1) ORDER BY id DESC
    `,
        [id]
    );
};
