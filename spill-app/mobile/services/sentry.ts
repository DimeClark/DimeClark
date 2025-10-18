/**
 * Sentry Error Tracking Configuration
 * Monitors and reports errors in the mobile app
 */
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;

export const initializeSentry = () => {
  // Only initialize Sentry in production and if DSN is configured
  if (!__DEV__ && SENTRY_DSN) {
    Sentry.init({
      dsn: SENTRY_DSN,
      enableInExpoDevelopment: false,
      debug: false,
      tracesSampleRate: 1.0,
      environment: Constants.expoConfig?.extra?.environment || 'production',
      beforeSend(event) {
        // Filter out sensitive information
        if (event.request?.headers) {
          delete event.request.headers['Authorization'];
          delete event.request.headers['Cookie'];
        }
        return event;
      },
    });
  }
};

export const captureException = (error: Error, context?: Record<string, any>) => {
  if (!__DEV__ && SENTRY_DSN) {
    Sentry.captureException(error, {
      contexts: context ? { custom: context } : undefined,
    });
  } else {
    console.error('Error:', error, context);
  }
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  if (!__DEV__ && SENTRY_DSN) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`[${level}]`, message);
  }
};

export const setUserContext = (user: { id: string; email?: string; name?: string }) => {
  if (!__DEV__ && SENTRY_DSN) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.name,
    });
  }
};

export const clearUserContext = () => {
  if (!__DEV__ && SENTRY_DSN) {
    Sentry.setUser(null);
  }
};

export default {
  initializeSentry,
  captureException,
  captureMessage,
  setUserContext,
  clearUserContext,
};
