import React from 'react';

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const renderContent = () => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={elements.length} className="list-disc list-inside space-y-2 text-slate-700 mb-6 ml-4">
            {currentList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushTable = () => {
      if (inTable && tableHeaders.length > 0) {
        elements.push(
          <div key={elements.length} className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  {tableHeaders.map((header, idx) => (
                    <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tableRows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-3 text-sm text-slate-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        flushList();
        flushTable();
        return;
      }

      if (trimmedLine.startsWith('## ')) {
        flushList();
        flushTable();
        elements.push(
          <h2 key={elements.length} className="text-3xl font-bold text-slate-900 mt-12 mb-6">
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushList();
        flushTable();
        elements.push(
          <h3 key={elements.length} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('#### ')) {
        flushList();
        flushTable();
        elements.push(
          <h4 key={elements.length} className="text-xl font-bold text-slate-900 mt-6 mb-3">
            {trimmedLine.substring(5)}
          </h4>
        );
      } else if (trimmedLine.startsWith('- ✅')) {
        flushTable();
        currentList.push(trimmedLine.substring(4).trim());
      } else if (trimmedLine.startsWith('- ')) {
        flushTable();
        currentList.push(trimmedLine.substring(2));
      } else if (trimmedLine.startsWith('|')) {
        flushList();
        const cells = trimmedLine.split('|').map(cell => cell.trim()).filter(cell => cell);

        if (!inTable) {
          tableHeaders = cells;
          inTable = true;
        } else if (cells.some(cell => cell.includes('-'))) {
          return;
        } else {
          tableRows.push(cells);
        }
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        flushList();
        flushTable();
        elements.push(
          <p key={elements.length} className="text-lg font-bold text-slate-900 mb-4 mt-6">
            {trimmedLine.substring(2, trimmedLine.length - 2)}
          </p>
        );
      } else {
        flushList();
        flushTable();
        const formattedText = trimmedLine
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-orange-600 hover:text-orange-700 underline">$1</a>');

        elements.push(
          <p key={elements.length} className="text-slate-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
      }
    });

    flushList();
    flushTable();

    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent()}
    </div>
  );
};

export default BlogContent;
