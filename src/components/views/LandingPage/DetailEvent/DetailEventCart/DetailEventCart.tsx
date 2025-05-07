import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardFooter, Divider } from "@heroui/react";

interface IProps {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
}
function DetailEventCart(props: IProps) {
  const { cart, dataTicketInCart, onChangeQuantity } = props;
  return (
    <Card radius="lg" className="border-none p-6 lg:sticky lg:top-[80px]">
      <CardBody className="gap-4">
        <h2 className="text-xl font-semibold text-foreground-500">Cart</h2>

        {cart.ticket === "" ? (
          <p className="text-foreground-500">Your cart is empty</p>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h4 className="font-bold">{dataTicketInCart.name}</h4>
              <div className="flex- items-center gap-2">
                <Button
                  size="md"
                  variant="bordered"
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                  onPress={() => onChangeQuantity("decrement")}
                >
                  -
                </Button>
                <span className="text-lg font-bold">{cart.quantity}</span>
                <Button
                  size="md"
                  variant="bordered"
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                  onPress={() => onChangeQuantity("increment")}
                >
                  +
                </Button>
              </div>
            </div>
            <p className="font-bold">
              {convertIDR(Number(dataTicketInCart.price) * cart.quantity)}
            </p>
          </div>
        )}
        <Divider />
      </CardBody>

      <CardFooter>
        <Button
          fullWidth
          color="danger"
          size="md"
          disabled={cart.quantity === 0}
          className="disabled:bg-danger-200"
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DetailEventCart;
