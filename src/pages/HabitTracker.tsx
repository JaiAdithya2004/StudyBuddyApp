
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Habit {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
}

// Mock habit data
const initialHabits: Habit[] = [
  { id: '1', name: 'Study 30 minutes', completed: false, streak: 7 },
  { id: '2', name: 'Complete 10 flashcards', completed: false, streak: 14 },
  { id: '3', name: 'Read 20 pages', completed: false, streak: 5 },
  { id: '4', name: 'Practice coding', completed: false, streak: 21 },
  { id: '5', name: 'Take notes on lecture', completed: false, streak: 3 },
];

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const { toast } = useToast();
  
  const completedCount = habits.filter(habit => habit.completed).length;
  const progress = (completedCount / habits.length) * 100;
  
  const toggleHabit = (id: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id 
          ? { 
              ...habit, 
              completed: !habit.completed,
              streak: !habit.completed ? habit.streak + 1 : habit.streak - 1
            } 
          : habit
      )
    );
    
    const habit = habits.find(h => h.id === id);
    if (habit) {
      if (!habit.completed) {
        toast({
          title: `${habit.name} completed!`,
          description: `Streak increased to ${habit.streak + 1} days.`,
        });
      } else {
        toast({
          title: `${habit.name} unmarked`,
          description: `Streak decreased to ${habit.streak - 1} days.`,
          variant: "destructive",
        });
      }
    }
  };
  
  const resetHabits = () => {
    setHabits(initialHabits);
    toast({
      title: "Habits reset",
      description: "All habits have been reset for today.",
    });
  };
  
  return (
    <div className="container mx-auto max-w-3xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">Daily Habit Tracker</h2>
          <p className="text-white/70">Build consistent learning habits</p>
        </div>
        <Button 
          variant="outline"
          className="border-white/10 text-white/70 hover:bg-white/10"
          onClick={resetHabits}
        >
          Reset
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-full flex items-center">
          <div className="h-full w-2 bg-white/10 rounded-full overflow-hidden relative">
            <div 
              className="absolute bottom-0 w-full bg-neo-green transition-all duration-500"
              style={{ height: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex-1 ml-4">
          <p className="text-white font-medium">Daily Progress</p>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">{completedCount} of {habits.length} complete</span>
            <span className="text-white/70">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mt-2 bg-white/10" indicatorClassName="bg-neo-green" />
        </div>
      </div>
      
      <div className="space-y-4">
        {habits.map(habit => (
          <Card 
            key={habit.id} 
            className={`neo-card transition-all duration-300 ${
              habit.completed ? 'border-neo-green/30 bg-gradient-to-br from-neo-green/5 to-transparent' : ''
            }`}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox 
                  checked={habit.completed} 
                  onCheckedChange={() => toggleHabit(habit.id)} 
                  className={`mr-3 ${
                    habit.completed ? 'bg-neo-green text-white border-neo-green' : 'border-white/30'
                  }`}
                />
                <div>
                  <p className={`font-medium ${habit.completed ? 'text-white' : 'text-white/80'}`}>
                    {habit.name}
                  </p>
                  <p className="text-white/50 text-sm">{habit.streak} day streak</p>
                </div>
              </div>
              
              <div className="flex items-center">
                {habit.completed && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neo-green/20 text-neo-green">
                    Completed
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="neo-card">
        <CardHeader>
          <CardTitle className="text-white text-lg">Streak Summary</CardTitle>
          <CardDescription className="text-white/70">
            Your longest streak is {Math.max(...habits.map(h => h.streak))} days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-1">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 space-y-1">
                <div 
                  className={`h-20 w-full rounded-md ${
                    i < 5 ? 'bg-neo-green/20 border border-neo-green/30' : 'bg-white/10'
                  }`}
                />
                <div className="text-center text-xs text-white/50">
                  {new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitTracker;
