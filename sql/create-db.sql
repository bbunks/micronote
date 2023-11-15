create table role
(
    id    bigint auto_increment primary key,
    title varchar(255) null
);

create table user
(
    id         bigint auto_increment primary key,
    email      varchar(255) null,
    enabled    bit          not null,
    first_name varchar(255) null,
    last_name  varchar(255) null,
    password   varchar(255) null
);

create table note
(
    id           bigint auto_increment primary key,
    user_id      bigint       null,
    title        varchar(255) null,
    created_date datetime(6)  null,
    last_update  datetime(6)  null
);

create table note_content
(
    id      bigint auto_increment primary key,
    type    enum ('PICTURE', 'TEXT') null,
    value   varchar(255)             null,
    note_id bigint                   null,
    user_id bigint                   null

);

create table tag
(
    id      bigint auto_increment primary key,
    color   varchar(255) null,
    label   varchar(255) null,
    user_id bigint       null
);

create table note_tag
(
    note_id bigint not null,
    tag_id  bigint not null
);

create table user_role
(
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id)
);

