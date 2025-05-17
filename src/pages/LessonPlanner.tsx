
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LessonPlanner = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Timeline Lesson Tracker</h2>
        <p className="text-white/70">Drag-and-drop rescheduling of lessons</p>
      </div>
      
      <Card className="neo-card">
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-white mb-4">Lesson Planner</h3>
            <p className="text-white/70">
              This feature will be implemented in the next phase. The lesson planner will include:
            </p>
            <ul className="list-disc text-left max-w-md mx-auto mt-4 space-y-2 text-white/70">
              <li>Drag-and-drop rescheduling with animation</li>
              <li>Color-coded lessons by urgency</li>
              <li>Mini calendar view for month planning</li>
              <li>Progress tracking across multiple courses</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonPlanner;
