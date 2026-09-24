import { useEffect } from 'react';
import { TRACKING } from '../config/tracking';
import { loadMetaPixel, revokeMetaPixel } from '../utils/metaPixel';

export function useMetaPixel(marketingAllowed: boolean): void {
  useEffect(() => {
    if (marketingAllowed) loadMetaPixel(TRACKING.metaPixelId);
    else revokeMetaPixel();
  }, [marketingAllowed]);
}
