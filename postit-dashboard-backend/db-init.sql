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