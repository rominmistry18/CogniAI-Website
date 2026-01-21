import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            {title.split(" ").map((word, i) => (
              i === title.split(" ").length - 1 ? (
                <span key={i} className="gradient-text">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            ))}
          </h1>
          {description && (
            <p className="text-xl text-muted-foreground mb-8">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
