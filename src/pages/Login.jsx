import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
      <AuthForm isLogin={true} />
    </div>
  );
};

export default Login;