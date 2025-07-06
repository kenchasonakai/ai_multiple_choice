class ExamSessionListResource
  include Alba::Resource

  attributes slug: [String, true], year: [String, true], period: [String, true], subject_slug: [String, true], subject_name: [String, true], subject_description: String

  attribute :question_count do |exam_session|
    exam_session.questions.count
  end
end