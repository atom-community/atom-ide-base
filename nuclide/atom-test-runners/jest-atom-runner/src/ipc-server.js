// @ts-check
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 * @format
 */

import type {ServerID, WorkerID} from './utils';

export type Socket = any;

export interface IPCServer {
  start(): void
  stop(): void
  on(worker: WorkerID, c: (message: string, socket: Socket) => void): void
  emit(socket: Socket,  workerID: WorkerID, message: string): void
};

import { Server } from 'veza';

let started = false;

export const startServer = ({
  serverID,
}: {
  serverID: ServerID,
}): Promise<IPCServer> => {
  if (started) {
    throw new Error('IPC server can only be started once');
  }
  started = true;
  const node = new Server(serverID)
  .on('connect', client => console.log(`[IPC] Client Connected: ${client.name}`))
	.on('disconnect', client => console.log(`[IPC] Client Disconnected: ${client.name}`))
	.on('message', message => {
		// console.log(`Received data:`, message.data, typeof message.data);
		// For World.js test
		if (message.data === 'Hello') {
			message.reply('world!');
		} else {
			setTimeout(
				() => message.reply(`Reply!: ${message.data}`),
				Math.min(9000, Math.floor(Math.random() * 1000))
			);
		}
	})
	.on('error', (error, client) => console.error(`[IPC] Error from ${client.name}`, error));
  return node.listen(8001)
};
