import { useState } from "react";

interface IUsePopover {
  cbBeforeOpen?: () => void;
}

/**
 * For use with MUI components that implement PopoverProps.
 * Popover is opened relative to the popoverAnchorElement - which is the dom element clicked by the mouse.
 *
 */
export const usePopover = (props?: IUsePopover) => {
  const [popoverAnchorElement, setPopoverAnchorElement] =
    useState<HTMLElement | null>(null);
  const shoulOpenPopover = Boolean(popoverAnchorElement);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    if (props?.cbBeforeOpen) {
      props.cbBeforeOpen();
    }
    setPopoverAnchorElement(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopoverAnchorElement(null);
  };

  return {
    popoverAnchorElement,
    shoulOpenPopover,
    handleOpenPopover,
    handleClosePopover,
  };
};
