sqlcmd -S localhost -d "Movies" -Q "SELECT * FROM movies WHERE [year] = (SELECT TOP 1 [year] FROM movies ORDER BY [year] ASC)"
pause
