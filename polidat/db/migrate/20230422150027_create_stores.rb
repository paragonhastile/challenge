class CreateStores < ActiveRecord::Migration[7.0]
  def change
    create_table :stores do |t|
      t.string :name
      t.string :subdomain
      t.string :domain
      t.string :primary_color
      t.string :secondary_color
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
