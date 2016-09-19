class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :word
      t.integer :level
      t.integer :status
      t.datetime :created_at
      t.datetime :updated_at
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
