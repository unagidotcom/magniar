export type DensityLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type SignalActivityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface HeroInteractionConfig {
  motionActive: boolean;
  reducedMotion: boolean;
  density: DensityLevel;
  signalActivity: SignalActivityLevel;
  cursorResponse: boolean;
  simulatedPreset: string;
}

export type QuadrantId = 'performance' | 'commerce' | 'development' | 'intelligence' | null;

export interface PlatformNode {
  id: string;
  name: string;
  quadrant: 'performance' | 'commerce' | 'development' | 'intelligence';
  technicalRole: string;
  isCore?: boolean;
}
