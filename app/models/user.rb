class User < ActiveRecord::Base
  attr_reader :password
  validates_presence_of :username, :session_token
  validates :username, uniqueness: true;
  validates :password_digest, presence: { message: "Password can't be blank" }
  validates :password, length: {minimum: 6, allow_nil: true}

  after_initialize :ensure_session_token

  has_many :user_lists
  has_many :lists, through: :user_lists, source: :list

  def reset_session_token
    self.session_token == User.generate_session_token
    self.save!
    self.session_token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end


  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end
end
