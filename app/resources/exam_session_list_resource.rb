class ExamSessionListResource
  include Alba::Resource

  attributes :slug, :year, :period, :subject_slug, :subject_name, :subject_description

  attribute :question_count do
    object.questions.count
  end
end