FROM mysql:latest

ENV MYSQL_ALLOW_EMPTY_PASSWORD=true
ENV MYSQL_USER=beer
ENV MYSQL_PASSWORD=password
ENV MYSQL_DATABASE=beer_db

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

# EXPOSE 3306

# CMD ["mysqld"]  

# docker build -t mysql-beer-image .
# docker run --name mysql-beer-container -d -p 3306:3306 mysql-beer-image