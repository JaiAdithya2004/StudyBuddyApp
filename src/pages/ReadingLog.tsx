
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, SortAsc, SortDesc } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  status: "completed" | "in-progress" | "not-started";
  dateAdded: string;
  pagesRead: number;
  totalPages: number;
}

// Mock reading log data
const initialBooks: Book[] = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    rating: 5,
    status: "completed",
    dateAdded: "2024-01-15",
    pagesRead: 464,
    totalPages: 464,
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    rating: 4,
    status: "in-progress",
    dateAdded: "2024-02-03",
    pagesRead: 230,
    totalPages: 352,
  },
  {
    id: "3",
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    rating: 5,
    status: "completed",
    dateAdded: "2023-11-20",
    pagesRead: 416,
    totalPages: 416,
  },
  {
    id: "4",
    title: "Deep Work",
    author: "Cal Newport",
    rating: 4,
    status: "in-progress",
    dateAdded: "2024-04-05",
    pagesRead: 145,
    totalPages: 296,
  },
  {
    id: "5",
    title: "The Art of Computer Programming, Vol. 1",
    author: "Donald Knuth",
    rating: 0,
    status: "not-started",
    dateAdded: "2024-05-01",
    pagesRead: 0,
    totalPages: 672,
  },
];

const ReadingLog = () => {
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Book>("dateAdded");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedBooks = [...books]
    .filter((book) => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key: keyof Book) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const toggleStatus = (id: string) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id === id) {
          const statusOrder = ["not-started", "in-progress", "completed"];
          const currentIndex = statusOrder.indexOf(book.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          const newStatus = statusOrder[nextIndex] as "not-started" | "in-progress" | "completed";
          
          // If moving to completed, update pagesRead to equal totalPages
          const pagesRead = newStatus === "completed" ? book.totalPages : book.pagesRead;
          
          return { ...book, status: newStatus, pagesRead };
        }
        return book;
      })
    );
  };

  // Render star rating
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400" : "text-white/20"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Reading Log</h2>
        <p className="text-white/70">Track and manage your reading progress</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>

        <Button className="bg-neo-purple text-white hover:bg-neo-purple/80">
          Add Book
        </Button>
      </div>

      <div className="rounded-lg border border-white/10 overflow-hidden">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-white/70">Title</TableHead>
                <TableHead className="text-white/70">
                  <div className="flex items-center">
                    <span>Author</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 ml-1"
                        >
                          {sortKey === "author" ? (
                            sortDirection === "asc" ? (
                              <SortAsc className="h-4 w-4" />
                            ) : (
                              <SortDesc className="h-4 w-4" />
                            )
                          ) : (
                            <SortAsc className="h-4 w-4 opacity-30" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-neo-black border-white/10"
                      >
                        <DropdownMenuItem onClick={() => handleSort("author")}>
                          Sort Ascending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortKey("author");
                            setSortDirection("desc");
                          }}
                        >
                          Sort Descending
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableHead>
                <TableHead className="text-white/70">
                  <div className="flex items-center">
                    <span>Rating</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 ml-1"
                        >
                          {sortKey === "rating" ? (
                            sortDirection === "asc" ? (
                              <SortAsc className="h-4 w-4" />
                            ) : (
                              <SortDesc className="h-4 w-4" />
                            )
                          ) : (
                            <SortAsc className="h-4 w-4 opacity-30" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-neo-black border-white/10"
                      >
                        <DropdownMenuItem onClick={() => handleSort("rating")}>
                          Sort Ascending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSortKey("rating");
                            setSortDirection("desc");
                          }}
                        >
                          Sort Descending
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableHead>
                <TableHead className="text-white/70">Status</TableHead>
                <TableHead className="text-white/70">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBooks.map((book) => (
                <TableRow
                  key={book.id}
                  className="hover:bg-white/5 border-white/10"
                >
                  <TableCell className="font-medium text-white">
                    {book.title}
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <StarRating rating={book.rating} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`text-xs ${
                        book.status === "completed"
                          ? "bg-neo-green/10 border-neo-green/50 text-neo-green"
                          : book.status === "in-progress"
                          ? "bg-neo-blue/10 border-neo-blue/50 text-neo-blue"
                          : "bg-white/5 border-white/10 text-white/70"
                      }`}
                      onClick={() => toggleStatus(book.id)}
                    >
                      {book.status === "completed"
                        ? "Completed"
                        : book.status === "in-progress"
                        ? "In Progress"
                        : "Not Started"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full max-w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            book.status === "completed"
                              ? "bg-neo-green"
                              : "bg-neo-blue"
                          }`}
                          style={{
                            width: `${
                              (book.pagesRead / book.totalPages) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-white/70">
                        {Math.round((book.pagesRead / book.totalPages) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReadingLog;
