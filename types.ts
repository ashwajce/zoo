export enum StepStatus {
  LOCKED = 'locked',
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
}

export type AnimalType = 'elephant' | 'lion' | 'monkey' | 'giraffe' | 'hippo' | 'penguin' | 'owl' | 'panda' | 'zebra' | 'tiger';

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  animal: AnimalType;
  instructions: string; // Markdown-like content
}

export interface WorkflowState {
  [stepId: string]: {
    status: StepStatus;
    notes?: string;
    completedAt?: string;
  };
}

export interface FullWorkflow {
  steps: WorkflowStep[];
  currentState: WorkflowState;
}