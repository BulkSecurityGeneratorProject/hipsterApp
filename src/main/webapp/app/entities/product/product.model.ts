import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public picture?: string,
        public city?: string,
        public provider?: string,
        public price?: number,
        public rating?: number,
        public stars?: number,
        public description?: string,
        public distance?: number,
        public active?: boolean,
    ) {
        this.active = false;
    }
}
