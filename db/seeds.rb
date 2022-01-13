# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'activerecord-reset-pk-sequence'
require 'bcrypt'

print('Seeding!🌰')
#USERS

yuyi =
  User.create(
    username: 'yuyi',
    password_digest: BCrypt::Password.create('hello'),
    email: 'yuyi365@gmail.com',
    first_name: 'Yuyi',
    last_name: 'Li',
  )

admin =
  User.create(
    username: 'admin',
    password_digest: BCrypt::Password.create('hello'),
    email: 'admin@gmail.com',
    first_name: 'Admin',
    last_name: 'User',
  )

met =
  Place.create(
    name: 'The Metropolitan Museum of Art',
    location: 'New York City',
    image: 'https://www.metmuseum.org/ghidorah/assets/images/meta-image.jpg',
    user_id: yuyi.id,
  )

flatiron =
  Place.create(
    name: 'Flatiron School',
    location: 'New York City',
    image:
      'https://images.ctfassets.net/hkpf2qd2vxgx/1dlklFz5B6DlSJ0Ks2ZVgs/84a7522031a287cdc8ff0579ea12bdbb/8',
    user_id: yuyi.id,
  )

moma =
  Place.create(
    name: 'Museum of Modern Art',
    location: 'New York City',
    image:
      'https://www.moma.org/d/p/sa/maximum/moma_renovation_and_expansion.jpg',
    user_id: admin.id,
  )

print('Finished seeding!🌱')
