@ECHO OFF
CHCP 1252

@REM Setup database and tables.
sqlcmd -S localhost -i "./setup.sql"

@REM Insert data.
bcp "genres" in ".\genres.dat" -q -c -t ";" -S localhost -d "Movies" -T
bcp "movies" in ".\movies.dat" -q -c -t ";" -S localhost -d "Movies" -T
bcp "actors" in ".\actors.dat" -q -c -t ";" -S localhost -d "Movies" -T
bcp "actorMovie" in ".\actorMovie.dat" -q -c -t ";" -S localhost -d "Movies" -T

echo Everything has now been setup.