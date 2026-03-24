import { io } from 'socket.io-client';

const SOCKET_HOST = 'https://notifications.verifiedx.io';

const socket = io(SOCKET_HOST);

socket.on('connect', () => {
  console.log('[BlockHeight] Socket connected');
});

socket.on('disconnect', (reason) => {
  console.log(`[BlockHeight] Socket disconnected: ${reason}`);
});

socket.on('connect_error', (err) => {
  console.log(`[BlockHeight] Socket connection error: ${err.message}`);
});

type BlockCallback = (height: number) => void;

const listeners: BlockCallback[] = [];

socket.onAny((_eventName, event) => {
  if (event?.type === 'new_block' && event.data?.height != null) {
    const height = Number(event.data.height);
    console.log(`[BlockHeight] SOCKET: ${height.toLocaleString()}`);
    for (const cb of listeners) {
      cb(height);
    }
  }
});

export function onNewBlock(cb: BlockCallback): () => void {
  listeners.push(cb);
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}
