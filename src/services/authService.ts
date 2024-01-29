import type { LoginDto, RegisterDto, UserProfileUpdateDto } from '@/types';
import { makeRequest } from '@/utils/makeRequest';

import axios from 'axios';

export const authService = {
  register(registerDto: RegisterDto) {
    return makeRequest(() => axios.post('/auth/register', registerDto), {
      successStatuses: [201],
      errorStatuses: {
        400: 'All fields are required.',
        409: (response) => response.data.message,
      },
    });
  },

  login(loginDto: LoginDto) {
    return makeRequest(() => axios.post('/auth/login', loginDto), {
      successStatuses: [200],
      errorStatuses: {
        400: 'Username and Password cannot be blank.',
        401: 'Your login attempt failed. Please try again.',
      },
    });
  },

  logout() {
    axios.post('/auth/logout');
  },
    /*Updates user profile information*/
  updateUserProfile(profileUpdateDto: UserProfileUpdateDto) {
    return makeRequest(() => axios.put('/auth/update-profile', profileUpdateDto), {
      successStatuses: [200],
      errorStatuses: {
        400: 'Invalid request.',
        401: 'You must be logged in to update your profile.',
        403: 'You do not have permission to update this profile.',
        404: 'User not found.',
      },
    });
  },

  refreshToken() {
    const token = localStorage.getItem('refreshToken');
    if (!token) return Promise.reject('No refresh token found.');

    return axios.post('/auth/refresh-token', {
      refreshToken: token,
    });
  },
};
