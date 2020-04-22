export const handleScrollToBottom = (callback: any): void => {
  const offsetHeight = document.documentElement.offsetHeight;
  const innerHeight = window.innerHeight;
  const documentElement = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop); // For safari we need document.body.scrollTop

  if (offsetHeight - (innerHeight + documentElement) > 1) {
    return;
  }
  return callback();
};
