
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import HabitTracker from "./pages/HabitTracker";
import Courses from "./pages/Courses";
import ReadingLog from "./pages/ReadingLog";
import Notes from "./pages/Notes";
import VideoLibrary from "./pages/VideoLibrary";
import LessonPlanner from "./pages/LessonPlanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="flashcards" element={<Flashcards />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="habits" element={<HabitTracker />} />
            <Route path="courses" element={<Courses />} />
            <Route path="reading" element={<ReadingLog />} />
            <Route path="notes" element={<Notes />} />
            <Route path="videos" element={<VideoLibrary />} />
            <Route path="lessons" element={<LessonPlanner />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
