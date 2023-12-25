
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token, useCdn } from './sanity.api'

export const client = createClient({projectId, dataset, apiVersion, token, useCdn});