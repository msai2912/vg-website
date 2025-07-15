import React, { useState } from 'react';
import { Eye, EyeOff, User, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Login = () => {
  const { t } = useLanguage();
  const [activeRole, setActiveRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const roles = [
    {
      key: 'student',
      icon: BookOpen,
      title: t('studentLogin'),
      description: 'Access your learning materials and track progress',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'educator',
      icon: User,
      title: t('educatorLogin'),
      description: 'Manage classes and student progress',
      color: 'from-green-500 to-emerald-500'
    },
    {
      key: 'manager',
      icon: Users,
      title: t('managerLogin'),
      description: 'Oversee programs and organizational management',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { ...formData, role: activeRole });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Role Selection */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl font-bold text-white mb-2">{t('loginTitle')}</h1>
                <p className="text-gray-300 mb-8">{t('loginSubtitle')}</p>

                <div className="space-y-4">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.key}
                        onClick={() => setActiveRole(role.key)}
                        className={`w-full p-4 rounded-xl transition-all duration-300 text-left ${
                          activeRole === role.key
                            ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{role.title}</h3>
                            <p
                              className={`text-sm ${
                                activeRole === role.key ? 'text-gray-600' : 'text-gray-300'
                              }`}
                            >
                              {role.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <p className="text-gray-400 text-sm">
                    Don't have an account? Contact your administrator or program coordinator for access.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-8">
                  <div
                    className={`inline-flex items-center space-x-2 p-3 rounded-lg bg-gradient-to-r ${
                      roles.find((r) => r.key === activeRole)?.color
                    }`}
                  >
                    {(() => {
                      const Icon = roles.find((r) => r.key === activeRole)?.icon || User;
                      return <Icon className="h-6 w-6 text-white" />;
                    })()}
                    <span className="text-white font-semibold">
                      {roles.find((r) => r.key === activeRole)?.title}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('email')}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('password')}
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 pr-12"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r ${
                      roles.find((r) => r.key === activeRole)?.color
                    } hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                  >
                    {t('signIn')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Need help accessing your account?{' '}
                    <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                      Contact Support
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;