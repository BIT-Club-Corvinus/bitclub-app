import React from 'react';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  online: boolean;
  setOnline: (online: boolean) => void;
  loading: boolean,
  setLoading: (loading: boolean) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  session: null,
  setSession: () => {},
  online: false,
  setOnline: (online) => {online = !online},
  loading: false,
  setLoading: () => {}
});

export default AuthContext;