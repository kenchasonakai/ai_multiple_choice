FactoryBot.define do
  factory :exam_session do
    sequence(:slug) { |n| "2023-spring-subject-a-#{n}" }
    year { "2023" }
    period { "2023年度春期" }
    subject_slug { "subject-a" }
    subject_name { "科目A" }
    subject_description { "多肢選択式" }

    trait :subject_b do
      sequence(:slug) { |n| "2023-spring-subject-b-#{n}" }
      subject_slug { "subject-b" }
      subject_name { "科目B" }
      subject_description { "多肢選択式・記述式" }
    end

    trait :autumn do
      sequence(:slug) { |n| "2023-autumn-subject-a-#{n}" }
      period { "2023年度秋期" }
    end

    trait :with_questions do
      after(:create) do |exam_session|
        create_list(:question, 3, exam_session: exam_session)
      end
    end
  end
end