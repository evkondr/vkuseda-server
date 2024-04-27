import settingsService from '../services/settingsService';

type TSettings = {
  name: string,
  type: 'text' | 'bool'
}
const setting:TSettings[] = [
  {
    name: 'header',
    type: 'text',
  },
  {
    name: 'slogan',
    type: 'text',
  },
  {
    name: 'min-price',
    type: 'text',
  },
  {
    name: 'max-price',
    type: 'text',
  },
  {
    name: 'delivery-on',
    type: 'bool',
  },
];
export default class InitDB {
  static async initDefaultSettings() {
    try {
      // eslint-disable-next-line max-len
      const tasks = setting.map((item) => settingsService.createSettingsOption(item.type, item.name));
      await Promise.all(tasks);
    } catch (error) {
      console.log(error);
    }
  }
}
