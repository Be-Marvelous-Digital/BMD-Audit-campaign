export const MAILCHIMP = {
  action:
    import.meta.env.VITE_MAILCHIMP_ACTION ||
    'https://bemarvelousdigital.us9.list-manage.com/subscribe/post?u=fe54163fcf84aea5b7b950b46&id=6c3a9dae75',
  tagId: import.meta.env.VITE_MAILCHIMP_TAG_ID || '',
  honeypot: import.meta.env.VITE_MAILCHIMP_HONEYPOT || 'b_fe54163fcf84aea5b7b950b46_6c3a9dae75',
  fields: {
    email: 'EMAIL',
    firstName: 'FNAME',
    phone: 'PHONE',
    message: 'MESSAGE',
    website: 'WEBSITE',
    goal: 'GOAL',
    style: 'STYLE',
    inspiration: 'INSPIRE',
    pains: 'PAINS',
    business: 'BUSINESS',
    timeline: 'TIMELINE',
    role: 'ROLE',
  },
} as const;
