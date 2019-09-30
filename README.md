# Autocomplete Search Bar

Search Bar with auto complete suggestions

## Getting Started

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
bundle install
```

```
npm install
```

```
bin/setup

rails db:seed
```

After seeding the database, 30 records will be inserted in [Player] table;

## Notes :

1. Feature : Search Box with auto suggestions

2. Data has been added into database using seed.rb. 30 records have been added using Faker gem.

3. Suggestion are fetched from backend whenever input text changes in the search box. Another way would be to fetch data from backend whenever component is mounted(This code is in comments)

4. Tech Stack :
   Backend : Ruby on Rails
   FrontEnd : React.jsDBMS : Postgresql
   Endpoints : / -> root -> search bar
     /api/posts -> render all posts
     /api/posts/get_suggestions -> get suggestions based on post param( name )
