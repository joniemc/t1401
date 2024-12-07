export interface ProductResponse{
    mensaje: string,
    resultado: Product[]
}

export interface Product{
    codigo: number,
    nombre: string,
    precio: number,
    codigo_fabricante: number
}