use Movies;

-- Select all titles and directors.
SELECT title, director
FROM movies
WHERE director LIKE 'b%'
ORDER BY director;

-- Select everything from movies and match the genres.
SELECT *
FROM movies
JOIN genres ON genres.id = movies.genreId
ORDER BY title;

-- Select everything from movies and match the genres.
SELECT *
FROM movies
JOIN genres ON genres.id = movies.genreId
ORDER BY title;