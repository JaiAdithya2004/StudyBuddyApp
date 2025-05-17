
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Notes = () => {
  const [markdown, setMarkdown] = useState('# Welcome to NeoLearn Markdown Editor\n\n## Features\n\n- Real-time preview\n- **Bold** and *italic* formatting\n- [Links](https://example.com)\n- Code blocks\n\n```javascript\nfunction helloWorld() {\n  console.log("Hello, world!");\n}\n```\n\n> Blockquotes for important information\n\n### Lists\n\n1. First item\n2. Second item\n3. Third item\n\n- Unordered list\n- Another item\n- And another');
  
  // This is a placeholder for actual markdown parsing functionality
  // In a real implementation, you would use a library like react-markdown
  const renderMarkdown = (text: string) => {
    return (
      <div className="markdown-preview">
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: text
              .replace(/^# (.*)/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
              .replace(/^## (.*)/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
              .replace(/^### (.*)/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
              .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*)\*/g, '<em>$1</em>')
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-neo-blue hover:underline">$1</a>')
              .replace(/^> (.*)/gm, '<blockquote class="border-l-4 border-neo-blue pl-4 italic my-2">$1</blockquote>')
              .replace(/`([^`]+)`/g, '<code class="bg-white/10 rounded px-1">$1</code>')
              .replace(/```([\s\S]*?)```/g, '<pre class="bg-white/10 p-3 rounded my-3 overflow-x-auto"><code>$1</code></pre>')
              .replace(/^- (.*)/gm, '<li class="ml-6 list-disc">$1</li>')
              .replace(/^(\d+)\. (.*)/gm, '<li class="ml-6 list-decimal">$2</li>')
              .replace(/<\/li>\n<li/g, '</li><li')
              .replace(/\n\n/g, '<p></p>')
          }}
        />
      </div>
    );
  };
  
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gradient mb-2">Markdown Note Editor</h2>
          <p className="text-white/70">Create and edit your notes with live preview</p>
        </div>
        <Button className="bg-neo-blue text-white hover:bg-neo-blue/80">Save Note</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="neo-card h-[70vh] flex flex-col">
          <CardContent className="p-0 flex-1">
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-full p-4 bg-transparent focus:ring-0 focus:outline-none text-white font-jetbrains resize-none border-none"
              placeholder="Enter your markdown here..."
            />
          </CardContent>
        </Card>
        
        <Card className="neo-card h-[70vh] overflow-auto">
          <CardContent className="p-4">
            {renderMarkdown(markdown)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notes;
