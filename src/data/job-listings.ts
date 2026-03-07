export type JobListing = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  isActive: boolean;
};

export const jobListings: JobListing[] = [
  {
    id: 'job_studio_manager',
    title: 'Studio Manager',
    department: 'Studio',
    location: 'Brooklyn, NY',
    type: 'Full-time',
    description: 'Coordinate inventory, packing, and installation schedules for new releases.',
    isActive: true,
  },
  {
    id: 'job_client_care',
    title: 'Client Care Specialist',
    department: 'Client Services',
    location: 'Remote (US)',
    type: 'Part-time',
    description: 'Guide collectors through the commissioning process and handle post-sale care.',
    isActive: true,
  },
  {
    id: 'job_social_producer',
    title: 'Social Content Producer',
    department: 'Marketing',
    location: 'Los Angeles, CA',
    type: 'Contract',
    description: 'Produce behind-the-scenes photo and video assets for digital launches.',
    isActive: false,
  },
];
