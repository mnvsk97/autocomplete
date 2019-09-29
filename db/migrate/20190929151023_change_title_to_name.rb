class ChangeTitleToName < ActiveRecord::Migration[5.2]
  def change
    rename_column :players, :title, :name
  end
end
