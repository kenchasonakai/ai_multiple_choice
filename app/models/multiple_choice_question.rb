class MultipleChoiceQuestion < ApplicationRecord
  include QuestionTypes

  belongs_to :question

  validates :options, :correct_answer, presence: true
  validates :correct_answer, inclusion: { in: 0..3 }
  validate :options_must_be_array_of_four
  validate :question_must_be_multiple_choice

  # 文字列で正解を設定できるセッター
  def correct_answer_text=(answer_text)
    return if answer_text.blank?

    if options.is_a?(Array) && options.include?(answer_text)
      self.correct_answer = options.index(answer_text)
    else
      errors.add(:correct_answer_text, "選択肢に存在しない文字列です: #{answer_text}")
    end
  end

  # 現在の正解を文字列で取得
  def correct_answer_text
    return nil unless correct_answer && options.is_a?(Array) && correct_answer < options.length
    options[correct_answer]
  end

  private

  def options_must_be_array_of_four
    unless options.is_a?(Array) && options.length == 4
      errors.add(:options, "must be an array of 4 options")
    end
  end

  def question_must_be_multiple_choice
    if question && question.question_type != QuestionTypes::MULTIPLE_CHOICE
      errors.add(:question, "must be a multiple choice question")
    end
  end
end
