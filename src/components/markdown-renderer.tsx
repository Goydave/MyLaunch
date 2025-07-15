// src/components/markdown-renderer.tsx
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderText = () => {
    // Split by the bold markdown (e.g., **text**)
    const parts = content.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // It's a bold part, remove the asterisks and wrap in <strong>
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      // It's a regular text part
      return part;
    });
  };

  return <>{renderText()}</>;
}
