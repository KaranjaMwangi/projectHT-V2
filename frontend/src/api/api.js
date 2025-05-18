import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:5000/api/auth';

// Create an Axios instance with default settings
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Set timeout for requests
});

// Function to handle errors and build comprehensive error responses
const buildErrorResponse = (error) => {
  const validationErrors = error.response?.data?.errors 
    ? Object.values(error.response.data.errors).join(', ')
    : null;

  return {
    status: error.response?.status || 500,
    message: validationErrors || 
             error.response?.data?.error || 
             error.message || 
             'Request failed',
    details: {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data ? JSON.parse(error.config.data) : null,
      serverResponse: error.response?.data,
    },
  };
};

// Function to register a user
export const registerUser = async (userData) => {
  try {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Name, email, and password are required');
    }

    console.log('Registering user with data:', userData);

    const response = await api.post('/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone?.trim() || null,
    });

    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Registration Error:', errorInfo);
    throw errorInfo;
  }
};

// Function to register a teacher
export const registerTeacher = async (teacherData) => {
  try {
    if (!teacherData.name || !teacherData.email || 
        !teacherData.password || !teacherData.subject || !teacherData.phone) {
      throw new Error('Name, email, password, subject, and phone are required');
    }

    console.log('Registering teacher with data:', teacherData);

    const response = await api.post('/register-teacher', {
      name: teacherData.name,
      email: teacherData.email,
      password: teacherData.password,
      subject: teacherData.subject,
      phone: teacherData.phone.trim(),
    });

    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Teacher Registration Error:', errorInfo);
    throw errorInfo;
  }
};

// Function to log in a user
export const loginUser = async (loginData) => {
  try {
    if ((!loginData.email && !loginData.phone) || !loginData.password) {
      throw new Error('Email/phone and password are required');
    }

    const payload = { password: loginData.password };
    if (loginData.email) payload.email = loginData.email;
    if (loginData.phone) payload.phone = loginData.phone;

    console.log('Logging in with payload:', payload);

    const response = await api.post('/login', payload);
    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Login Error:', errorInfo);
    throw errorInfo;
  }
};

// Function to reset a user's password
export const resetPassword = async (resetData) => {
  try {
    if ((!resetData.email && !resetData.phone) || !resetData.newPassword) {
      throw new Error('Email/phone and new password are required');
    }

    const payload = { newPassword: resetData.newPassword };
    if (resetData.email) payload.email = resetData.email;
    if (resetData.phone) payload.phone = resetData.phone;

    console.log('Resetting password with payload:', payload);

    const response = await api.post('/reset-password', payload);
    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Password Reset Error:', errorInfo);
    throw errorInfo;
  }
};

// Function to verify a user's token
export const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error('Token is required for verification');
    }

    console.log('Verifying token:', token);

    const response = await api.get('/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Token Verification Error:', errorInfo);
    throw errorInfo;
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    console.log('Logging out user');

    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Logout Error:', errorInfo);
    throw errorInfo;
  }
};