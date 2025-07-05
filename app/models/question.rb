class Question < ApplicationRecord
  include QuestionTypes
  include QuestionCategories

  belongs_to :exam_session
  has_one :multiple_choice_question, dependent: :destroy
  has_one :essay_question, dependent: :destroy

  validates :text, :question_type, :category, presence: true
  validates :question_type, inclusion: { in: QuestionTypes::ALL }
  validates :category, inclusion: { in: QuestionCategories::ALL }

  scope :multiple_choice, -> { where(question_type: QuestionTypes::MULTIPLE_CHOICE) }
  scope :essay, -> { where(question_type: QuestionTypes::ESSAY) }
  scope :by_category, ->(category) { where(category: category) }

  def detail
    case question_type
    when QuestionTypes::MULTIPLE_CHOICE
      multiple_choice_question
    when QuestionTypes::ESSAY
      essay_question
    end
  end

  def multiple_choice?
    question_type == QuestionTypes::MULTIPLE_CHOICE
  end

  def essay?
    question_type == QuestionTypes::ESSAY
  end
end
