class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :stripe_id
      t.string :stripe_price_id
      t.json :data
      t.string :name, null: false
      t.string :description

      t.timestamps
    end
  end
end
