class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :image, :user_id
end
