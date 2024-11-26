export type EventType = 'deviceMalfunction' | 'temperatureExceeded' | 'doorUnlocked';

export interface DeviceMalfunctionEventData {
  reasonCode: number;
  reasonText: string;
}

export interface TemperatureExceededEventData {
  temp: number;
  threshold: number;
}

export interface DoorUnlockedEventData {
  unlockDate: number;
}

export interface BaseEvent<T> {
  deviceId: string;
  eventDate: number;
  type: EventType;
  evtData: T;
}

export interface DeviceMalfunctionEvent extends BaseEvent<DeviceMalfunctionEventData> {
  type: 'deviceMalfunction';
}

export interface TemperatureExceededEvent extends BaseEvent<TemperatureExceededEventData> {
  type: 'temperatureExceeded';
}

export interface DoorUnlockedEvent extends BaseEvent<DoorUnlockedEventData> {
  type: 'doorUnlocked';
}

export type Event = DeviceMalfunctionEvent | TemperatureExceededEvent | DoorUnlockedEvent;

export interface ApiResponse {
  events: Event[];
}

export interface EventDataBase {
  deviceId: string;
  eventDate: number;
  eventType: EventType;
}

export interface DeviceMalfunctionEventDataInput extends EventDataBase {
  eventType: 'deviceMalfunction';
  reasonCode: number;
  reasonText: string;
}

export interface TemperatureExceededEventDataInput extends EventDataBase {
  eventType: 'temperatureExceeded';
  temp: number;
  threshold: number;
}

export interface DoorUnlockedEventDataInput extends EventDataBase {
  eventType: 'doorUnlocked';
  unlockDate: number;
}

export type EventData = DeviceMalfunctionEventDataInput | TemperatureExceededEventDataInput | DoorUnlockedEventDataInput;
