import React, { FunctionComponent, ReactNode } from 'react';

import { Accordion, Button } from 'react-bootstrap';

export interface AccordionItemProps {
  onDoubleClick?: () => void;
  toggle: string | ReactNode;
  eventKey?: string;
  className?: string;
  onToggleClick?: (show?: string) => void;
  activeKey?: string;
  ariaLabel?: string;
  toggleClassName?: string;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ 
  children,
  toggle,
  onDoubleClick,
  eventKey = 'accordionitem',
  className = "",
  activeKey,
  onToggleClick = () => {},
  ariaLabel = "accordion-btn",
  toggleClassName = ""
}) => {
  return (
    <Accordion 
      onDoubleClick={onDoubleClick}
      className={className}
      activeKey={activeKey}
      aria-label={ariaLabel}
      onBlur={() => onToggleClick(false || "")}>
      <Accordion.Toggle 
        as={Button}
        variant="link"
        eventKey={eventKey}
        className={"accordion-btn " + toggleClassName}
        onClick={() => onToggleClick(activeKey === eventKey ? "" : eventKey)}>
        {toggle}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <>
          {children}
        </>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default AccordionItem;