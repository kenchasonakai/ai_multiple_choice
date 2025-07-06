class Api::ExamSessionsController < ApplicationController
  before_action :set_exam_session, only: [:show]

  def index
    @exam_sessions = ExamSession.all.order(:year, :period, :subject_slug)
    render json: @exam_sessions.map { |session| ExamSessionListResource.new(session).serializable_hash }
  end

  def show
    render json: ExamSessionResource.new(@exam_session).serializable_hash
  end

  private

  def set_exam_session
    @exam_session = ExamSession.includes(questions: [:multiple_choice_question, :essay_question])
                               .find_by(slug: params[:slug])

    if @exam_session.nil?
      render json: {
        error: {
          code: 'not_found',
          message: "Exam session not found: #{params[:slug]}"
        }
      }, status: :not_found
    end
  end
end