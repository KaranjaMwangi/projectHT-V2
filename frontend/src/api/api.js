import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

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

// ADMIN AUTHENTICATION FUNCTIONS
export const registerAdmin = async (adminData) => {
  try {
    if (!adminData.name || !adminData.email || !adminData.password || !adminData.adminKey) {
      throw new Error('Name, email, password and admin key are required');
    }

    const response = await api.post('/register-admin', adminData);
    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Admin Registration Error:', errorInfo);
    throw errorInfo;
  }
};

export const loginAdmin = async (adminData) => {
  try {
    if (!adminData.email || !adminData.password) {
      throw new Error('Email and password are required');
    }

    const response = await api.post('/admin/login', adminData);
    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    
    if (error.response?.status === 401) {
      errorInfo.message = 'Invalid admin credentials';
    } else if (error.response?.status === 404) {
      errorInfo.message = 'Admin service unavailable';
    }
    
    console.error('Admin Login Error:', errorInfo);
    throw errorInfo;
  }
};

// USER AUTHENTICATION FUNCTIONS
export const registerUser = async (userData) => {
  try {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Name, email, and password are required');
    }

    const response = await api.post('/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || null,
    });

    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Registration Error:', errorInfo);
    throw errorInfo;
  }
};

export const loginUser = async (loginData) => {
  try {
    if ((!loginData.email && !loginData.phone) || !loginData.password) {
      throw new Error('Email/phone and password are required');
    }

    const payload = { password: loginData.password };
    if (loginData.email) payload.email = loginData.email;
    if (loginData.phone) payload.phone = loginData.phone;

    const response = await api.post('/login', payload);
    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Login Error:', errorInfo);
    throw errorInfo;
  }
};

export const resetPassword = async (resetData) => {
  try {
    if ((!resetData.email && !resetData.phone) || !resetData.newPassword) {
      throw new Error('Email/phone and new password are required');
    }

    const payload = { newPassword: resetData.newPassword };
    if (resetData.email) payload.email = resetData.email;
    if (resetData.phone) payload.phone = resetData.phone;

    const response = await api.post('/reset-password', payload);
    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Password Reset Error:', errorInfo);
    throw errorInfo;
  }
};

// TEACHER AUTHENTICATION FUNCTIONS
export const registerTeacher = async (teacherData) => {
  try {
    if (!teacherData.name || !teacherData.email || 
        !teacherData.password || !teacherData.subject || !teacherData.phone) {
      throw new Error('Name, email, password, subject, and phone are required');
    }

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

// TOKEN OPERATIONS
export const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error('Token is required for verification');
    }

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

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    const errorInfo = buildErrorResponse(error);
    console.error('Logout Error:', errorInfo);
    throw errorInfo;
  }
};