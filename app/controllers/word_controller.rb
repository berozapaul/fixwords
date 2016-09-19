class WordController < ApplicationController
  def index
  end

  def firststage
    @words = Word.where( :level => 1);
  end

  def secondstage
  end

  def thirdstage
  end
end
