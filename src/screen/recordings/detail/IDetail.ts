export interface INotifications {
  text: string;
  date: string;
  type: 'normal' | 'danger' | 'caution';
  key: number;
  personDetected: string;
  percentage: number;
  age: number;
  sex: string;
  alert: string;
}

export interface IData {
  mounth: string;
  notifications: INotifications[];
}

export interface ISectionNotifications extends IData {
  navigation: any;
}

export const data: IData[] = [
  {
    mounth: 'Hoy',
    notifications: [
      {
        date: '08:31 AM',
        text: 'Se identificó a CARLOS SANTANA (95%) en la zona SALA',
        type: 'normal',
        personDetected: 'CARLOS SANTANA',
        percentage: 95,
        age: 18,
        sex: 'Masculino',
        alert: 'Activa',
        key: 1
      },
      {
        date: 'Hoy 05:01 AM',
        text: 'Se identificó a ANA LAURENS (95%) en la zona COCHERA',
        type: 'normal',
        personDetected: 'ANA LAURENS',
        percentage: 95,
        age: 23,
        sex: 'Femenino',
        alert: 'Activa',
        key: 2
      }
    ]
  },
  {
    mounth: 'Agosto',
    notifications: [
      {
        date: '12/08/2022',
        text: 'Se identificó a SUJETO PELIGROSO 1 (80%) en la zona SALA',
        type: 'danger',
        personDetected: 'ANA LAURENS',
        percentage: 95,
        age: 23,
        sex: 'Femenino',
        alert: 'Activa',
        key: 3
      },
      {
        date: '06/08/2022',
        text: 'Sujeto no conocido, sex FEMALE, age 18',
        type: 'caution',
        personDetected: 'No conocid@',
        percentage: 0,
        age: 19,
        sex: 'Femenino',
        alert: 'Activa',
        key: 4
      }
    ]
  }
];
