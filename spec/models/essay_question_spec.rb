require 'rails_helper'

RSpec.describe EssayQuestion, type: :model do
  describe 'associations' do
    it { should belong_to(:question) }
  end

  describe 'validations' do
    let(:essay_question) { build(:essay_question) }

    it { should validate_presence_of(:answer_criteria) }
    it { should validate_presence_of(:sample_answers) }
    it { should validate_presence_of(:min_length) }
    it { should validate_presence_of(:max_length) }
    it { should validate_numericality_of(:min_length).is_greater_than(0) }
    it { should validate_numericality_of(:max_length).is_greater_than(0) }

    it 'is valid with valid attributes' do
      expect(essay_question).to be_valid
    end

    describe 'max_length_greater_than_min_length' do
      it 'is valid when max_length is greater than min_length' do
        essay_question.min_length = 50
        essay_question.max_length = 100
        expect(essay_question).to be_valid
      end

      it 'is invalid when max_length equals min_length' do
        essay_question.min_length = 50
        essay_question.max_length = 50
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:max_length]).to include("must be greater than min_length")
      end

      it 'is invalid when max_length is less than min_length' do
        essay_question.min_length = 100
        essay_question.max_length = 50
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:max_length]).to include("must be greater than min_length")
      end
    end

    describe 'answer_criteria_must_be_hash' do
      it 'is valid when answer_criteria is a hash' do
        essay_question.answer_criteria = { required_keywords: [ "test" ] }
        expect(essay_question).to be_valid
      end

      it 'is invalid when answer_criteria is not a hash' do
        essay_question.answer_criteria = "not a hash"
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:answer_criteria]).to include("must be a hash")
      end

      it 'is invalid when answer_criteria is an array' do
        essay_question.answer_criteria = [ "not", "a", "hash" ]
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:answer_criteria]).to include("must be a hash")
      end
    end

    describe 'sample_answers_must_be_hash' do
      it 'is valid when sample_answers is a hash' do
        essay_question.sample_answers = { perfect_answer: "test answer" }
        expect(essay_question).to be_valid
      end

      it 'is invalid when sample_answers is not a hash' do
        essay_question.sample_answers = "not a hash"
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:sample_answers]).to include("must be a hash")
      end

      it 'is invalid when sample_answers is an array' do
        essay_question.sample_answers = [ "not", "a", "hash" ]
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:sample_answers]).to include("must be a hash")
      end
    end

    describe 'question_must_be_essay' do
      it 'is valid when question is essay' do
        question = create(:question, question_type: QuestionTypes::ESSAY)
        essay_question = build(:essay_question, question: question)
        expect(essay_question).to be_valid
      end

      it 'is invalid when question is not essay' do
        question = create(:question, question_type: QuestionTypes::MULTIPLE_CHOICE)
        essay_question = build(:essay_question, question: question)
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:question]).to include("must be an essay question")
      end
    end

    describe 'numerical validations' do
      it 'is invalid with min_length of 0' do
        essay_question.min_length = 0
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:min_length]).to include("must be greater than 0")
      end

      it 'is invalid with max_length of 0' do
        essay_question.max_length = 0
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:max_length]).to include("must be greater than 0")
      end

      it 'is invalid with negative min_length' do
        essay_question.min_length = -1
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:min_length]).to include("must be greater than 0")
      end

      it 'is invalid with negative max_length' do
        essay_question.max_length = -1
        expect(essay_question).not_to be_valid
        expect(essay_question.errors[:max_length]).to include("must be greater than 0")
      end
    end
  end

  describe 'JSON field structure' do
    let(:essay_question) { create(:essay_question) }

    describe 'answer_criteria structure' do
      it 'has required_keywords array' do
        expect(essay_question.answer_criteria['required_keywords']).to be_an(Array)
        expect(essay_question.answer_criteria['required_keywords']).to include("正規化")
      end

      it 'has prohibited_keywords array' do
        expect(essay_question.answer_criteria['prohibited_keywords']).to be_an(Array)
        expect(essay_question.answer_criteria['prohibited_keywords']).to include("非正規化")
      end

      it 'has scoring_weights hash' do
        expect(essay_question.answer_criteria['scoring_weights']).to be_a(Hash)
        expect(essay_question.answer_criteria['scoring_weights']['concept_understanding']).to eq(0.4)
      end
    end

    describe 'sample_answers structure' do
      it 'has perfect_answer string' do
        expect(essay_question.sample_answers['perfect_answer']).to be_a(String)
        expect(essay_question.sample_answers['perfect_answer']).to include("第三正規形")
      end

      it 'has good_answers array' do
        expect(essay_question.sample_answers['good_answers']).to be_an(Array)
        expect(essay_question.sample_answers['good_answers'].first).to include("正規化")
      end
    end

    describe 'evaluation_rubric structure' do
      it 'has criteria array' do
        expect(essay_question.evaluation_rubric['criteria']).to be_an(Array)
        expect(essay_question.evaluation_rubric['criteria'].first).to have_key('name')
        expect(essay_question.evaluation_rubric['criteria'].first).to have_key('description')
      end
    end
  end

  describe 'factory traits' do
    describe 'network_question trait' do
      let(:network_essay) { create(:essay_question, :network_question) }

      it 'creates essay question with network category' do
        expect(network_essay.question.category).to eq(QuestionCategories::NETWORK)
      end

      it 'has network-specific answer criteria' do
        expect(network_essay.answer_criteria['required_keywords']).to include("TCP")
      end
    end

    describe 'security_question trait' do
      let(:security_essay) { create(:essay_question, :security_question) }

      it 'creates essay question with security category' do
        expect(security_essay.question.category).to eq(QuestionCategories::SECURITY)
      end

      it 'has different length constraints' do
        expect(security_essay.min_length).to eq(30)
        expect(security_essay.max_length).to eq(200)
      end
    end
  end
end
