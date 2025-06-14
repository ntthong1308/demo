import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Thay đổi từ API thật sang API giả
import mockApi from '../services/mockApi';
// Nếu đã cài jwt-decode, bạn có thể vẫn dùng nó
import { jwtDecode } from 'jwt-decode';

// Tài khoản test cho các vai trò khác nhau
const testUsers = {
  patient: {
    id: 1,
    firstName: 'Văn',
    lastName: 'Nguyễn',
    email: 'patient@example.com',
    password: 'Patient@123',
    phoneNumber: '0987654321',
    roles: ['PATIENT'],
    username: 'patient123'
  },
  doctor: {
    id: 2,
    firstName: 'Hoàng',
    lastName: 'Văn',
    title: 'BS',
    email: 'doctor@example.com',
    password: 'Doctor@456',
    phoneNumber: '0123456789',
    roles: ['DOCTOR'],
    specialties: ['Tim mạch', 'Nội khoa'],
    username: 'doctor456'
  },
  admin: {
    id: 3,
    firstName: 'Admin',
    lastName: '',
    email: 'admin@example.com',
    password: 'Admin@789',
    phoneNumber: '0909090909',
    roles: ['ADMIN'],
    username: 'admin789'
  },
  ntthong1308: { // Giữ lại tài khoản test hiện tại
    id: 4,
    firstName: 'Nguyễn',
    lastName: 'Thông',
    email: 'ntthong1308@example.com',
    password: 'password123',
    phoneNumber: '0123456789',
    roles: ['PATIENT'],
    username: 'ntthong1308'
  }
};

// Tạo context
export const AuthContext = createContext(null);

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Thêm state để kiểm soát việc tự động đăng nhập
  const [enableAutoLogin, setEnableAutoLogin] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Kiểm tra token và trạng thái đăng nhập khi component được mount
  useEffect(() => {
    // Khôi phục thông tin người dùng từ localStorage nếu có
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setLoading(false);
        return;
      } catch (e) {
        console.error("Error parsing user data", e);
        // Nếu có lỗi parsing, xóa dữ liệu không hợp lệ
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setToken(null);
      }
    }

    // AUTO LOGIN FOR DEV/TEST ENVIRONMENT ONLY
    // Chỉ bật code này khi cần test và enableAutoLogin = true
    const autoLoginForTesting = () => {
      if (process.env.NODE_ENV === 'development' && enableAutoLogin) {
        // Lấy tham số từ URL để xác định vai trò (nếu có)
        const params = new URLSearchParams(location.search);
        const testRole = params.get('testAs') || localStorage.getItem('testRole') || 'ntthong1308';
        
        // Lưu vai trò đã chọn vào localStorage để duy trì sau khi refresh
        if (params.get('testAs')) {
          localStorage.setItem('testRole', testRole);
        }
        
        // Chọn user phù hợp với vai trò
        const testUser = testUsers[testRole] || testUsers.ntthong1308;
        
        console.log(`🔧 DEV MODE: Auto setting test user for development - Role: ${testRole}`);
        
        // Tạo fake token
        const testToken = `test-token-${Date.now()}-${testRole}`;
        
        // Lưu vào state
        setCurrentUser(testUser);
        setToken(testToken);
        
        // Lưu vào localStorage để giữ đăng nhập khi refresh
        localStorage.setItem('token', testToken);
        localStorage.setItem('user', JSON.stringify(testUser));
        
        // Lưu thông tin vai trò đã chọn
        console.log(`Auto logged in as ${testUser.firstName} ${testUser.lastName} (${testUser.roles.join(', ')})`);
      }
      setLoading(false);
    };

    // Kích hoạt auto login cho môi trường development nếu đã bật
    autoLoginForTesting();
    
    // Nếu không tự động đăng nhập và không có user, đặt loading=false
    if (!enableAutoLogin && !savedUser) {
      setLoading(false);
    }
  }, [location, enableAutoLogin]);

  // Đăng nhập
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Kiểm tra thông tin đăng nhập với tài khoản test
      let matchedUser = null;
      Object.values(testUsers).forEach(user => {
        if ((user.email === email || user.username === email) && user.password === password) {
          matchedUser = user;
        }
      });
      
      if (matchedUser) {
        // Tạo token giả
        const fakeToken = `test-token-${Date.now()}-${matchedUser.roles[0]}`;
        
        // Lưu thông tin người dùng và token vào localStorage
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('user', JSON.stringify(matchedUser));
        localStorage.setItem('testRole', matchedUser.roles[0].toLowerCase());
        
        // Cập nhật state
        setToken(fakeToken);
        setCurrentUser(matchedUser);
        
        // Chuyển hướng dựa vào vai trò
        if (matchedUser.roles.includes('ADMIN')) {
          navigate('/admin/dashboard');
        } else if (matchedUser.roles.includes('DOCTOR')) {
          navigate('/doctor/profile'); // Chuyển thẳng đến profile để kiểm tra
        } else {
          navigate('/patient/profile'); // Chuyển thẳng đến profile để kiểm tra
        }
        
        return { success: true };
      }
      
      // Nếu không tìm thấy tài khoản test phù hợp, gọi API giả
      const response = await mockApi.login(email, password);
      const { token: apiToken, user } = response.data;

      // Lưu thông tin người dùng và token vào localStorage
      localStorage.setItem('token', apiToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Cập nhật state
      setToken(apiToken);
      setCurrentUser(user);

      // Chuyển hướng dựa vào vai trò
      if (user.roles.includes('ADMIN')) {
        navigate('/admin/dashboard');
      } else if (user.roles.includes('DOCTOR')) {
        navigate('/doctor/profile');
      } else {
        navigate('/patient/profile');
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Đăng nhập thất bại';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Đăng ký
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API giả
      const response = await mockApi.register(userData);
      
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Đăng ký thất bại';
      setError(errorMessage);
      alert(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Quên mật khẩu
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API giả
      const response = await mockApi.forgotPassword(email);
      
      alert('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.');
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Không thể xử lý yêu cầu quên mật khẩu';
      setError(errorMessage);
      alert(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Đặt lại mật khẩu
  const resetPassword = async (token, newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      // Gọi API giả
      const response = await mockApi.resetPassword(token, newPassword);
      
      alert('Mật khẩu đã được đặt lại thành công!');
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Không thể đặt lại mật khẩu';
      setError(errorMessage);
      alert(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất - Đảm bảo loại bỏ hết dữ liệu người dùng
  const logout = () => {
    // Xóa dữ liệu từ localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('testRole');
    
    // Đặt lại các state
    setCurrentUser(null);
    setToken(null);
    setError(null);
    
    // Đảm bảo tắt auto login
    setEnableAutoLogin(false);
    
    // Chuyển hướng về trang đăng nhập
    navigate('/login');
    
    console.log('Đã đăng xuất thành công');
  };

  // Chuyển đổi tài khoản test cho việc kiểm tra (chỉ dùng cho dev mode)
  const switchTestUser = (role) => {
    if (process.env.NODE_ENV !== 'development') return;
    
    const selectedUser = testUsers[role] || testUsers.patient;
    const testToken = `test-token-${Date.now()}-${role}`;
    
    // Lưu vào state
    setCurrentUser(selectedUser);
    setToken(testToken);
    
    // Lưu vào localStorage
    localStorage.setItem('token', testToken);
    localStorage.setItem('user', JSON.stringify(selectedUser));
    localStorage.setItem('testRole', role);
    
    // Chuyển hướng phù hợp
    if (selectedUser.roles.includes('ADMIN')) {
      navigate('/admin/dashboard');
    } else if (selectedUser.roles.includes('DOCTOR')) {
      navigate('/doctor/profile');
    } else {
      navigate('/patient/profile');
    }
    
    console.log(`Switched to ${selectedUser.firstName} ${selectedUser.lastName} (${selectedUser.roles.join(', ')})`);
  };

  // Kiểm tra vai trò người dùng
  const hasRole = (role) => {
    return currentUser?.roles?.includes(role) || false;
  };

  // Kiểm tra xác thực
  const isAuthenticated = !!token && !!currentUser;

  // Giá trị context
  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    hasRole,
    isAdmin: hasRole('ADMIN'),
    isDoctor: hasRole('DOCTOR'),
    isPatient: hasRole('PATIENT'),
    // Thêm hàm để chuyển đổi tài khoản test cho dev
    switchTestUser,
    // Thêm hàm để bật/tắt tự động đăng nhập
    toggleAutoLogin: () => setEnableAutoLogin(!enableAutoLogin),
    enableAutoLogin,
    // Thêm danh sách tài khoản test để hiển thị trong trang login (nếu cần)
    testUsers: process.env.NODE_ENV === 'development' ? testUsers : null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};