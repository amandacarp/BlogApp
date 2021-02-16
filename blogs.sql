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


CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT,
    authorid INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    blogid INT NOT NULL,
    _created DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (authorid)
        REFERENCES Authors (id),
    FOREIGN KEY (blogid)
        REFERENCES Blogs (id)
);


