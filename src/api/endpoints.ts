import {API_DOMAIN_URL, API_SCHEME_URL} from '../utils/constants';

export const generateApiEndpoint = (endpointUrl: string): string => {
  const url = `${API_SCHEME_URL}${API_DOMAIN_URL}`;

  if (!endpointUrl?.trim?.()) {
    return url;
  }
  return `${url}${endpointUrl}`;
};

export const notAccessErrorMiddlewareReduxActionsHandlerUrls: string[] = [];
