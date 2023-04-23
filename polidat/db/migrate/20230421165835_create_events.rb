class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.json :data, null: false, default: {}
      t.string :source, null: false, default: ''
      t.text :processing_errors, null: true, default: ''
      t.string :status, null: false, default: 'pending'

      t.timestamps
    end
  end
end
