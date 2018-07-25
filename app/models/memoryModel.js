export default class MemoryModel {
  public text = '';
  public tags = [];
  public flags = [];
  private _flagged = false;
  private _done = false;
  private _forget = false;

  public toggleFlag(on = !this._flagged) {
    this._flagged = (on);
  }

  public get isFlagged() {
    return this._flagged;
  }

}
