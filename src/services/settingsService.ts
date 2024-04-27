import { Repository } from 'typeorm';
import AppDataSource from '../dbConnection';
import { BoolSettings, TextSettings } from '../entities';

class SettingsService {
  boolSettingsDataSource: Repository<BoolSettings>;

  textSettingsDataSource: Repository<TextSettings>;

  constructor() {
    this.boolSettingsDataSource = AppDataSource.getRepository(BoolSettings);
    this.textSettingsDataSource = AppDataSource.getRepository(TextSettings);
  }

  async getAllSettings() {
    const boolSettings = await this.boolSettingsDataSource.find();
    const textSettings = await this.boolSettingsDataSource.find();
    return {
      boolSettings,
      textSettings,
    };
  }

  async createSettingsOption(type: 'bool' | 'text', name:string) {
    let result;
    if (type === 'bool') {
      const option = await this.boolSettingsDataSource.create({
        name,
      });
      result = await this.boolSettingsDataSource.save(option);
    } else {
      const option = await this.textSettingsDataSource.create({
        name,
      });
      result = await this.textSettingsDataSource.save(option);
    }
    return result;
  }
}

export default new SettingsService();
