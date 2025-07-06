class ExamSessionResource
  include Alba::Resource

  attributes slug: [String, true], year: [String, true], period: [String, true], subject_slug: [String, true], subject_name: [String, true], subject_description: String

  has_many :questions do
    attributes :id, text: [String, true], question_type: [String, true], category: [String, true]

    has_one :multiple_choice_question do
      attributes :options, correct_answer: [Integer, true]
    end

    has_one :essay_question do
      attributes :sample_answers, answer_criteria: [String, true], evaluation_rubric: [String, true], min_length: [Integer, true], max_length: [Integer, true]
    end
  end
end