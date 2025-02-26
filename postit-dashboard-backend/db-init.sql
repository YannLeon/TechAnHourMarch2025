-- Create the users table if it doesn't already exist
create table if not exists users (
   id       serial primary key,
   name     varchar(255) not null unique,
   password text not null,
   role     varchar(10) not null default 'user'  -- "admin" or "user"
);     

-- Insert initial users (Note: Passwords should be hashed in a real application)
insert into users (
   name,
   password,
   role
) values ( 'yann',
           '123123',
           'user' ),( 'mj',
                      'password',
                      'user' ),( 'admin',
                                 'admin',
                                 'admin' );  -- Admin has a different role

-- Create the post_its table if it doesn't already exist
create table if not exists post_its (
   id         serial primary key,
   content    text not null,
   user_id    int not null,
   created_at timestamp default current_timestamp,
   foreign key ( user_id )
      references users ( id )
         on delete cascade
);

-- Insert initial Post-it data (matching user IDs)
insert into post_its (
   content,
   user_id
) values ( 'Finish setting up the backend for the Post-it Dashboard.',
           1 ), -- Yann
           ( 'Test the frontend integration with the backend API.',
                 2 ),      -- MJ
                 ( 'Deploy the application using Docker Compose.',
                       3 );            -- Admin