import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, Frown, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    
    // Update state with error info
    this.setState({
      errorInfo
    });
  }
  
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-metalink-blue">
          <div className="max-w-md w-full">
            <Alert variant="destructive" className="bg-slate-800/50 border-slate-700">
              <Frown className="h-4 w-4 text-red-500" />
              <AlertTitle className="text-white">Something went wrong</AlertTitle>
              <AlertDescription className="text-slate-300">
                {this.state.error?.message || "An unexpected error occurred."}
                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <pre className="mt-4 text-xs overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </AlertDescription>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  onClick={this.handleReset}
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Link to="/">
                  <Button
                    variant="outline"
                    className="flex items-center gap-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <Home className="h-4 w-4" />
                    Go Home
                  </Button>
                </Link>
              </div>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
