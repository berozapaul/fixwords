class WordController < ApplicationController
  def index
  end

  def firststage
    @words = Word.where( :level => 1);
  end

  def secondstage
    @words = Word.where( :level => 2);
  end

  def thirdstage
  end
end
