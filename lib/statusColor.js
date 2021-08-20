const statusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'yellow'
    case 'Verified':
      return 'blue'
    case 'Completed':
      return 'green'
    case 'Rejected':
      return 'red'
    default:
      return 'gray'
  }
}

export default statusColor
