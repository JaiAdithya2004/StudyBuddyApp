
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpenCheck,
  FlaskConical, 
  GraduationCap,
  Play, 
  Plus 
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gradient">Welcome back</h2>
          <p className="text-white/70">Continue your learning journey</p>
        </div>
        <Button className="bg-neo-purple text-white hover:bg-neo-purple/80">
          <Plus className="mr-2 h-4 w-4" /> New Module
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-white">Flashcards Due Today</CardTitle>
            <CardDescription className="text-white/70">28 cards due for review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Memory strength</span>
                <span className="text-neo-blue">76%</span>
              </div>
              <Progress value={76} className="h-2 bg-white/10" indicatorClassName="bg-neo-blue" />
              <Link to="/flashcards">
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                  Start Review
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-white">Daily Habits</CardTitle>
            <CardDescription className="text-white/70">3/5 habits completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Progress</span>
                <span className="text-neo-green">60%</span>
              </div>
              <Progress value={60} className="h-2 bg-white/10" indicatorClassName="bg-neo-green" />
              <Link to="/habits">
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                  Check Habits
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-white">Continue Learning</CardTitle>
            <CardDescription className="text-white/70">Machine Learning Basics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Progress</span>
                <span className="text-neo-purple">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-white/10" indicatorClassName="bg-neo-purple" />
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                <Play className="mr-2 h-4 w-4" /> Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="neo-card md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/5">
                <div className="w-10 h-10 rounded-full bg-neo-blue/20 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-neo-blue" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white">Completed Flashcard Session</h4>
                  <p className="text-white/50 text-sm">25 cards reviewed • 80% accuracy</p>
                </div>
                <span className="text-white/50 text-sm">2h ago</span>
              </div>
              
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/5">
                <div className="w-10 h-10 rounded-full bg-neo-purple/20 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5 text-neo-purple" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white">Took Python Basics Quiz</h4>
                  <p className="text-white/50 text-sm">Score: 8/10 • Medium difficulty</p>
                </div>
                <span className="text-white/50 text-sm">Yesterday</span>
              </div>
              
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/5">
                <div className="w-10 h-10 rounded-full bg-neo-green/20 flex items-center justify-center">
                  <BookOpenCheck className="h-5 w-5 text-neo-green" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white">Added "Clean Code" to Reading Log</h4>
                  <p className="text-white/50 text-sm">Started reading • 12% complete</p>
                </div>
                <span className="text-white/50 text-sm">2d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="neo-card">
          <CardHeader>
            <CardTitle className="text-white">Learning Streak</CardTitle>
            <CardDescription className="text-white/70">Keep up the momentum!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-primary-gradient mb-2">14</div>
              <p className="text-white/70">days</p>
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full ${i < 6 ? 'bg-neo-blue/50 glow-border' : 'bg-white/20'} flex items-center justify-center text-xs`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
