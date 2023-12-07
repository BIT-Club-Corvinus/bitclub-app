import React from 'react';
import { Session } from '@supabase/supabase-js';
import { UserProfile } from '../types/UserProfile';


interface ProfileContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  online: boolean;
  setOnline: (online: boolean) => void;
  loading: boolean,
  setLoading: (loading: boolean) => void;
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  team: string | null;
  setTeam: (team: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
}

const ProfileContext = React.createContext<ProfileContextType>({
  session: null,
  setSession: () => { },
  online: false,
  setOnline: (online) => { online = !online },
  loading: false,
  setLoading: () => { },
  profile: null,
  setProfile: () => { },
  team: null,
  setTeam: () => { },
  role: null,
  setRole: () => { }
});

export default ProfileContext;