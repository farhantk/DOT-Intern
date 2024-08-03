import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface BlacklistEntry {
  token: string;
  expiresAt: Date;
}

@Injectable()
export class BlacklistService {
  private readonly blacklistDir = path.resolve(process.cwd(), process.env.BLACKLIST_DIR);
  private readonly blacklistFile = path.join(this.blacklistDir, 'token-blacklist.json');

  constructor() {
    this.ensureDirectoryExists(this.blacklistDir);
    //console.log('Blacklist directory:', this.blacklistDir);
    //console.log('Blacklist file path:', this.blacklistFile);

    if (!fs.existsSync(this.blacklistFile)) {
      fs.writeFileSync(this.blacklistFile, JSON.stringify([]));
      //console.log('Blacklist file created successfully.');
    }
  }

  private ensureDirectoryExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      //console.log('Directory created:', dir);
    }
  }

  private readBlacklist(): BlacklistEntry[] {
    try {
      const data = fs.readFileSync(this.blacklistFile, 'utf-8');
      //console.log('Data read from file:', data);
      return JSON.parse(data);
    } catch (error) {
      //console.error('Error reading blacklist file:', error);
      return [];
    }
  }

  private writeBlacklist(data: BlacklistEntry[]) {
    try {
      fs.writeFileSync(this.blacklistFile, JSON.stringify(data, null, 2));
      //console.log('Blacklist file written successfully:', this.blacklistFile);
    } catch (error) {
      //console.error('Error writing blacklist file:', error);
    }
  }

  async blacklistToken(token: string, expiresAt: Date) {
    //console.log(`Blacklisting token: ${token}, expiresAt: ${expiresAt}`);
    const blacklist = this.readBlacklist();
    blacklist.push({ token, expiresAt });
    this.writeBlacklist(blacklist);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklist = this.readBlacklist();
    return blacklist.some(entry => entry.token === token && new Date(entry.expiresAt) > new Date());
  }
}
