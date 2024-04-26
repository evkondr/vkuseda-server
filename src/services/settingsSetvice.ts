import AppDataSource from 'dbConnection';
import { BoolSettings, TextSettings } from 'entities';
import { Repository } from 'typeorm';

class SettingsService {
  boolSettingsDataSource: Repository<BoolSettings>;

  textSettingsDataSource: Repository<TextSettings>;

  constructor() {
    this.boolSettingsDataSource = AppDataSource.getRepository(BoolSettings);
    this.textSettingsDataSource = AppDataSource.getRepository(TextSettings);
  }
}

export default new SettingsService();
