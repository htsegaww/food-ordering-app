import { Button } from "../ui/button";

export function AddToCartBtn({ hasSizesExtras, basePrice, onAddToCart }: any) {
  if (!hasSizesExtras) {
  }
  return (
    <Button className="mt-4 px-12 text-white bg-primary" onClick={onAddToCart}>
      {hasSizesExtras ? (
        <span>Add to cart From ${basePrice}</span>
      ) : (
        <span>add to cart ${basePrice}</span>
      )}
    </Button>
  );
}
