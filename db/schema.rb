# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_05_015424) do
  create_table "essay_questions", force: :cascade do |t|
    t.integer "question_id", null: false
    t.json "answer_criteria", null: false
    t.json "sample_answers", null: false
    t.json "evaluation_rubric"
    t.integer "min_length", default: 0, null: false
    t.integer "max_length", default: 1000, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["max_length"], name: "index_essay_questions_on_max_length"
    t.index ["min_length", "max_length"], name: "index_essay_questions_on_min_length_and_max_length"
    t.index ["min_length"], name: "index_essay_questions_on_min_length"
    t.index ["question_id"], name: "index_essay_questions_on_question_id"
  end

  create_table "exam_sessions", force: :cascade do |t|
    t.string "slug"
    t.string "year"
    t.string "period"
    t.string "subject_slug"
    t.string "subject_name"
    t.text "subject_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_exam_sessions_on_slug", unique: true
  end

  create_table "multiple_choice_questions", force: :cascade do |t|
    t.integer "question_id", null: false
    t.json "options", null: false
    t.integer "correct_answer", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["correct_answer"], name: "index_multiple_choice_questions_on_correct_answer"
    t.index ["question_id"], name: "index_multiple_choice_questions_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.integer "exam_session_id", null: false
    t.text "text", null: false
    t.string "question_type", null: false
    t.string "category", null: false
    t.string "difficulty", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category", "difficulty"], name: "index_questions_on_category_and_difficulty"
    t.index ["category"], name: "index_questions_on_category"
    t.index ["difficulty"], name: "index_questions_on_difficulty"
    t.index ["exam_session_id"], name: "index_questions_on_exam_session_id"
    t.index ["question_type"], name: "index_questions_on_question_type"
  end

  add_foreign_key "essay_questions", "questions"
  add_foreign_key "multiple_choice_questions", "questions"
  add_foreign_key "questions", "exam_sessions"
end
