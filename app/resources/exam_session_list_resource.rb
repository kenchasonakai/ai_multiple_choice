class ExamSessionListResource
  include Alba::Resource

  attributes :slug, :year, :period

  attribute :subject do
    {
      slug: object.subject_slug,
      name: object.subject_name,
      description: object.subject_description
    }
  end

  attribute :question_count do
    object.questions.count
  end
end