import { authService } from '@/src/services/auth/authService';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function IndexScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication with a small delay to ensure navigation is ready
    const checkAuth = () => {
      setTimeout(() => {
        const authenticated = authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        setIsLoading(false);
      }, 100);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? '/(protected)' : '/login'} />;
}