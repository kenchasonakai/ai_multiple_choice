class CreateEssayQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :essay_questions do |t|
      t.references :question, null: false, foreign_key: true
      t.json :answer_criteria, null: false
      t.json :sample_answers, null: false
      t.json :evaluation_rubric
      t.integer :min_length, null: false, default: 0
      t.integer :max_length, null: false, default: 1000

      t.timestamps
    end

    add_index :essay_questions, :min_length
    add_index :essay_questions, :max_length
    add_index :essay_questions, [ :min_length, :max_length ]
  end
end
