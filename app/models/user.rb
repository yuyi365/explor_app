class User < ApplicationRecord
  has_secure_password

  has_many :places

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
end
