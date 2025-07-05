require 'rails_helper'

RSpec.describe MultipleChoiceQuestion, type: :model do
  describe 'associations' do
    it { should belong_to(:question) }
  end

  describe 'validations' do
    let(:multiple_choice_question) { build(:multiple_choice_question) }

    it { should validate_presence_of(:options) }
    it { should validate_presence_of(:correct_answer) }

    it 'is valid with valid attributes' do
      expect(multiple_choice_question).to be_valid
    end

    it 'validates correct_answer inclusion' do
      expect(multiple_choice_question).to validate_inclusion_of(:correct_answer).in_range(0..3)
    end

    describe 'options_must_be_array_of_four' do
      it 'is valid with 4 options' do
        multiple_choice_question.options = ["A", "B", "C", "D"]
        expect(multiple_choice_question).to be_valid
      end

      it 'is invalid with less than 4 options' do
        multiple_choice_question.options = ["A", "B", "C"]
        expect(multiple_choice_question).not_to be_valid
        expect(multiple_choice_question.errors[:options]).to include("must be an array of 4 options")
      end

      it 'is invalid with more than 4 options' do
        multiple_choice_question.options = ["A", "B", "C", "D", "E"]
        expect(multiple_choice_question).not_to be_valid
        expect(multiple_choice_question.errors[:options]).to include("must be an array of 4 options")
      end

      it 'is invalid with non-array options' do
        multiple_choice_question.options = "not an array"
        expect(multiple_choice_question).not_to be_valid
        expect(multiple_choice_question.errors[:options]).to include("must be an array of 4 options")
      end
    end

    describe 'question_must_be_multiple_choice' do
      it 'is valid when question is multiple choice' do
        question = create(:question, question_type: QuestionTypes::MULTIPLE_CHOICE)
        multiple_choice_question = build(:multiple_choice_question, question: question)
        expect(multiple_choice_question).to be_valid
      end

      it 'is invalid when question is not multiple choice' do
        question = create(:question, question_type: QuestionTypes::ESSAY)
        multiple_choice_question = build(:multiple_choice_question, question: question)
        expect(multiple_choice_question).not_to be_valid
        expect(multiple_choice_question.errors[:question]).to include("must be a multiple choice question")
      end
    end

    describe 'correct_answer validation' do
      it 'is invalid with correct_answer less than 0' do
        multiple_choice_question.correct_answer = -1
        expect(multiple_choice_question).not_to be_valid
        expect(multiple_choice_question.errors[:correct_answer]).to include("is not included in the list")
      end

      it 'is invalid with correct_answer greater than 3' do
        multiple_choice_question.correct_answer = 4
        expect(multiple_choice_question).not_to be_valid
        expect(multiple_choice_question.errors[:correct_answer]).to include("is not included in the list")
      end

      it 'is valid with correct_answer between 0 and 3' do
        (0..3).each do |answer|
          multiple_choice_question.correct_answer = answer
          expect(multiple_choice_question).to be_valid
        end
      end
    end
  end

  describe 'instance methods' do
    let(:multiple_choice_question) do
      create(:multiple_choice_question, 
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct_answer: 2)
    end

    describe '#correct_answer_text' do
      it 'returns the correct answer text' do
        expect(multiple_choice_question.correct_answer_text).to eq("Option C")
      end

      it 'returns nil when correct_answer is nil' do
        multiple_choice_question.correct_answer = nil
        expect(multiple_choice_question.correct_answer_text).to be_nil
      end

      it 'returns nil when options is not an array' do
        multiple_choice_question.options = "not an array"
        expect(multiple_choice_question.correct_answer_text).to be_nil
      end

      it 'returns nil when correct_answer is out of range' do
        multiple_choice_question.correct_answer = 5
        expect(multiple_choice_question.correct_answer_text).to be_nil
      end
    end

    describe '#correct_answer_text=' do
      it 'sets correct_answer from answer text' do
        multiple_choice_question.correct_answer_text = "Option A"
        expect(multiple_choice_question.correct_answer).to eq(0)
      end

      it 'sets correct_answer for different options' do
        multiple_choice_question.correct_answer_text = "Option D"
        expect(multiple_choice_question.correct_answer).to eq(3)
      end

      it 'does not set correct_answer for blank input' do
        original_answer = multiple_choice_question.correct_answer
        multiple_choice_question.correct_answer_text = ""
        expect(multiple_choice_question.correct_answer).to eq(original_answer)
      end

      it 'does not set correct_answer for nil input' do
        original_answer = multiple_choice_question.correct_answer
        multiple_choice_question.correct_answer_text = nil
        expect(multiple_choice_question.correct_answer).to eq(original_answer)
      end

      it 'adds error for non-existent option' do
        multiple_choice_question.correct_answer_text = "Non-existent Option"
        expect(multiple_choice_question.errors[:correct_answer_text]).to include("選択肢に存在しない文字列です: Non-existent Option")
      end

      it 'adds error when options is not an array' do
        multiple_choice_question.options = "not an array"
        multiple_choice_question.correct_answer_text = "Option A"
        expect(multiple_choice_question.errors[:correct_answer_text]).to include("選択肢に存在しない文字列です: Option A")
      end
    end
  end
end