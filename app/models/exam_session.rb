class ExamSession < ApplicationRecord
  has_many :questions, dependent: :destroy

  validates :slug, presence: true, uniqueness: true
  validates :year, :period, :subject_slug, :subject_name, presence: true

  scope :by_year, ->(year) { where(year: year) }
  scope :by_subject, ->(subject_slug) { where(subject_slug: subject_slug) }
end
