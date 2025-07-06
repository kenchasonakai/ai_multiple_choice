# 試験セッションのサンプルデータ作成

# 2023年春期科目A
session_2023_spring_a = ExamSession.find_or_create_by!(slug: "2023-spring-subject-a") do |session|
  session.year = "2023"
  session.period = "2023年度春期"
  session.subject_slug = "subject-a"
  session.subject_name = "科目A"
  session.subject_description = "多肢選択式"
end

# データベース問題
question1 = Question.find_or_create_by!(exam_session: session_2023_spring_a, text: "データベースの正規化に関する説明として、最も適切なものはどれか。") do |q|
  q.question_type = QuestionTypes::MULTIPLE_CHOICE
  q.category = QuestionCategories::DATABASE
end

MultipleChoiceQuestion.find_or_create_by!(question: question1) do |mcq|
  mcq.options = [
    "第1正規形は、繰り返し項目を排除した形である",
    "第2正規形は、部分関数従属を排除した形である",
    "第3正規形は、推移関数従属を排除した形である",
    "すべての正規形において、データの冗長性は完全に排除される"
  ]
  mcq.correct_answer = 2
end

# ネットワーク問題
question2 = Question.find_or_create_by!(exam_session: session_2023_spring_a, text: "OSI参照モデルの物理層で規定される内容として、最も適切なものはどれか。") do |q|
  q.question_type = QuestionTypes::MULTIPLE_CHOICE
  q.category = QuestionCategories::NETWORK
end

MultipleChoiceQuestion.find_or_create_by!(question: question2) do |mcq|
  mcq.options = [
    "データの暗号化方式",
    "IPアドレスの割り当て方法",
    "ケーブルのコネクタ形状",
    "HTTPプロトコルの仕様"
  ]
  mcq.correct_answer = 2
end

# アルゴリズム問題
question3 = Question.find_or_create_by!(exam_session: session_2023_spring_a, text: "アルゴリズムの計算量について、O(n²)で表される処理として最も適切なものはどれか。") do |q|
  q.question_type = QuestionTypes::MULTIPLE_CHOICE
  q.category = QuestionCategories::ALGORITHM
end

MultipleChoiceQuestion.find_or_create_by!(question: question3) do |mcq|
  mcq.options = [
    "二分探索",
    "バブルソート",
    "線形探索",
    "クイックソート（最良の場合）"
  ]
  mcq.correct_answer = 1
end

# 2023年春期科目B
session_2023_spring_b = ExamSession.find_or_create_by!(slug: "2023-spring-subject-b") do |session|
  session.year = "2023"
  session.period = "2023年度春期"
  session.subject_slug = "subject-b"
  session.subject_name = "科目B"
  session.subject_description = "多肢選択式・記述式"
end

# プログラミング問題
question4 = Question.find_or_create_by!(exam_session: session_2023_spring_b, text: "次のプログラムを実行したとき、変数xの値はいくつになるか。\n\n```\nint x = 0;\nfor (int i = 1; i <= 5; i++) {\n    x += i * 2;\n}\n```") do |q|
  q.question_type = QuestionTypes::MULTIPLE_CHOICE
  q.category = QuestionCategories::PROGRAMMING
end

MultipleChoiceQuestion.find_or_create_by!(question: question4) do |mcq|
  mcq.options = [ "15", "25", "30", "50" ]
  mcq.correct_answer = 2
end

# セキュリティ問題
question5 = Question.find_or_create_by!(exam_session: session_2023_spring_b, text: "情報セキュリティの3要素（CIA）について、「完全性（Integrity）」の説明として最も適切なものはどれか。") do |q|
  q.question_type = QuestionTypes::MULTIPLE_CHOICE
  q.category = QuestionCategories::SECURITY
end

MultipleChoiceQuestion.find_or_create_by!(question: question5) do |mcq|
  mcq.options = [
    "情報が許可された人だけがアクセスできること",
    "情報が改ざんされていないこと",
    "システムが必要なときに利用できること",
    "情報の出所が明確であること"
  ]
  mcq.correct_answer = 1
end

# 2022年春期科目A
session_2022_spring_a = ExamSession.find_or_create_by!(slug: "2022-spring-subject-a") do |session|
  session.year = "2022"
  session.period = "2022年度春期"
  session.subject_slug = "subject-a"
  session.subject_name = "科目A"
  session.subject_description = "多肢選択式"
end

# コンピュータシステム問題
question6 = Question.find_or_create_by!(exam_session: session_2022_spring_a, text: "CPUのキャッシュメモリに関する説明として、最も適切なものはどれか。") do |q|
  q.question_type = QuestionTypes::MULTIPLE_CHOICE
  q.category = QuestionCategories::COMPUTER_COMPONENTS
end

MultipleChoiceQuestion.find_or_create_by!(question: question6) do |mcq|
  mcq.options = [
    "主記憶装置よりも容量が大きい",
    "主記憶装置よりもアクセス速度が速い",
    "二次記憶装置の一種である",
    "データの永続保存が可能である"
  ]
  mcq.correct_answer = 1
end

puts "✅ サンプルデータを作成しました"
puts "  - ExamSession: #{ExamSession.count}件"
puts "  - Question: #{Question.count}件"
puts "  - MultipleChoiceQuestion: #{MultipleChoiceQuestion.count}件"
