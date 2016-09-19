require 'test_helper'

class WordControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get firststage" do
    get :firststage
    assert_response :success
  end

  test "should get secondstage" do
    get :secondstage
    assert_response :success
  end

  test "should get thirdstage" do
    get :thirdstage
    assert_response :success
  end

end
