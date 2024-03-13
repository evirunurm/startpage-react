import { FactType } from "../FactTypeEnum";
import IFactListener from "./FactListener";

// This class holds Fact data.
// In order to update presentation layer, we use an "Observer"
// pattern with AuthListener listener 
export default class FactHolder {
    private listeners: IFactListener[];
    private fact: string;
    private type: FactType;
    private id: string;
  
    public constructor() {
      this.type = FactType.None;
      this.listeners = [];
      this.fact = "";
      this.id = (Date.now() * Math.random()).toString();
    }
  
    public onFactFetched(fact: string, factType: FactType): void {
      this.fact = fact;
      this.type = factType;
      this.notifyListeners();
    }

    public getFact(): string {
      return this.fact;
    }

    public getFactId(): string {
      return this.id;
    }
  
    public isOff(): boolean {
      return this.type === FactType.None;
    }
  
    public addFactListener(factListener: IFactListener): void {
      this.listeners.push(factListener);
    }
  
    public removeFactListener(factListener: IFactListener): void {
      this.listeners.splice(this.listeners.indexOf(factListener), 1);
    }
  
    private notifyListeners(): void {
      this.listeners.forEach((listener) => listener.onFactTypeChanged());
    }
  }