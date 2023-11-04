import { cartsModel } from "../models/carts.models.js";
import { ticketModel } from "../models/ticket.models.js";

export default class TicketController {
  constructor() {}

  async postBuy(req, res) {
    //verificar el stock del producto a comprar: si hay stock, resta del total y continua la compra. si no hay no se agrega a la compra.
    //genero un ticket con los datos de la compra
    //los productos no comprados se devuelven en un array de id que se agregará al carrito del usuario
    //los roductos comprados se eliminaran del carrito
    const { cartId } = req.params;
    try {
      const product = await cartsModel.findById(cartId)
      res.status(200).json({ message: "Estamos trabajando en esto!", product });
    } catch (error) {
      console.log(
        "🚀 ~ file: ticket.controllers.js:14 ~ TicketController ~ postBuy ~ error:",
        error
      );
      res.status(404).json({
        message: "not found",
      });
    }
  }
}
