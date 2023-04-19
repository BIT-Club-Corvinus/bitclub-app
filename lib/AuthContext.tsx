import React from 'react';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  session: null,
  setSession: () => {},
});

export default AuthContext;