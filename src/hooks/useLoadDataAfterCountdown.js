import { useEffect } from 'react';

export default function useLoadDataAfterCountdown(result, loadData) {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (result && !result.value) {
      // Fetch the results once the countdown is over
      const missingSeconds = new Date(result.schedule_date).getTime() - new Date().getTime();
      const timer = setTimeout(() => loadData(), missingSeconds);
      return () => clearTimeout(timer);
    }
  }, [result]);
}
