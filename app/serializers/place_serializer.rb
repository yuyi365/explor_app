class PlaceSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :location,
             :image,
             :user_id,
             :category,
             :price_level,
             :website
end
