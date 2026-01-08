import { pattern, required, schema } from '@angular/forms/signals';
import { CartBody } from '../../../../../core/models/checkout/checkout';

export const shippingSchema = schema<CartBody>((rootPath) => {
  required(rootPath.shippingAddress.city, { message: 'City is Required!' }),
    required(rootPath.shippingAddress.phone, { message: 'Phone is Required!' }),
    pattern(rootPath.shippingAddress.phone, /^01[0-2,5][0-9]{8}$/, {
      message: 'You Should Use Egyptian Phone Number',
    });
});
