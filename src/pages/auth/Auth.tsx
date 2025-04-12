import { LoginForm, RegisterForm } from '../../components/auth/AuthForms';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AuthPage = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isLoginPage = location.pathname === '/login';

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        {isLoginPage ? <LoginForm /> : <RegisterForm />}
        <p className="text-center mt-4">
          {isLoginPage ? (
            <>Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></>
          ) : (
            <>Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;