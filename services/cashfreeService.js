import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  "TEST430329ae80e0f32e41a393d78b923034",
  "TESTaf195616268bd6202eeb3bf8dc458956e7192a85"
);

exports.createOrder = async (
  orderId,
  orderAmount,
  orderCurrency = "IND",
  customerId,
  customerPhone
) => {
  try {
    const expiryDate = new Date(Date.now());
    const formatedExpiryDate = expiryDate.toString();
    const request = {
      order_amount: orderAmount,
      order_currency: orderCurrency,
      order_id: orderId,
      customer_details: {
        customer_id: customerId,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: "http://localhost:3000/expense/" + orderId,
        payment_method: 'cc, upi, dc'
      },
      order_expiry_time: formatedExpiryDate
    };

    const response = await cashfree.PGCreateOrder(request);
    return response.data.payment_session_id;
  } catch (error) {
    console.error('Error creating order', error.message);
  }
};


