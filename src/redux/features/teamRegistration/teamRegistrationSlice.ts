import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Player info structure (contact info optional - only required for co-leader)
export interface PlayerInfo {
  iglName: string;
  fullName: string;
  pubgmId: string;
  email?: string;
  phoneNumber?: string;
  discordId?: string;
  isCoLeader?: boolean;
}

// Team info from step 1
export interface TeamInfo {
  teamName: string;
  leaderName: string;
  leaderId: string;
  leaderFullName: string;
  email: string;
  phoneNumber: string;
  discordId: string;
  logoFile?: File | null;
  logoPreview?: string | null;
}

// Manager info
export interface ManagerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  discordId: string;
}

export interface RegistrationState {
  tournamentId: string | null;
  currentStep: number;
  completedSteps: number[]; // Steps that have been submitted (locked)

  // Step 1: Team & Leader info
  teamInfo: TeamInfo | null;

  // Step 2: Players info (3 required + 2 optional substitutes)
  players: PlayerInfo[];
  substitutes: PlayerInfo[];

  // Step 3: Manager (optional)
  manager: ManagerInfo | null;
  hasManager: boolean;

  // Loading states
  isSubmitting: boolean;
}

const initialState: RegistrationState = {
  tournamentId: null,
  currentStep: 1,
  completedSteps: [],
  teamInfo: null,
  players: [],
  substitutes: [],
  manager: null,
  hasManager: false,
  isSubmitting: false,
};

const teamRegistrationSlice = createSlice({
  name: 'teamRegistration',
  initialState,
  reducers: {
    // Set tournament ID
    setTournamentId: (state, action: PayloadAction<string>) => {
      state.tournamentId = action.payload;
    },

    // Navigate to step
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    // Step 1: Save team info
    saveTeamInfo: (state, action: PayloadAction<TeamInfo>) => {
      state.teamInfo = action.payload;
    },

    // Complete step 1 (lock it)
    completeStep1: (state) => {
      if (!state.completedSteps.includes(1)) {
        state.completedSteps.push(1);
      }
      state.currentStep = 2;
    },

    // Step 2: Save players
    savePlayers: (state, action: PayloadAction<PlayerInfo[]>) => {
      state.players = action.payload;
    },

    // Step 2: Save substitutes
    saveSubstitutes: (state, action: PayloadAction<PlayerInfo[]>) => {
      state.substitutes = action.payload;
    },

    // Complete step 2 (lock it)
    completeStep2: (state) => {
      if (!state.completedSteps.includes(2)) {
        state.completedSteps.push(2);
      }
      state.currentStep = 3;
    },

    // Step 3: Save manager
    saveManager: (state, action: PayloadAction<ManagerInfo | null>) => {
      state.manager = action.payload;
      state.hasManager = action.payload !== null;
    },

    // Complete step 3 (lock it)
    completeStep3: (state) => {
      if (!state.completedSteps.includes(3)) {
        state.completedSteps.push(3);
      }
    },

    // Set submitting state
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },

    // Reset entire form
    resetRegistration: () => initialState,
  },
});

export const {
  setTournamentId,
  setCurrentStep,
  saveTeamInfo,
  completeStep1,
  savePlayers,
  saveSubstitutes,
  completeStep2,
  saveManager,
  completeStep3,
  setSubmitting,
  resetRegistration,
} = teamRegistrationSlice.actions;

export default teamRegistrationSlice.reducer;
