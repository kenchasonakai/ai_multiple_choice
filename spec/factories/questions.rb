FactoryBot.define do
  factory :question do
    exam_session
    text { "データベースの正規化について、正しいものはどれか。" }
    question_type { QuestionTypes::MULTIPLE_CHOICE }
    category { QuestionCategories::DATABASE }

    trait :essay do
      text { "第三正規形について説明せよ。" }
      question_type { QuestionTypes::ESSAY }
    end

    trait :network do
      text { "TCP/IPプロトコルについて説明せよ。" }
      category { QuestionCategories::NETWORK }
    end

    trait :security do
      text { "暗号化技術について説明せよ。" }
      category { QuestionCategories::SECURITY }
    end

    trait :with_multiple_choice do
      after(:create) do |question|
        create(:multiple_choice_question, question: question)
      end
    end

    trait :with_essay do
      essay
      after(:create) do |question|
        create(:essay_question, question: question)
      end
    end
  end
end
