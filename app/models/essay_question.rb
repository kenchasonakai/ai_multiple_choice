class EssayQuestion < ApplicationRecord
  include QuestionTypes

  belongs_to :question

  validates :answer_criteria, :sample_answers, :min_length, :max_length, presence: true
  validates :min_length, :max_length, numericality: { greater_than: 0 }
  validate :max_length_greater_than_min_length
  validate :answer_criteria_must_be_hash
  validate :sample_answers_must_be_hash
  validate :question_must_be_essay

  private

  def max_length_greater_than_min_length
    if max_length && min_length && max_length <= min_length
      errors.add(:max_length, "must be greater than min_length")
    end
  end

  def answer_criteria_must_be_hash
    unless answer_criteria.is_a?(Hash)
      errors.add(:answer_criteria, "must be a hash")
    end
  end

  def sample_answers_must_be_hash
    unless sample_answers.is_a?(Hash)
      errors.add(:sample_answers, "must be a hash")
    end
  end

  def question_must_be_essay
    if question && question.question_type != QuestionTypes::ESSAY
      errors.add(:question, "must be an essay question")
    end
  end
end
