export default {
  password: {
    min: 8
  },
  pagination: {
    default_page: 1,
    default_records_per_page: 10
  },
  salt: {
    length: 10
  },
  jwt: {
    secret: 'your-secret-key',
    expiry: '1d'
  }
};