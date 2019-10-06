import { EventEmitter } from 'events';

type Listener = (...args: any[]) => void;

export type EventsHandlersMap = { [k: string]: Listener }

export abstract class EventHub {
  private static eventHubs: EventHub[] = [];

  abstract eventsMap: EventsHandlersMap;

  emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  static init(): void {
    for (const eventHub of this.eventHubs) {
      eventHub.init();
    }
  }

  public init(): void {
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    this.eventsMap.forEach((key: string, handler: Listener) => {
      this.emitter.addListener(key, handler);
    });
  }

  public emit(eventKey: string, ...args: any[]): void {
    this.emitter.emit(eventKey, ...args);
  }

  public subscribe(eventKey: string, listener: Listener): void {
    this.emitter.addListener(eventKey, listener);
  }
}
