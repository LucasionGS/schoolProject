sqlcmd -S localhost -d "Movies" -Q "SELECT title, director FROM movies WHERE director LIKE 'a%%' ORDER BY director;"
pause