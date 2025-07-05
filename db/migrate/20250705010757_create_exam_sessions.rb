class CreateExamSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :exam_sessions do |t|
      t.string :slug
      t.string :year
      t.string :period
      t.string :subject_slug
      t.string :subject_name
      t.text :subject_description

      t.timestamps
    end
    add_index :exam_sessions, :slug, unique: true
  end
end
