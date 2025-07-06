class Api::ExamSessionsController < ApplicationController
  before_action :set_exam_session, only: [ :show ]

  def index
    @exam_sessions = ExamSession.includes(:questions).order(:year, :period, :subject_slug)
    data = ExamSessionListResource.new(@exam_sessions).serializable_hash
    render_success(data)
  end

  def show
    data = ExamSessionResource.new(@exam_session).serializable_hash
    render_success(data)
  end

  private

  def set_exam_session
    @exam_session = ExamSession.includes(questions: [ :multiple_choice_question, :essay_question ])
                               .find_by(slug: params[:slug])

    if @exam_session.nil?
      render_error("Exam session not found: #{params[:slug]}", :not_found)
    end
  end
end
