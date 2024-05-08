import settingsService from '../services/settingsService';

type TSettings = {
  name: string,
  type: 'text' | 'bool'
}
const setting:TSettings[] = [
  {
    name: 'Название сайта',
    type: 'text',
  },
  {
    name: 'Слоган',
    type: 'text',
  },
  {
    name: 'Минимальная сумма',
    type: 'text',
  },
  {
    name: 'Максимальная сумма',
    type: 'text',
  },
  {
    name: 'Телефон',
    type: 'text',
  },
  {
    name: 'Время отключения заказа',
    type: 'text',
  },
  {
    name: 'Возможность заказа',
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
