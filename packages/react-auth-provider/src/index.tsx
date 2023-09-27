import { useEffect } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import {
  LoginParams,
  AuthProviderProps,
  AuthProviderTypes,
} from './interfaces';

const AuthContext = createContext<AuthProviderTypes | null>(null);

const useAuth = () => useContext<AuthProviderTypes>(AuthContext);

const AuthProvider: React.FC<
  PropsWithChildren<AuthProviderProps & unknown>
> = ({ children, onSuccess, onError }) => {
  const { post } = useDataProvider();

  const [user, setUser] = useState<unknown>();
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  useEffect(() => {
    const _accessToken = localStorage.getItem('accessToken');
    setAccessToken(_accessToken);
  }, []);

  const authLogin = (loginData: LoginParams) =>
    post({
      uri: loginData.loginPath || '/auth/signin',
      body: {
        username: loginData.username,
        password: loginData.password,
      },
    });

  const { execute, isPending } = useQuery(authLogin, false, {
    onSuccess: (data) => {
      if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        onSuccess?.(data.accessToken);
      }
    },
    onError: (error: Error) => {
      console.error({ error });
      onError?.(error);
    },
  });

  const doLogin = async (loginData: LoginParams) => {
    execute(loginData);
  };

  const doLogout = async () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        doLogin,
        doLogout,
        isPending,
        accessToken,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { LoginParams, useAuth, AuthProvider };
