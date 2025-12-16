import { FullWorkflow, StepStatus } from '../types';

export const INITIAL_WORKFLOW: FullWorkflow = {
  steps: [
    {
      id: 'step-1',
      title: 'Pre-requisites',
      description: 'Gathering requirements and identifying stakeholders.',
      animal: 'elephant',
      instructions: `
# Pre-requisites Phase
Before we start, we need to ensure the basics are in place.

## Checklist
- [ ] **Identify Stakeholders**: Define Project Owner, Tech Lead, and Billing Contact.
- [ ] **Classify Data**: Determine if workload is Public, Internal, or Confidential.
- [ ] **Initial Budget**: Estimate monthly spend and get finance approval.
- [ ] **Training**: Ensure team has completed Cloud Fundamentals training.

**Goal**: A clear definition of *what* needs to go to the cloud and *who* is responsible.
      `
    },
    {
      id: 'step-2',
      title: 'Demand Validation',
      description: 'Architectural review and business justification.',
      animal: 'owl',
      instructions: `
# Demand Validation
The Owl reviews the wisdom of the proposed solution.

## Validation Tasks
1. **Architectural Review**: Submit design to the Cloud Center of Excellence (CCoE).
2. **Security Assessment**: Review compliance needs (GDPR, HIPAA, etc.).
3. **Platform Fit**: Confirm the workload fits within the standard Landing Zone patterns.
4. **Cost Benefit Analysis**: Finalize the business case.

> "Measure twice, cut once."
      `
    },
    {
      id: 'step-3',
      title: 'Onboarding',
      description: 'Provisioning accounts and configuring environments.',
      animal: 'tiger',
      instructions: `
# Onboarding & Provisioning
Time to build! The Tiger represents the power of automation.

## Implementation Steps
- [ ] **Account Creation**: Automated vending of the cloud account/subscription.
- [ ] **Network Setup**: VPC creation, subnet allocation, and TGW attachment.
- [ ] **Identity Federation**: Configure SSO groups and IAM roles.
- [ ] **CI/CD Pipeline**: Connect repositories to deployment pipelines.
- [ ] **Security Controls**: Apply standard Service Control Policies (SCPs).

**Outcome**: A "landing zone" ready for application deployment.
      `
    },
    {
      id: 'step-4',
      title: 'Run & Operations',
      description: 'Steady state, monitoring, and optimization.',
      animal: 'penguin',
      instructions: `
# Operational Excellence
Slide into a smooth operational state.

## BAU Activities
- **Observability**: Dashboards are green, logs are flowing to the central lake.
- **Alerting**: PagerDuty/OpsGenie rotations are active.
- **Cost Management**: Tagging compliance > 95%, monthly budget reviews.
- **Security Patching**: Automated patching schedules are active.
- **Disaster Recovery**: DR drills scheduled annually.

**Status**: The workload is live, healthy, and serving customers!
      `
    }
  ],
  currentState: {
    'step-1': { status: StepStatus.COMPLETED, completedAt: '2023-11-01' },
    'step-2': { status: StepStatus.COMPLETED, completedAt: '2023-11-15' },
    'step-3': { status: StepStatus.IN_PROGRESS, notes: 'Waiting on firewall rule approval' },
    'step-4': { status: StepStatus.LOCKED },
  }
};