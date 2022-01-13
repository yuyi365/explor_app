class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|
      t.string :name
      t.string :location
      t.string :image
      t.integer :user_id
      t.timestamps
    end
  end
end
