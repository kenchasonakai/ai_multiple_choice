require 'rails_helper'

RSpec.describe "Api::ExamSessions Index", type: :request do
  describe "GET /api/exam_sessions" do
    let!(:session1) { create(:exam_session, slug: "2023-spring-subject-a", year: "2023", period: "2023年度春期") }
    let!(:session2) { create(:exam_session, slug: "2023-spring-subject-b", year: "2023", period: "2023年度春期", subject_slug: "subject-b", subject_name: "科目B") }
    let!(:session3) { create(:exam_session, slug: "2022-spring-subject-a", year: "2022", period: "2022年度春期") }

    let!(:question1) { create(:question, :with_multiple_choice, exam_session: session1) }
    let!(:question2) { create(:question, :with_multiple_choice, exam_session: session1) }
    let!(:question3) { create(:question, :with_multiple_choice, exam_session: session2) }

    before { get "/api/exam_sessions" }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "returns all exam sessions in order" do
      json = JSON.parse(response.body)
      data = json["data"]

      expect(json["success"]).to be true
      expect(data.length).to eq(3)

      # 年度順、期順、科目順にソートされている
      expect(data.map { |s| s["slug"] }).to eq([
        "2022-spring-subject-a",
        "2023-spring-subject-a",
        "2023-spring-subject-b"
      ])
    end

    it "returns correct exam session structure" do
      json = JSON.parse(response.body)
      session = json["data"].first

      expect(session).to have_key("slug")
      expect(session).to have_key("year")
      expect(session).to have_key("period")
      expect(session).to have_key("subject_slug")
      expect(session).to have_key("subject_name")
      expect(session).to have_key("subject_description")
      expect(session).to have_key("question_count")
    end

    it "returns correct question counts" do
      json = JSON.parse(response.body)
      data = json["data"]

      session_a_2023 = data.find { |s| s["slug"] == "2023-spring-subject-a" }
      session_b_2023 = data.find { |s| s["slug"] == "2023-spring-subject-b" }
      session_a_2022 = data.find { |s| s["slug"] == "2022-spring-subject-a" }

      expect(session_a_2023["question_count"]).to eq(2)
      expect(session_b_2023["question_count"]).to eq(1)
      expect(session_a_2022["question_count"]).to eq(0)
    end

    it "returns correct subject information" do
      json = JSON.parse(response.body)
      data = json["data"]

      subject_a = data.find { |s| s["slug"] == "2023-spring-subject-a" }
      subject_b = data.find { |s| s["slug"] == "2023-spring-subject-b" }

      expect(subject_a["subject_slug"]).to eq("subject-a")
      expect(subject_a["subject_name"]).to eq("科目A")
      expect(subject_a["subject_description"]).to eq("多肢選択式")

      expect(subject_b["subject_slug"]).to eq("subject-b")
      expect(subject_b["subject_name"]).to eq("科目B")
      expect(subject_b["subject_description"]).to eq("多肢選択式")
    end
  end

  describe "when no exam sessions exist" do
    before { get "/api/exam_sessions" }

    it "returns empty array" do
      json = JSON.parse(response.body)
      expect(json["success"]).to be true
      expect(json["data"]).to eq([])
    end
  end
end
