-- Create the post_its table if it doesn't already exist
create table if not exists post_its (
   id         serial primary key,
   content    text not null,
   name       varchar(255) not null,
   created_at timestamp default current_timestamp
);

-- Insert initial Post-it data
insert into post_its (
   content,
   name
) values ( 'Finish setting up the backend for the Post-it Dashboard.',
           'Yann' ),( 'Test the frontend integration with the backend API.',
                      'Adèle' ),( 'Deploy the application using Docker Compose.',
                                  'Admin' );

-- Create the users table if it doesn't already exist
create table if not exists users (
   id       serial primary key,  -- Unique identifier for each user
   name     varchar(255) not null unique, -- Ensure unique usernames
   password text not null         -- Store hashed passwords securely
);

-- Insert initial users (Note: Passwords should be hashed in a real application)
insert into users (
   name,
   password
) values ( 'yann',
           'hashed_password_1' ),( 'adèle',
                                   'hashed_password_2' ),( 'admin',
                                                           'hashed_password_3' );