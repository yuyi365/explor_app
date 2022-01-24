class AddColumnsToPlaces < ActiveRecord::Migration[6.1]
  def change
    add_column :places, :reservation_link, :string
    add_column :places, :website, :string
  end
end
