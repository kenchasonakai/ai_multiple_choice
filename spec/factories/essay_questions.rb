FactoryBot.define do
  factory :essay_question do
    association :question, question_type: QuestionTypes::ESSAY
    answer_criteria do
      {
        required_keywords: ["正規化", "第三正規形", "推移関数従属"],
        prohibited_keywords: ["非正規化"],
        scoring_weights: {
          concept_understanding: 0.4,
          technical_accuracy: 0.3,
          explanation_clarity: 0.3
        }
      }
    end
    sample_answers do
      {
        perfect_answer: "第三正規形は、第二正規形の条件を満たしつつ、推移関数従属を排除した形である。",
        good_answers: [
          "正規化の第三段階で、推移関数従属をなくすことで、データの冗長性を減らす。",
          "第三正規形では、非キー属性が主キー以外の属性に依存しないようにする。"
        ]
      }
    end
    evaluation_rubric do
      {
        criteria: [
          {
            name: "concept_understanding",
            description: "正規化の概念理解"
          },
          {
            name: "technical_accuracy",
            description: "技術的な正確性"
          },
          {
            name: "explanation_clarity",
            description: "説明の明瞭さ"
          }
        ]
      }
    end
    min_length { 50 }
    max_length { 300 }

    trait :network_question do
      association :question, question_type: QuestionTypes::ESSAY, category: QuestionCategories::NETWORK
      answer_criteria do
        {
          required_keywords: ["TCP", "UDP", "プロトコル"],
          prohibited_keywords: ["間違い"],
          scoring_weights: {
            concept_understanding: 0.5,
            technical_accuracy: 0.3,
            explanation_clarity: 0.2
          }
        }
      end
      sample_answers do
        {
          perfect_answer: "TCPは信頼性の高い通信プロトコルで、データの順序保証と再送機能を持つ。",
          good_answers: [
            "TCPはコネクション型プロトコルで、データの到達保証がある。",
            "UDPは高速だが信頼性は低く、リアルタイム通信に適している。"
          ]
        }
      end
    end

    trait :security_question do
      association :question, question_type: QuestionTypes::ESSAY, category: QuestionCategories::SECURITY
      answer_criteria do
        {
          required_keywords: ["暗号化", "セキュリティ"],
          prohibited_keywords: ["脆弱"],
          scoring_weights: {
            concept_understanding: 0.4,
            technical_accuracy: 0.4,
            explanation_clarity: 0.2
          }
        }
      end
      min_length { 30 }
      max_length { 200 }
    end
  end
end