import { Subject } from "rxjs";


export class AppForm {

    protected destroy$ = new Subject<boolean>();

    protected processing: boolean = false;

    protected hasErrorPostProcessing: boolean = false;

    protected message: string = '';

    protected beforeComponentDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    protected reset(): void {
        this.message = '';
        this.processing = true;
        this.hasErrorPostProcessing = false;
    }
}