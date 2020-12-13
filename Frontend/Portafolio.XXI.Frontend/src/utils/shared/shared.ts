export class Shared {
    crearId = (array) => {
        const item = array.slice(-1);
    
        console.log(item,array);
        debugger
        return item.id + 1;
    }
}
