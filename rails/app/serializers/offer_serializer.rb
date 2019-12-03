class OfferSerializer < ActiveModel::Serializer
  attributes :id, :tour_name, :about, :departs, :length, :price, :likes, :image
  belongs_to :provider
end
