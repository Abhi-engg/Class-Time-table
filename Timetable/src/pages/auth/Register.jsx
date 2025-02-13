import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Card from '../../components/common/Card';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    department: '',
    year: '',
    className: '',
    rollNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const departmentOptions = [
    { value: 'Comps', label: 'Computer Engineering' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'AIML', label: 'AIML' },
    { value: 'Data', label: 'Data Engineering' },
    { value: 'civil', label: 'Civil'}
  ];

  const yearOptions = [
    { value: 'FE', label: 'First Year' },
    { value: 'SE', label: 'Second Year' },
    { value: 'TE', label: 'Third Year' },
    { value: 'BE', label: 'Fourth Year' }
  ];
 
  const classOption = [
    { value: 'FE', label: 'First Year' },
    { value: 'SE', label: 'Second Year' },
    { value: 'TE', label: 'Third Year' },
    { value: 'BE', label: 'Fourth Year' }
  ];
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              sign in to your account
            </button>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Select
            label="Department"
            options={departmentOptions}
            value={formData.department}
            onChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
            placeholder="Select Department"
          />

          <Select
            label="Year"
            options={yearOptions}
            value={formData.year}
            onChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
            placeholder="Select Year"
          />

          <Select
          />

          <Input
            label="Roll Number"
            value={formData.rollNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
            placeholder="Enter your roll number"
          />

          <Input
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
          />

          <Input
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Create a password"
          />

          <Input
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm your password"
            error={error}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={loading}
          >
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register; 