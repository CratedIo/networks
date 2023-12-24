
import { createClient } from 'next-sanity'

export const client = createClient({
    apiVersion: "2023-05-03",
    dataset: "production",
    projectId: "1h17wbsd",
    useCdn: false,
  });