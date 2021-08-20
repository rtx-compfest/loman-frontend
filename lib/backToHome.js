export default function backToHome(role) {
  switch (role) {
    case 'donor':
      return '/'
    case 'admin':
      return '/admin'
    case 'fundraiser':
      return '/fundraiser'
    default:
      return '/'
  }
}
