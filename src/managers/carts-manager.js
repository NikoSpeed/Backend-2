const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.ultId = 0;
        this.cargarCarritos();
    }


async cargarCarritos() {
    try {
        const data = await fs.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data);
        if (this.carts.length > 0) {
            this.ultId = Math.max(...this.carts.map(cart => cart.id));
        }
    } catch (error) {
        console.log("Error al cargar el carrito");
        await this.guardarCarritos();
    }
}

async guardarCarritos() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
}


async crearCarrito() {
    const nuevoCarrito = {
        id: ++this.ultId,
        products: []
    };
    this.carts.push(nuevoCarrito);
    await this.guardarCarritos();
    return nuevoCarrito;
}


async getCarritoById(carritoId) {
    try {
        const carritoBuscado = this.carts.find(carrito = carrito.id === carritoId)
        if(!carritoBuscado){
            throw new Error("No existe el carrito")
        }
        return carritoBuscado
    } catch (error) {
        throw new Error("Error al obtener los carritos")
    }
}

async deleteCarrito(id) {
    try {
        const carrito = await this.leerArchivo(); 

        const index = carrito.findIndex( item => item.id === id); 

        if(index !== -1) {
            carrito.splice(index, 1); 
            await this.guardarArchivo(carrito); 
            console.log("Carrito eliminado"); 
        } else {
            console.log("No se encuentra el carrito"); 
        }
    } catch (error) {
        console.log("Tenemos un error al eliminar carritos"); 
    }
}

}

module.exports = CartManager; 