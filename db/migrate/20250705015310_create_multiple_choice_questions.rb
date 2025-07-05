class CreateMultipleChoiceQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :multiple_choice_questions do |t|
      t.references :question, null: false, foreign_key: true
      t.json :options, null: false
      t.integer :correct_answer, null: false

      t.timestamps
    end

    add_index :multiple_choice_questions, :correct_answer
  end
end
