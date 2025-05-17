
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FlashcardData, flashcardsData } from "@/data/flashcardsData";

const Flashcards = () => {
  const [currentDeck, setCurrentDeck] = useState("programming");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<string[]>([]);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredCards = flashcardsData.filter(card => card.deck === currentDeck);
  const currentCard = filteredCards[currentCardIndex];
  const progress = Math.round((reviewedCards.length / filteredCards.length) * 100);
  
  const isCompleted = reviewedCards.length === filteredCards.length && filteredCards.length > 0;
  
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleKnowCard = () => {
    if (isFlipped) {
      const id = currentCard.id;
      setKnownCards(prev => [...prev, id]);
      handleNextCard(id);
      toast({
        title: "Card marked as known",
        description: "Great job! This card will be reviewed less frequently.",
      });
    } else {
      toast({
        title: "Flip the card first",
        description: "Please review the answer before marking the card.",
        variant: "destructive",
      });
    }
  };
  
  const handleDontKnowCard = () => {
    if (isFlipped) {
      handleNextCard(currentCard.id);
      toast({
        title: "Card marked for review",
        description: "This card will appear again soon for practice.",
      });
    } else {
      toast({
        title: "Flip the card first",
        description: "Please review the answer before marking the card.",
        variant: "destructive",
      });
    }
  };
  
  const handleNextCard = (cardId: string) => {
    setReviewedCards(prev => [...prev, cardId]);
    
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else if (!isCompleted) {
      setCurrentCardIndex(0);
    }
    
    setIsFlipped(false);
  };
  
  const handleChangeTab = (value: string) => {
    setCurrentDeck(value);
    setCurrentCardIndex(0);
    setReviewedCards([]);
    setKnownCards([]);
    setIsFlipped(false);
  };
  
  const resetDeck = () => {
    setCurrentCardIndex(0);
    setReviewedCards([]);
    setKnownCards([]);
    setIsFlipped(false);
    toast({
      title: "Deck reset",
      description: "All cards are ready for a new review session.",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Spaced Repetition Flashcards</h2>
        <p className="text-white/70">Review your cards to strengthen your memory</p>
      </div>
      
      <Tabs defaultValue="programming" value={currentDeck} onValueChange={handleChangeTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList className="bg-white/10 mb-4">
            <TabsTrigger 
              value="programming" 
              className="data-[state=active]:bg-neo-blue/20 data-[state=active]:text-neo-blue"
            >
              Programming
            </TabsTrigger>
            <TabsTrigger 
              value="languages" 
              className="data-[state=active]:bg-neo-blue/20 data-[state=active]:text-neo-blue"
            >
              Languages
            </TabsTrigger>
            <TabsTrigger 
              value="science" 
              className="data-[state=active]:bg-neo-blue/20 data-[state=active]:text-neo-blue"
            >
              Science
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/70">
              {reviewedCards.length}/{filteredCards.length} cards
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetDeck} 
              className="border-white/20 text-white/70 hover:bg-white/10"
            >
              Reset
            </Button>
          </div>
        </div>
        
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-neo-blue transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {filteredCards.length > 0 && !isCompleted && (
          <div className="w-full max-w-2xl mx-auto">
            <div 
              className={`flip-card ${isFlipped ? 'flipped' : ''} w-full aspect-[3/2] cursor-pointer`}
              onClick={handleCardClick}
            >
              <div className="flip-card-inner w-full h-full relative">
                {/* Card Front */}
                <div className="flip-card-front absolute w-full h-full neo-card flex flex-col items-center justify-center p-8 text-center">
                  <CardHeader>
                    <CardTitle className="text-white/70 text-sm">Question</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center flex-1">
                    <h3 className="text-2xl font-medium text-white">{currentCard.question}</h3>
                  </CardContent>
                  <CardFooter className="w-full border-t border-white/10 pt-4">
                    <p className="text-white/50 text-sm w-full text-center">
                      Click to reveal answer
                    </p>
                  </CardFooter>
                </div>
                
                {/* Card Back */}
                <div className="flip-card-back absolute w-full h-full neo-card flex flex-col items-center justify-center p-8 text-center">
                  <CardHeader>
                    <CardTitle className="text-white/70 text-sm">Answer</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center flex-1">
                    <h3 className="text-2xl font-medium text-white">{currentCard.answer}</h3>
                  </CardContent>
                  <CardFooter className="w-full border-t border-white/10 pt-4">
                    <p className="text-white/50 text-sm w-full text-center">
                      Click to see the question
                    </p>
                  </CardFooter>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <Button 
                variant="outline" 
                onClick={handleDontKnowCard} 
                className="bg-transparent border border-red-500/50 text-white hover:bg-red-500/10 hover:border-red-500"
              >
                <ThumbsDown className="mr-2 h-4 w-4" /> Don't Know
              </Button>
              
              <Button 
                onClick={handleKnowCard} 
                className="bg-neo-green/20 border border-neo-green/50 text-white hover:bg-neo-green/30"
              >
                <ThumbsUp className="mr-2 h-4 w-4" /> Know
              </Button>
            </div>
          </div>
        )}
        
        {isCompleted && (
          <Card className="neo-card w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-center">Deck Completed!</CardTitle>
              <CardDescription className="text-white/70 text-center">
                You've reviewed all {filteredCards.length} cards
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="py-6">
                <div className="text-5xl font-bold text-neo-green mb-4">
                  {Math.round((knownCards.length / filteredCards.length) * 100)}%
                </div>
                <p className="text-white/70 mb-4">Knowledge strength</p>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neo-green transition-all duration-500"
                    style={{ width: `${(knownCards.length / filteredCards.length) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={resetDeck} 
                className="w-full bg-neo-blue/20 border border-neo-blue/50 text-white hover:bg-neo-blue/30"
              >
                Review Again
              </Button>
            </CardFooter>
          </Card>
        )}
      </Tabs>
      
      <div className="mt-8">
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-white text-lg">Flashcard Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-neo-blue mb-1">
                  {flashcardsData.filter(card => card.deck === currentDeck).length}
                </div>
                <p className="text-white/70 text-sm">Total Cards</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-neo-purple mb-1">
                  {knownCards.length}
                </div>
                <p className="text-white/70 text-sm">Known Cards</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-neo-green mb-1">14</div>
                <p className="text-white/70 text-sm">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Flashcards;
