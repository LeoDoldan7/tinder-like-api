import uuid from 'uuid/v4';

type EntityId = undefined | string;

export class Entity<T> {
  public readonly id: EntityId;
  public readonly props: T;

  protected constructor(props: T, id?: EntityId) {
    this.id = id != undefined ? id : uuid();
    this.props = props;
  }
}
