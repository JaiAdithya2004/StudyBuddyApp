
export interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  deck: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: Date;
}

export const flashcardsData: FlashcardData[] = [
  {
    id: 'p1',
    question: 'What is a closure in JavaScript?',
    answer: 'A closure is a function that has access to its own scope, the scope of the outer function, and the global scope.',
    deck: 'programming',
    difficulty: 'medium',
  },
  {
    id: 'p2',
    question: 'What is the difference between == and === in JavaScript?',
    answer: '== compares values and performs type coercion, while === compares values and types without coercion.',
    deck: 'programming',
    difficulty: 'easy',
  },
  {
    id: 'p3',
    question: 'What is a Promise in JavaScript?',
    answer: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation.',
    deck: 'programming',
    difficulty: 'medium',
  },
  {
    id: 'p4',
    question: 'What is the purpose of useEffect in React?',
    answer: 'useEffect is a hook that lets you perform side effects in function components, similar to componentDidMount, componentDidUpdate, and componentWillUnmount in class components.',
    deck: 'programming',
    difficulty: 'medium',
  },
  {
    id: 'p5',
    question: 'What is the virtual DOM in React?',
    answer: 'The virtual DOM is a programming concept where a lightweight copy of the real DOM is kept in memory, and React uses it to improve performance by minimizing direct manipulation of the actual DOM.',
    deck: 'programming',
    difficulty: 'medium',
  },
  {
    id: 'p6',
    question: 'What is BigO notation?',
    answer: 'Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.',
    deck: 'programming',
    difficulty: 'hard',
  },
  {
    id: 'l1',
    question: 'Como estás? (Spanish)',
    answer: 'How are you?',
    deck: 'languages',
    difficulty: 'easy',
  },
  {
    id: 'l2',
    question: 'Comment allez-vous? (French)',
    answer: 'How are you?',
    deck: 'languages',
    difficulty: 'easy',
  },
  {
    id: 'l3',
    question: 'お元気ですか？ (Japanese)',
    answer: 'How are you?',
    deck: 'languages',
    difficulty: 'medium',
  },
  {
    id: 'l4',
    question: 'Wie geht es Ihnen? (German)',
    answer: 'How are you?',
    deck: 'languages',
    difficulty: 'easy',
  },
  {
    id: 's1',
    question: 'What is the law of conservation of energy?',
    answer: 'Energy can neither be created nor destroyed, only transformed from one form to another.',
    deck: 'science',
    difficulty: 'medium',
  },
  {
    id: 's2',
    question: 'What is the difference between mitosis and meiosis?',
    answer: 'Mitosis results in two genetically identical daughter cells, while meiosis results in four genetically diverse haploid cells.',
    deck: 'science',
    difficulty: 'hard',
  },
  {
    id: 's3',
    question: 'What is the function of DNA?',
    answer: 'DNA stores genetic information and instructions for protein synthesis, cell function, and heredity.',
    deck: 'science',
    difficulty: 'medium',
  },
  {
    id: 's4',
    question: 'What is the periodic law?',
    answer: 'The properties of elements recur periodically when arranged by increasing atomic number.',
    deck: 'science',
    difficulty: 'medium',
  },
];
