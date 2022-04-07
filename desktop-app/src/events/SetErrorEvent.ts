export class SetErrorEvent {

    private readonly _containingViewName: string;
    private readonly _error: any;

    public constructor(containingViewNameP: string, e: any) {
        this._containingViewName = containingViewNameP;
        this._error = e;
    }

    public get containingViewName(): string {
        return this._containingViewName;
    }

    public get error(): any {
        return this._error;
    }
}