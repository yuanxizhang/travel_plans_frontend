class PlanSerializer < ActiveModel::Serializer
  attributes :id, :place, :adventure, :traveler_id
  belongs_to :traveler
end
