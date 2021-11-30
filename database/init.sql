BEGIN;
DROP TABLE IF EXISTS users,  stats;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(36) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  hits INTEGER,
  misses INTEGER,
  highscore INTEGER
);
INSERT INTO users (username, password) VALUES
  ('halakhamis', 123),
  ('Julio', 123);

INSERT INTO stats (hits, misses, highScore, user_id) VALUES
  (20, 28, 200, 1),
  (25, 21, 205, 2),
  (25, 21, 1000, 2),
  (25, 21, 20123, 2),
  (25, 21, 203, 2),
  (25, 21, 43, 2),
  (25, 21, 123, 2),
  (25, 21, 2203, 2),
  (25, 21, 543, 2),
  (25, 21, 12, 2),
  (25, 21, 220323423, 2);
COMMIT;
