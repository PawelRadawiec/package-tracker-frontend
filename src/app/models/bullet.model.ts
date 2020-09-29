export class Bullet {
    code: string;
    done: boolean;
    header: string;
    content: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }

}
