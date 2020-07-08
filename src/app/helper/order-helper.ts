import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderHelper {

    isStepActive(status: string, currentIndexStep: number) {
        return this.getStatusStepperIndex(status) < currentIndexStep;
    }

    getStatusStepperIndex(status: string): number {
        switch (status) {
            case 'WAREHOUSE':
                return 1;
            case 'SORTING_PLANT':
                return 2;
            case 'TRANSPORT':
                return 3;
            case 'PARCEL_LOCKER':
                return 4;
            default:
                return 0;
        }
    }

}