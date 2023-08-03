import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';

const resources = {
  en: {
    translation: {
      ID_IS_EMPTY: 'Identifier is missing!!!',
      INVALID_ID: 'Invalid identifier!!!',
      NAME_IS_EMPTY: 'Name is required.',
      EMAIL_IS_EMPTY: 'Email is required.',
      EMAIL_IS_IN_WRONG_FORMAT: 'Please enter valid email address.',
      PASSWORD_IS_EMPTY: 'Password is required.',
      PASSWORD_LENGTH_MUST_BE_MORE_THAN_8: 'Password must be at least 8 characters long.',
      CONFIRM_PASSWORD_IS_EMPTY: 'Confirm Password is required.',
      CONFIRM_PASSWORD_LENGTH_MUST_BE_MORE_THAN_8: 'Confirm Password must be at least 8 characters long.',
      PASSWORD_AND_CONFIRM_PASSWORD_MISMATCH: 'Password and Confirm Password must be same.',
      USER_EXISTS_ALLREADY: 'User already exists with this email address.',
      ACESS_TOKEN_IS_EMPTY: 'Access Token is required.',
      INVALID_ACCESS_TOKEN: 'Invalid access token!!!',
      SOME_THING_WENT_WRONG: 'Something went wrong!!!'
    }
  },
  de: {
    translation: {
      INVALID_PASSWORD: 'Kennung fehlt!!!',
      INVALID_ID: 'Ungültige Kennzeichnung!!!',
      NAME_IS_EMPTY: 'Name ist erforderlich.',
      EMAIL_IS_EMPTY: 'E-Mail ist erforderlich.',
      EMAIL_IS_IN_WRONG_FORMAT: 'Bitte geben Sie eine gültige Email Adresse an.',
      PASSWORD_IS_EMPTY: 'Passwort wird benötigt.',
      PASSWORD_LENGTH_MUST_BE_MORE_THAN_8: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
      CONFIRM_PASSWORD_IS_EMPTY: 'Bestätigen Sie, dass ein Passwort erforderlich ist.',
      CONFIRM_PASSWORD_LENGTH_MUST_BE_MORE_THAN_8: 'Das Bestätigungskennwort muss mindestens 8 Zeichen lang sein.',
      PASSWORD_AND_CONFIRM_PASSWORD_MISMATCH: 'Passwort und Passwort bestätigen müssen identisch sein.',
      USER_EXISTS_ALLREADY: 'Der Benutzer existiert bereits mit dieser E-Mail-Adresse.',
      ACESS_TOKEN_IS_EMPTY: 'Zugriffstoken ist erforderlich.',
      INVALID_ACCESS_TOKEN: 'Inkorrekter Zugangscode!!!',
      SOME_THING_WENT_WRONG: 'Etwas ist schief gelaufen!!!'
    }
  }
};

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en', // Default language fallback
    preload: ['en'], // Preload the default language
    detection: {
      order: ['header'], // Detect language from request header : Accept-Language
      caches: false // Disable caching for API endpoints
    }
  });

export default i18next;