CREATE DATABASE blogs;

USE  blogs;

DROP TABLE Authors;
CREATE TABLE Authors (
	id int not null auto_increment primary key,
	first_name varchar(50) not null,
    last_name varchar(50) not null,
    username varchar(50) not null,
    email varchar(50) not null unique,
    password varchar(50) not null,
    _created datetime default current_timestamp on update current_timestamp);
    
    
DROP TABLE Blogs;
CREATE TABLE Blogs (
id int not null auto_increment primary key,
title varchar(160) not null, 
content varchar(10000) not null,
authorid int not null,
_created datetime default current_timestamp on update current_timestamp,
foreign key (authorid) references Authors(id));


DROP TABLE Tags;
CREATE TABLE Tags (
id int not null auto_increment primary key,
name varchar(50) not null,
_created datetime default current_timestamp on update current_timestamp);


DROP TABLE BlogTags;
CREATE TABLE BlogTags (
blogid int not null,
tagid int not null,
foreign key (blogid) references Blogs(id),
foreign key (tagid) references Tags(id)); 


delimiter //
CREATE PROCEDURE spBlogTags(blogid int)
BEGIN
	SELECT name as tagname, id as tagid, bt.blogid as blogid FROM Tags
    JOIN BlogTags bt ON id = bt.tagid
    WHERE bt.blogid = blogid;
    END //
delimiter ; 

CREATE USER 'blogsapp'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON blogs. * TO 'blogsapp'@'localhost';

ALTER USER 'blogsapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

SELECT * from Tags;

SELECT * FROM BlogTags;

SELECT * FROM Blogs;

SELECT * FROM Authors;

DESCRIBE Blogs;
