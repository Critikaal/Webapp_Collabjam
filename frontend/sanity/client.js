import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'rguaui6f', // replace with your Sanity project ID
  dataset: 'production', // replace with your Sanity dataset name
  useCdn: true, // `false` if you want to ensure fresh data
});