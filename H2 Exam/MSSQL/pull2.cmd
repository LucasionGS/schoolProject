sqlcmd -S localhost -d "Movies" -Q "SELECT * FROM movies JOIN genres ON genres.id = movies.genreId ORDER BY title;"
pause