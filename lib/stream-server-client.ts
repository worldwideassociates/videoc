
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.STREAM_API_KEY
const secret = process.env.STREAM_API_SECRET

declare global {
  var streamClient: StreamClient | undefined
}

const streamClient = globalThis.streamClient || new StreamClient(apiKey, secret);

if (process.env.NODE_ENV !== 'production') globalThis.streamClient = streamClient

export default streamClient