export default class MemoryModel {
  public text = '';
  public tags = [];
  public flags = [];
  public link = null;
  private _flag = false;
  private _done = false;
  private _forget = false;

  public toggleFlag(toggle = !this._flag) {
    this._flag = (toggle);
  }

  public get isFlagged() {
    return this._flagged;
  }

  public get isDone() {
    return this._done;
  }

  public get isForgotten() {
    return this._forget;
  }

  public parseText() {
    
  }

}

export class attachment {
  url = '';
  image;
  title;
  description;
}
