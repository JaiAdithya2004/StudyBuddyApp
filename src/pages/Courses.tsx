
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, Clock, Search, Star, Users } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  rating: number;
  students: number;
  completed: boolean;
}

// Mock course data
const courseData: Course[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the core concepts of JavaScript programming including variables, functions, objects, and more.',
    duration: 240,
    difficulty: 'beginner',
    category: 'Programming',
    rating: 4.5,
    students: 12350,
    completed: false,
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns including hooks, context, custom hooks, and performance optimization.',
    duration: 360,
    difficulty: 'advanced',
    category: 'Programming',
    rating: 4.8,
    students: 8720,
    completed: false,
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    description: 'Comprehensive guide to data structures and algorithms with practical examples.',
    duration: 480,
    difficulty: 'intermediate',
    category: 'Computer Science',
    rating: 4.7,
    students: 15600,
    completed: false,
  },
  {
    id: '4',
    title: 'Machine Learning Basics',
    description: 'Introduction to machine learning concepts, algorithms, and practical applications.',
    duration: 300,
    difficulty: 'intermediate',
    category: 'Data Science',
    rating: 4.6,
    students: 9340,
    completed: false,
  },
  {
    id: '5',
    title: 'UX/UI Design Principles',
    description: 'Learn the fundamental principles of user experience and interface design.',
    duration: 210,
    difficulty: 'beginner',
    category: 'Design',
    rating: 4.3,
    students: 7820,
    completed: false,
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  
  const categories = Array.from(new Set(courseData.map(course => course.category)));
  
  const filteredCourses = courseData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesDuration = durationFilter === 'all' || 
                            (durationFilter === 'short' && course.duration <= 240) ||
                            (durationFilter === 'medium' && course.duration > 240 && course.duration <= 360) ||
                            (durationFilter === 'long' && course.duration > 360);
                            
    return matchesSearch && matchesDifficulty && matchesCategory && matchesDuration;
  });
  
  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Course Explorer</h2>
        <p className="text-white/70">Discover your next learning adventure</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-neo-black border-white/10">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-neo-black border-white/10">
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={durationFilter} onValueChange={setDurationFilter}>
            <SelectTrigger className="bg-white/5 border-white/10">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent className="bg-neo-black border-white/10">
              <SelectItem value="all">Any Duration</SelectItem>
              <SelectItem value="short">Short (≤ 4h)</SelectItem>
              <SelectItem value="medium">Medium (4-6h)</SelectItem>
              <SelectItem value="long">Long (> 6h)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <Card key={course.id} className="neo-card group hover:border-neo-purple/50 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={`
                    ${course.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                      course.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' :
                      'bg-red-500/20 text-red-400 border-red-500/50'}
                    border
                  `}>
                    {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                  </Badge>
                  <Badge className="bg-neo-blue/20 text-neo-blue border border-neo-blue/50">
                    {course.category}
                  </Badge>
                </div>
                <CardTitle className="text-white mt-2 group-hover:text-neo-purple transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-white/70 line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex items-center text-white/70 text-sm space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-white/5 hover:bg-neo-purple/20 border border-white/10 hover:border-neo-purple/50 transition-all duration-300">
                  {course.completed ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Completed
                    </>
                  ) : (
                    'Start Course'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-white/70 text-lg">No courses found matching your filters.</p>
            <Button 
              variant="outline" 
              className="mt-4 border-white/10 text-white/70 hover:bg-white/5"
              onClick={() => {
                setSearchTerm('');
                setDifficultyFilter('all');
                setCategoryFilter('all');
                setDurationFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
