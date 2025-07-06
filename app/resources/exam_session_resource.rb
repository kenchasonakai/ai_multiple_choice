class ExamSessionResource
  include Alba::Resource

  attributes :slug, :year, :period, :subject_slug, :subject_name, :subject_description

  attribute :questions do
    object.questions.map do |question|
      QuestionResource.new(question).serializable_hash
    end
  end
end