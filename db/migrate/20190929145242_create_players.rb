class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :title
      t.string :position
      
      t.timestamps
    end
  end
end
