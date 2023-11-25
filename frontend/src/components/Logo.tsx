import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
truncateLogo?: boolean;
}

export function Logo({ truncateLogo }: Props) {
  return (
    <div className="flex items-center text-3xl">
      <FontAwesomeIcon
        icon={faNoteSticky}
        className="text-neutral-100 h-8 w-8 -translate-y-[1px]"
      />
      {!truncateLogo && <h1 className="text-neutral-100">MicroNote</h1>}
    </div>
  );
}
