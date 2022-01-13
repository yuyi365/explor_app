require 'rails_helper'

RSpec.describe "MembersOnlyArticles", type: :request do
  before do
    user = User.create(username: 'author')
    user.articles.create(title: 'Article 1', content: "Content 1\nparagraph 1", minutes_to_read: 10, is_member_only: true)
    user.articles.create(title: 'Article 2', content: "Content 2\nparagraph 1", minutes_to_read: 10, is_member_only: false)
    user.articles.create(title: 'Article 3', content: "Content 3\nparagraph 1", minutes_to_read: 10, is_member_only: true)
  end

  context 'when user is logged in' do  
    before do
      post '/login', params: { username: 'author' }
    end

    describe "GET /members_only_articles" do
      it 'returns an array of all articles' do
        get '/members_only_articles'
  
        expect(response.body).to include_json([
          { id: 3, title: 'Article 3', minutes_to_read: 10, author: 'author', preview: 'paragraph 1' },
          { id: 1, title: 'Article 1', minutes_to_read: 10, author: 'author', preview: 'paragraph 1' }
        ])
      end
    end

    describe "GET /members_only_articles/:id" do
      it 'returns the correct article' do
        get "/articles/#{Article.first.id}"
  
        expect(response.body).to include_json({ 
          id: 1, title: 'Article 1', minutes_to_read: 10, author: 'author', content: "Content 1\nparagraph 1" 
        })
      end
    end
  end

  context 'when user is not logged in' do
    describe "GET /members_only_articles" do
      it 'returns a 401 unauthorized status code' do
        get '/members_only_articles'
  
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an error message' do
        get '/members_only_articles'
  
        expect(response.body).to include_json({ error: "Not authorized" })
      end
    end

    describe "GET /members_only_articles/:id" do
      it 'returns a 401 unauthorized status code' do
        get "/members_only_articles/#{Article.first.id}"
  
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an error message' do
        get "/members_only_articles/#{Article.first.id}"
  
        expect(response.body).to include_json({ error: "Not authorized" })
      end
    end
  end
end
