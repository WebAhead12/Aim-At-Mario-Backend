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
  ('Julio', 123),
  ('George',1234),
  ('Juan',12345),
  ('mario',123456);

INSERT INTO stats (hits, misses, highScore, user_id) VALUES
  (20, 28, 200, 1),
  (25, 21, 205, 2),
  (25, 21, 1000, 3),
  (25, 21, 20123, 4),
  (25, 21, 203, 5);
COMMIT;
