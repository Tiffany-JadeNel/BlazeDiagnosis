export type InspectionStatus = 'pending' | 'completed' | 'attention';

export interface InspectionsRecord {
  id: string;
  model: string;
  vin?: string;
  inspector?: string;
  date?: string; // ISO date string
  status?: InspectionStatus;
  notes?: string;
  issues?: InspectionIssue[];
}

export const DEFAULT_INSPECTION_STATUS: InspectionStatus = 'pending';

export type IssueSeverity = 'low' | 'medium' | 'high';

export interface InspectionIssue {
  section: string;
  fault: string;
  severity?: IssueSeverity;
}

export const DEFAULT_ISSUE_SECTIONS = [
  'front',
  'rear',
  'left door',
  'right door',
  'front bumper',
  'rear bumper',
  'engine',
  'tires',
  'brakes',
  'electrical',
];
