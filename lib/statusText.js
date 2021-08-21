export default function statusText(status) {
  switch (status) {
    case 0:
      return 'Pending'
    case 1:
      return 'Verified'
    case 2:
      return 'Rejected'

    default:
      return 'Pending'
  }
}
