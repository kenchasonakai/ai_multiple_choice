FactoryBot.define do
  factory :multiple_choice_question do
    association :question, question_type: QuestionTypes::MULTIPLE_CHOICE
    options do
      [
        "第1正規形は、繰り返し項目を排除した形である",
        "第2正規形は、部分関数従属を排除した形である",
        "第3正規形は、推移関数従属を排除した形である",
        "すべての正規形において、データの冗長性は完全に排除される"
      ]
    end
    correct_answer { 2 }

    trait :network_question do
      association :question, question_type: QuestionTypes::MULTIPLE_CHOICE, category: QuestionCategories::NETWORK
      options do
        [
          "TCP は信頼性の高い通信プロトコルである",
          "UDP は信頼性の高い通信プロトコルである",
          "HTTP は物理層のプロトコルである",
          "IP は暗号化機能を持つプロトコルである"
        ]
      end
      correct_answer { 0 }
    end

    trait :security_question do
      association :question, question_type: QuestionTypes::MULTIPLE_CHOICE, category: QuestionCategories::SECURITY
      options do
        [
          "共通鍵暗号は公開鍵暗号より高速である",
          "公開鍵暗号は共通鍵暗号より高速である",
          "ハッシュ関数は可逆的な関数である",
          "デジタル署名は暗号化と同じ技術である"
        ]
      end
      correct_answer { 0 }
    end
  end
end
