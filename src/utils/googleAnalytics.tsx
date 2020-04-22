import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Route } from 'react-router-dom';
import { appEnv } from './customHooks';

const gaSettings = appEnv.googleAnalytics;

const GoogleAnalytics: React.FC = () => {
  const logPageChange = (pathname: string, search = ''): void => {
    const page = pathname + search;
    const { location } = window;
    ReactGA.set({
      page,
      location: `${location.origin}${page}`
    });
    ReactGA.pageview(page);
  };

  useEffect(() => {
    logPageChange(
      window.location.pathname,
      window.location.search
    );
  });

  return null;
};

const RouteTracker: React.FC = () =>
  <Route component={GoogleAnalytics} />;

const init = (options = {}): boolean => {
  const isGAEnabled = !!gaSettings.REACT_APP_GA_TRACKING_ID;

  if (isGAEnabled) {
    ReactGA.initialize(
      gaSettings.REACT_APP_GA_TRACKING_ID, {
        ...options
      }
    );
  }

  return isGAEnabled;
};

export interface EventGA {
  category: string;
  action: string;
  value?: number;
  label?: string;
}

export const eventGA = (gaData: EventGA): void => {
  const siteCode = window.sessionStorage.getItem('userSiteCode') || '';
  ReactGA.event({
    category: gaData.category,
    action: `${gaData.action}, SiteCode : ${siteCode}`
  });
};

export default {
  GoogleAnalytics,
  RouteTracker,
  init
};
