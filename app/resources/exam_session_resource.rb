class ExamSessionResource
  include Alba::Resource

  attributes :slug, :year, :period

  attribute :subject do
    {
      slug: object.subject_slug,
      name: object.subject_name,
      description: object.subject_description
    }
  end

  attribute :questions do
    object.questions.map do |question|
      QuestionResource.new(question).serializable_hash
    end
  end
end