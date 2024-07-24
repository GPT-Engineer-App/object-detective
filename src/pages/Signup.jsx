import React from 'react';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
      <AuthForm isLogin={false} />
    </div>
  );
};

export default Signup;