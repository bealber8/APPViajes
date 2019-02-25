export class Travel {
    id: number;
    name: string;
    x_solicitante_id: number;
    x_medio_transporte: string;
    x_project_id: number;
    x_lista_lugar_origen: string;
    x_lista_lugar_destino: string;
    x_fecha_ida: string;
    x_fecha_vuelta: string;
    x_nombre_hotel: string;
    x_fecha_entrada: string;
    x_fecha_salida: string;
    x_observaciones: string;
    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}