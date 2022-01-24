class UpdatePlacesReservationColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :places,
                  :reservation_link,
                  :string,
                  default: 'https://www.google.com/'
  end
end
