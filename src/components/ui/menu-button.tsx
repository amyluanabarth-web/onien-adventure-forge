import * as React from "react";
import { cn } from "@/lib/utils";

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative w-full max-w-xs px-8 py-4 font-display text-lg tracking-widest uppercase",
          "border border-border bg-secondary/50 backdrop-blur-sm",
          "transition-all duration-300 ease-out",
          "hover:border-primary hover:bg-secondary",
          "hover:text-primary hover:text-glow-subtle",
          "hover:box-glow",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "active:scale-[0.98]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "primary" && "text-foreground",
          variant === "secondary" && "text-muted-foreground border-muted",
          className
        )}
        {...props}
      >
        {/* Corner decorations */}
        <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-primary/40 transition-all duration-300 group-hover:border-primary group-hover:w-4 group-hover:h-4" />
        <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-primary/40 transition-all duration-300 group-hover:border-primary group-hover:w-4 group-hover:h-4" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-primary/40 transition-all duration-300 group-hover:border-primary group-hover:w-4 group-hover:h-4" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary/40 transition-all duration-300 group-hover:border-primary group-hover:w-4 group-hover:h-4" />
        
        {children}
      </button>
    );
  }
);

MenuButton.displayName = "MenuButton";

export { MenuButton };
