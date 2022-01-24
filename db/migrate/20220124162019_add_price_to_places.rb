class AddPriceToPlaces < ActiveRecord::Migration[6.1]
  def change
    add_column :places, :price_level, :string
  end
end
