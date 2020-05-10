class MessagesController < ApplicationController
  
  def index
    @group = Group.find(1)
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

end
