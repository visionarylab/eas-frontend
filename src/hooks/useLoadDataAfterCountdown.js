import { useEffect, useState } from 'react';

const MAX_RETRIES = 5;

export default function useLoadDataAfterCountdown(result, loadData) {
  const [retries, setRetries] = useState(MAX_RETRIES);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (result && !result.value && retries > 0) {
      setRetries(retries - 1);
      // Fetch the results once the countdown is over
      const missingSeconds = new Date(result.schedule_date).getTime() - new Date().getTime();
      const timer = setTimeout(() => loadData(), missingSeconds);
      return () => clearTimeout(timer);
    }
  }, [loadData, result, retries]);
}
