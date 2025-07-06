class ApplicationController < ActionController::API
  private

  def render_success(data = nil, message = nil)
    render json: {
      data: data,
      success: true,
      message: message
    }
  end

  def render_error(message, status = :unprocessable_entity, errors = nil)
    render json: {
      data: nil,
      success: false,
      message: message,
      errors: errors
    }, status: status
  end
end
