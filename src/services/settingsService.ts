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
    const textSettings = await this.textSettingsDataSource.find();
    return {
      boolSettings,
      textSettings,
    };
  }

  async findSettingsOptionAndUpdate(type: 'bool' | 'text', name:string, value: string | boolean) {
    let result;
    if (type === 'bool') {
      const opt = await this.boolSettingsDataSource.findOneBy({
        name,
      });
      result = await this.boolSettingsDataSource.update(opt as BoolSettings, {
        value: value as boolean,
      });
    } else {
      const opt = await this.textSettingsDataSource.findOneBy({
        name,
      });
      result = await this.textSettingsDataSource.update(opt as TextSettings, {
        value: value as string,
      });
    }
    return result;
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

  async updateSettingsOption(type: 'bool' | 'text', id: string, value: string | boolean) {
    let result;
    if (type === 'bool') {
      const option = await this.boolSettingsDataSource.findOneBy({
        id,
      });
      result = await this.boolSettingsDataSource.update(option as BoolSettings, {
        value: value as boolean,
      });
      return result;
    }
    const option = await this.textSettingsDataSource.findOneBy({
      id,
    });
    result = await this.textSettingsDataSource.update(option as TextSettings, {
      value: value as string,
    });
    return result;
  }
}

export default new SettingsService();
