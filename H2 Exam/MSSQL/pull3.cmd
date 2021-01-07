sqlcmd -S localhost -d "Movies" -Q "SELECT * FROM movies WHERE [length] > 120"
pause