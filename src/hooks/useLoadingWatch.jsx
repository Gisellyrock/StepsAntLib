import { useEffect } from 'react';

export const useLoadingWatch = (loading = false) => {
  useEffect(() => {
    if (loading) {
      window.document.body.style.cursor = 'wait';
    } else {
      window.document.body.style.cursor = 'default';
    }

    return () => {
      window.document.body.style.cursor = 'default';
    };
  }, [loading]);
};
