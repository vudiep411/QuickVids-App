import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'glec2pul',
  dataset: 'production',
  apiVersion: '2022-08-20',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});
