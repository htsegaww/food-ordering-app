import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface AddressProps {
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}

interface AddressInputsProps {
  addressProps: AddressProps;
  setAddressProp: (propName: string, value: string) => void;
  disabled?: boolean;
}

const AddressInputs: React.FC<AddressInputsProps> = ({
  addressProps,
  setAddressProp,
  disabled = false,
}) => {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <section className="flex flex-col gap-2">
      <Label className="text-gray-500 text-sm leading-tight">Phone</Label>
      <Input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ""}
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      />
      <Label>Street address</Label>
      <Input
        disabled={disabled}
        type="text"
        placeholder="Street address"
        value={streetAddress || ""}
        onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Postal code</Label>
          <Input
            disabled={disabled}
            type="text"
            placeholder="Postal code"
            value={postalCode || ""}
            onChange={(ev) => setAddressProp("postalCode", ev.target.value)}
          />
        </div>
        <div>
          <Label>City</Label>
          <Input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ""}
            onChange={(ev) => setAddressProp("city", ev.target.value)}
          />
        </div>
      </div>
      <Label>Country</Label>
      <Input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country || ""}
        onChange={(ev) => setAddressProp("country", ev.target.value)}
      />
    </section>
  );
};

export default AddressInputs;
