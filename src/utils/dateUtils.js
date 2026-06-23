export function formatDate(dateString) {
  if (!dateString) return 'No Deadline';

  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export function getDaysRemaining(dateString) {
  if (!dateString) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = dateString.split('-');
  const deadlineDate = new Date(year, month - 1, day);

  const differenceInTime = deadlineDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(
    differenceInTime / (1000 * 3600 * 24)
  );

  if (differenceInDays < 0) {
    return { text: 'Overdue', className: 'countdown-overdue' };
  }

  if (differenceInDays === 0) {
    return { text: 'Due Today!', className: 'countdown-urgent' };
  }

  if (differenceInDays === 1) {
    return { text: '1 day left', className: 'countdown-urgent' };
  }

  return {
    text: `${differenceInDays} days left`,
    className: 'countdown-normal',
  };
}