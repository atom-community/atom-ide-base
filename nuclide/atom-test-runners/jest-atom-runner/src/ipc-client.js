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

export interface IPCWorker {
  onMessage(onMessageCallback: (message: string) => void): void
  send(message: string): void
};

import { Client, NodeMessage } from 'veza';

import {makeMessage, MESSAGE_TYPES} from './utils';

let connected = false;
export const connectToIPCServer = ({
  serverID,
  workerID,
}: {
  serverID: ServerID,
  workerID: WorkerID,
}): Promise<IPCWorker> => {
  if (connected) {
    throw new Error(
      "can't connect to IPC server more than once from one worker",
    );
  }
  connected = true;
  const node = new Client(serverID)
    .on('connect', (client) => {
      const initMessage = makeMessage({
        messageType: MESSAGE_TYPES.INITIALIZE,
      });
      const nodeMessage = new NodeMessage(workerID, 1, false, initMessage)
      node.emit("message", nodeMessage, client);
    })
  	.on('error', (error, client) => console.error(`[IPC] Error from ${client.name}:`, error))
  	.on('disconnect', client => console.error(`[IPC] Disconnected from ${client.name}`))
  	.on('ready', async client => {
  		console.log(`[IPC] Connected to: ${client.name}`);
  		try {
        const initMessage = makeMessage({
          messageType: MESSAGE_TYPES.INITIALIZE,
        });
  			const result = await client.send(initMessage, { timeout: 5000 });
  			console.log(`[TEST] Hello ${result}`);
  		} catch (error) {
  			console.error(`[TEST] Client send errored: ${error}`);
  		}
  	});

  node.maximumRetries = 1500

  return node.connectTo(8001)
};
