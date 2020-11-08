export class PaginatorOptions {
    length: number;
    pageSize: number;
    pageIndex: number;
    datasource: any[];

    constructor(props = {}) {
        Object.assign(this, props);
    }

}