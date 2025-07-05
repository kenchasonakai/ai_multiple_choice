class CreateQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :questions do |t|
      t.references :exam_session, null: false, foreign_key: true
      t.text :text, null: false
      t.string :question_type, null: false
      t.string :category, null: false

      t.timestamps
    end

    add_index :questions, :question_type
    add_index :questions, :category
  end
end
