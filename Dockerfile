FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y mysql-server

ENV MYSQL_DATABASE=beer_db
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=password
ENV MYSQL_ROOT_PASSWORD=password

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 3306

CMD ["mysqld"]  

# docker build -t mysql-beer-image .
# docker run --name mysql-beer-container -d -p 3306:3306 mysql-beer-image