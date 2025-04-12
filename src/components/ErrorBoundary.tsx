
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, Frown } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // In a production app, you might log this to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }
  
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default error UI
      return (
        <div className="min-h-[300px] p-6 flex items-center justify-center">
          <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <div className="mb-4">
              <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                <Frown className="h-8 w-8 text-red-500" />
              </div>
            </div>
            
            <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/30">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>
                {this.state.error?.message || "An unexpected error occurred."}
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col space-y-2">
              <Button onClick={this.handleReset} className="metalink-button">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="text-slate-300 border-slate-700 bg-slate-800/50"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
