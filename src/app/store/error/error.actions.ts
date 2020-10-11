export class SetErrorMap {
    static readonly type = 'SetErrorMap';

    constructor(
        public errors: Map<string, string>,
        public reject: any
    ) {
    }
}
