require 'rails_helper'

RSpec.describe ExamSession, type: :model do
  describe 'associations' do
    it { should have_many(:questions).dependent(:destroy) }
  end

  describe 'validations' do
    let(:exam_session) { build(:exam_session) }

    it { should validate_presence_of(:slug) }
    it { should validate_presence_of(:year) }
    it { should validate_presence_of(:period) }
    it { should validate_presence_of(:subject_slug) }
    it { should validate_presence_of(:subject_name) }
    it { should validate_uniqueness_of(:slug) }

    it 'is valid with valid attributes' do
      expect(exam_session).to be_valid
    end

    it 'is invalid without a slug' do
      exam_session.slug = nil
      expect(exam_session).not_to be_valid
      expect(exam_session.errors[:slug]).to include("can't be blank")
    end

    it 'is invalid with duplicate slug' do
      create(:exam_session, slug: "2023-spring-subject-a")
      duplicate_session = build(:exam_session, slug: "2023-spring-subject-a")
      expect(duplicate_session).not_to be_valid
      expect(duplicate_session.errors[:slug]).to include("has already been taken")
    end
  end

  describe 'scopes' do
    let!(:exam_2023_spring) { create(:exam_session, slug: "2023-spring-subject-a", year: "2023", period: "2023年度春期") }
    let!(:exam_2023_autumn) { create(:exam_session, slug: "2023-autumn-subject-a", year: "2023", period: "2023年度秋期") }
    let!(:exam_2022_spring) { create(:exam_session, slug: "2022-spring-subject-a", year: "2022", period: "2022年度春期") }
    let!(:exam_subject_a) { create(:exam_session, slug: "2023-spring-subject-a-unique", subject_slug: "subject-a") }
    let!(:exam_subject_b) { create(:exam_session, slug: "2023-spring-subject-b", subject_slug: "subject-b") }

    describe '.by_year' do
      it 'returns exam sessions for the specified year' do
        expect(ExamSession.by_year("2023")).to include(exam_2023_spring, exam_2023_autumn)
        expect(ExamSession.by_year("2023")).not_to include(exam_2022_spring)
      end
    end

    describe '.by_subject' do
      it 'returns exam sessions for the specified subject' do
        expect(ExamSession.by_subject("subject-a")).to include(exam_subject_a)
        expect(ExamSession.by_subject("subject-a")).not_to include(exam_subject_b)
      end
    end
  end

  describe 'associations behavior' do
    it 'destroys associated questions when exam session is destroyed' do
      exam_session = create(:exam_session, :with_questions)
      expect { exam_session.destroy }.to change { Question.count }.by(-3)
    end
  end
end
