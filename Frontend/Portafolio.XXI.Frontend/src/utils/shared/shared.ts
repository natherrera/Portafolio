export class Shared {
    
    crearId(array) {
        const item = array.slice(-1);
        return item[0].id ? +item[0].id + 1 : 1;
    }

}
