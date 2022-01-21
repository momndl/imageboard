-- DROP TABLE IF EXISTS comments;
-- DROP TABLE IF EXISTS images;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    images_id INTEGER NOT NULL REFERENCES images(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT test_name
    FOREIGN KEY(images_id) 
    REFERENCES images(id)
);