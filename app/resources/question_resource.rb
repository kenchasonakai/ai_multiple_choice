class QuestionResource
  include Alba::Resource

  attributes :id, :text, :category

  attribute :options do
    if object.is_a?(Question) && object.multiple_choice?
      object.multiple_choice_question&.options || []
    else
      []
    end
  end

  attribute :correct_answer do
    if object.is_a?(Question) && object.multiple_choice?
      object.multiple_choice_question&.correct_answer
    else
      nil
    end
  end
end