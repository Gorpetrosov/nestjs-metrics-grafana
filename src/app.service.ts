import { Injectable } from '@nestjs/common';
import * as os from 'node:os';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPrivateIpOrHostname(): string {
    // Get the private Ip address or hostname of the current EC2 instance
    const networkInterfaces = os.networkInterfaces();
    const interfaceKeys = Object.keys(networkInterfaces);

    for (const iFaceKey of interfaceKeys) {
      const iFace = networkInterfaces[iFaceKey];
      for (const entry of iFace) {
        // Check for private IPv4 address (skip loopback and non-IPv4 addresses)
        if (!entry.internal && entry.family === 'IPv4') {
          return entry.address; // return private IP address
        }
      }
    }
    // If private IP is not found , return hostname
    return os.hostname();
  }
}
