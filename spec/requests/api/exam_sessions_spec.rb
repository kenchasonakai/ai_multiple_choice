require 'rails_helper'

RSpec.describe "Api::ExamSessions", type: :request do
  describe "GET /api/exam_sessions/:slug" do
    let(:exam_session) { create(:exam_session, slug: "2023-spring-subject-a") }
    let!(:question1) { create(:question, :with_multiple_choice, exam_session: exam_session) }
    let!(:question2) { create(:question, :with_multiple_choice, :network, exam_session: exam_session) }
    let!(:question3) { create(:question, :with_multiple_choice, :security, exam_session: exam_session) }

    context "when exam session exists" do
      before { get "/api/exam_sessions/#{exam_session.slug}" }

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "returns correct exam session data" do
        json = JSON.parse(response.body)
        data = json["data"]

        expect(json["success"]).to be true
        expect(data["slug"]).to eq("2023-spring-subject-a")
        expect(data["year"]).to eq("2023")
        expect(data["period"]).to eq("2023年度春期")
      end

      it "returns correct subject data" do
        json = JSON.parse(response.body)
        data = json["data"]

        expect(data["subject_slug"]).to eq("subject-a")
        expect(data["subject_name"]).to eq("科目A")
        expect(data["subject_description"]).to eq("多肢選択式")
      end

      it "returns questions with correct structure" do
        json = JSON.parse(response.body)
        questions = json["data"]["questions"]

        expect(questions.length).to eq(3)

        question = questions.first
        expect(question).to have_key("id")
        expect(question).to have_key("text")
        expect(question).to have_key("category")
        expect(question).to have_key("options")
        expect(question).to have_key("correct_answer")

        expect(question["options"]).to be_an(Array)
        expect(question["options"].length).to eq(4)
        expect(question["correct_answer"]).to be_between(0, 3)
      end

      it "returns questions with correct categories" do
        json = JSON.parse(response.body)
        questions = json["data"]["questions"]

        categories = questions.map { |q| q["category"] }
        expect(categories).to include(QuestionCategories::DATABASE)
        expect(categories).to include(QuestionCategories::NETWORK)
        expect(categories).to include(QuestionCategories::SECURITY)
      end

      it "includes multiple choice question details" do
        json = JSON.parse(response.body)
        questions = json["data"]["questions"]

        questions.each do |question|
          expect(question["options"]).to be_present
          expect(question["correct_answer"]).to be_present
        end
      end
    end

    context "when exam session does not exist" do
      before { get "/api/exam_sessions/nonexistent-slug" }

      it "returns http not found" do
        expect(response).to have_http_status(:not_found)
      end

      it "returns error message" do
        json = JSON.parse(response.body)

        expect(json["success"]).to be false
        expect(json["message"]).to eq("Exam session not found: nonexistent-slug")
      end
    end

    context "with different exam session types" do
      let(:subject_b_session) { create(:exam_session, :subject_b, slug: "2023-spring-subject-b") }
      let!(:subject_b_question) { create(:question, :with_multiple_choice, exam_session: subject_b_session) }

      before { get "/api/exam_sessions/#{subject_b_session.slug}" }

      it "returns correct subject B data" do
        json = JSON.parse(response.body)
        data = json["data"]

        expect(data["subject_slug"]).to eq("subject-b")
        expect(data["subject_name"]).to eq("科目B")
        expect(data["subject_description"]).to eq("多肢選択式・記述式")
      end
    end

    context "with empty exam session" do
      let(:empty_session) { create(:exam_session, slug: "2023-spring-empty") }

      before { get "/api/exam_sessions/#{empty_session.slug}" }

      it "returns empty questions array" do
        json = JSON.parse(response.body)
        data = json["data"]

        expect(data["questions"]).to eq([])
      end
    end
  end
end
