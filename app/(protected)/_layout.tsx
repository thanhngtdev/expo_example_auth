import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { authService } from '@/src/services/auth/authService';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function ProtectedLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authService.isAuthenticated()) {
      router.replace('/login');
    }
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      {/* <StatusBar style="auto" /> */}
    </ThemeProvider>
  );
}
