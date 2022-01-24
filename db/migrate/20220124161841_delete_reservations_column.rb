class DeleteReservationsColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :places, :reservation_link, :string
  end
end
