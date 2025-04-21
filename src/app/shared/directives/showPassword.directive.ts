import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: "input[togglePassword]",
    exportAs: "togglePassword",
})
export class ShowPasswordDirective  {
    private _visible = false;

    @HostBinding("attr.type")
    get inputType(): string {
        return this._visible ? 'text' : 'password';
    }

    toggle(): void {
        this._visible = !this._visible;
    }
    
    get visible(): boolean {
        return this._visible;
    }
}