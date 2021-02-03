CREATE DATABASE blogs;

USE  blogs;

DROP TABLE Authors;
CREATE TABLE Authors (
	id int not null auto_increment primary key,
    name varchar(50) not null,
    email varchar(50) not null,
    _created datetime default current_timestamp on update current_timestamp);
    
INSERT INTO Authors (name, email) VALUES ('Amanda', 'ac@gmail.com');
INSERT INTO Authors (name, email) VALUES ('Alex', 'al@gmail.com');
INSERT INTO Authors (name, email) VALUES ('Alexandra', 'alex@gmail.com');
INSERT INTO Authors (name, email) VALUES ('Carolyn', 'cs@gmail.com');
INSERT INTO Authors (name, email) VALUES ('Adam', 'as@gmail.com');

SELECT * from Authors;
    
DROP TABLE Blogs;
CREATE TABLE Blogs (
id int not null auto_increment primary key,
title varchar(160) not null, 
content varchar(500) not null,
authorid int not null,
_created datetime default current_timestamp on update current_timestamp,
foreign key (authorid) references Authors(id));

INSERT INTO Blogs (title, content, authorid) VALUES ('10 Reasons Why You Are A Rookie In Software Development', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat ornare ex non aliquet. Praesent vehicula diam id massa scelerisque faucibus id non lorem. Phasellus sed rutrum tortor. Proin ut tempor purus, ac varius ante. Etiam mattis justo id tristique consequat. Aenean consequat eleifend interdum. Praesent nibh augue, interdum ac lacinia et, auctor sed ex. Nulla facilisi. Aliquam diam nulla, aliquam nec dignissim eget, consequat eu dui. Etiam eu lacinia nulla. Suspendisse fermentum, lacus ac convallis rutrum, tellus nisl tempus nunc, eget euismod mauris turpis nec sapien.
Curabitur ornare nisi nulla, eu commodo sem cursus id. Curabitur egestas nisl ante, et suscipit dui viverra eu. Nullam luctus aliquet purus non varius. Integer malesuada, justo id luctus dignissim, quam magna consectetur nisi, elementum porttitor leo dolor et justo. Aenean consectetur purus sed augue bibendum, vel consequat arcu rutrum. Nullam nibh arcu, posuere eget est ut, luctus luctus felis. Etiam id lorem lorem. Sed facilisis ut purus a dignissim. Vivamus purus mi, pretium non lacinia eget, mattis quis nisi. Nullam aliquet finibus tempus. Sed nulla magna, semper in ornare ac, mollis at metus.
In eget erat imperdiet, blandit lectus eget, ultrices nibh. Donec molestie fermentum dui in mollis. Donec quis est vitae justo semper cursus. Curabitur maximus, massa a hendrerit egestas, lectus velit euismod sapien, non tristique ex nunc in enim. Fusce a rutrum sapien. Duis pretium facilisis sollicitudin. Fusce facilisis nisi non orci consequat malesuada. Sed tempor leo in porttitor imperdiet. Curabitur lorem erat, scelerisque sit amet vehicula vitae, tincidunt a ex. Cras a justo sollicitudin, accumsan odio id, eleifend urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse ornare fermentum sagittis. Nulla sit amet lorem egestas magna interdum fringilla eget sit amet risus. Quisque augue nulla, porta vel consequat vitae, luctus at lectus. Donec.
', 1);

INSERT INTO Blogs (title, content, authorid) VALUES ('Learning Software Development Is Not Difficult At All! You Just Need A Great Teacher!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus ipsum libero, non ullamcorper sapien ultricies nec. Vivamus consectetur, nisi nec tempor aliquam, odio arcu suscipit augue, et tincidunt libero risus in sapien. Aenean luctus laoreet dui, at dapibus arcu luctus eu. Nunc nec odio ac velit egestas laoreet sit amet ac libero. Phasellus efficitur mi sem, et rhoncus neque iaculis eu. Nam velit tortor, condimentum eleifend tristique tempor, congue quis metus. Nulla maximus, felis vitae viverra posuere, dui lacus mollis mi, vitae tristique ipsum quam eget ipsum. Sed eu ullamcorper turpis. Duis elementum dapibus ornare. Integer sapien dolor, commodo quis urna sit amet, porttitor molestie arcu. Nunc eleifend orci in sodales tempor. Cras nec metus mi. Donec non odio tortor. Quisque efficitur nibh viverra, faucibus mauris quis, luctus diam. Nullam posuere id enim vel egestas. Vestibulum risus orci, luctus elementum egestas ut, sagittis eu sem.
Duis vitae dolor sed mi luctus semper. Vestibulum tincidunt, sapien a consequat varius, enim risus bibendum urna, eu rhoncus felis eros vel sapien. Morbi laoreet nulla a risus cursus, vitae egestas enim accumsan. Mauris feugiat nisl ac lectus placerat porttitor vitae et felis. Vivamus non quam nisi. Donec orci leo, vestibulum et vulputate quis, sagittis vitae felis. Donec porttitor lectus diam. Fusce varius pulvinar dignissim. Suspendisse vel augue ut nisl egestas gravida vel nec nulla. Proin scelerisque tempor neque, sollicitudin blandit arcu dignissim in. Sed vel turpis erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin sed finibus metus, ut mollis lectus.
Ut ut dapibus tortor. Aliquam leo sapien, accumsan et fermentum ac, pretium a nibh. Praesent lectus dolor, vestibulum et elementum ut, egestas nec odio. Nam luctus neque vel urna commodo, at ultrices ligula ullamcorper. Proin suscipit rutrum lacus sed dictum. Cras nisl est, cursus a tempus.', 2);

SELECT * FROM Blogs;

DROP TABLE Tags;
CREATE TABLE Tags (
id int not null auto_increment primary key,
name varchar(50) not null,
_created datetime default current_timestamp on update current_timestamp);

INSERT INTO Tags (name) VALUES ('Coding');
INSERT INTO Tags (name) VALUES ('Tutorials');
INSERT INTO Tags (name) VALUES ('Self Help');

DROP TABLE BlogTags;
CREATE TABLE BlogTags (
blogid int not null,
tagid int not null,
foreign key (blogid) references Blogs(id),
foreign key (tagid) references Tags(id)); 

INSERT INTO BlogTags (blogid, tagid) VALUES (2, 1);
INSERT INTO BlogTags (blogid, tagid) VALUES (3, 2);

delimiter //
CREATE PROCEDURE spBlogTags(blogid int)
BEGIN
	SELECT name as tagname, id as tagid, bt.blogid as blogid FROM Tags
    JOIN BlogTags bt ON id = bt.tagid
    WHERE bt.blogid = blogid;
    END //
delimiter ; 

CALL spBlogTags(2);

CREATE USER 'blogsapp'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON blogs. * TO 'blogsapp'@'localhost';

ALTER USER 'blogsapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

SELECT * from Tags;

SELECT * FROM Blogtags;

SELECT * FROM blogs;

DESCRIBE blogs;
