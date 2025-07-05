require 'rails_helper'

RSpec.describe Question, type: :model do
  describe 'associations' do
    it { should belong_to(:exam_session) }
    it { should have_one(:multiple_choice_question).dependent(:destroy) }
    it { should have_one(:essay_question).dependent(:destroy) }
  end

  describe 'validations' do
    let(:question) { build(:question) }

    it { should validate_presence_of(:text) }
    it { should validate_presence_of(:question_type) }
    it { should validate_presence_of(:category) }

    it 'is valid with valid attributes' do
      expect(question).to be_valid
    end

    it 'validates question_type inclusion' do
      expect(question).to validate_inclusion_of(:question_type).in_array(QuestionTypes::ALL)
    end

    it 'validates category inclusion' do
      expect(question).to validate_inclusion_of(:category).in_array(QuestionCategories::ALL)
    end

    it 'is invalid with invalid question_type' do
      question.question_type = "invalid_type"
      expect(question).not_to be_valid
      expect(question.errors[:question_type]).to include("is not included in the list")
    end

    it 'is invalid with invalid category' do
      question.category = "invalid_category"
      expect(question).not_to be_valid
      expect(question.errors[:category]).to include("is not included in the list")
    end
  end

  describe 'scopes' do
    let!(:multiple_choice_question) { create(:question, question_type: QuestionTypes::MULTIPLE_CHOICE) }
    let!(:essay_question) { create(:question, :essay) }
    let!(:database_question) { create(:question, category: QuestionCategories::DATABASE) }
    let!(:network_question) { create(:question, :network) }

    describe '.multiple_choice' do
      it 'returns only multiple choice questions' do
        expect(Question.multiple_choice).to include(multiple_choice_question)
        expect(Question.multiple_choice).not_to include(essay_question)
      end
    end

    describe '.essay' do
      it 'returns only essay questions' do
        expect(Question.essay).to include(essay_question)
        expect(Question.essay).not_to include(multiple_choice_question)
      end
    end

    describe '.by_category' do
      it 'returns questions for the specified category' do
        expect(Question.by_category(QuestionCategories::DATABASE)).to include(database_question)
        expect(Question.by_category(QuestionCategories::DATABASE)).not_to include(network_question)
      end
    end
  end

  describe 'instance methods' do
    describe '#detail' do
      context 'when question is multiple choice' do
        let(:question) { create(:question, :with_multiple_choice) }

        it 'returns the multiple choice question' do
          expect(question.detail).to eq(question.multiple_choice_question)
        end
      end

      context 'when question is essay' do
        let(:question) { create(:question, :with_essay) }

        it 'returns the essay question' do
          expect(question.detail).to eq(question.essay_question)
        end
      end

      context 'when question has no detail' do
        let(:question) { create(:question) }

        it 'returns nil' do
          expect(question.detail).to be_nil
        end
      end
    end

    describe '#multiple_choice?' do
      it 'returns true for multiple choice questions' do
        question = build(:question, question_type: QuestionTypes::MULTIPLE_CHOICE)
        expect(question.multiple_choice?).to be true
      end

      it 'returns false for essay questions' do
        question = build(:question, question_type: QuestionTypes::ESSAY)
        expect(question.multiple_choice?).to be false
      end
    end

    describe '#essay?' do
      it 'returns true for essay questions' do
        question = build(:question, question_type: QuestionTypes::ESSAY)
        expect(question.essay?).to be true
      end

      it 'returns false for multiple choice questions' do
        question = build(:question, question_type: QuestionTypes::MULTIPLE_CHOICE)
        expect(question.essay?).to be false
      end
    end
  end
end
