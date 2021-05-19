import React, { FunctionComponent } from 'react';

import { Accordion, Button } from 'react-bootstrap';

import './Accordion.css'

export interface AccordionItemProps {
  onDoubleClick?: () => void;
  toggle: string;
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({ children, toggle, onDoubleClick = () => {} }) => {
  return (
    <Accordion onDoubleClick={onDoubleClick}>
      <Accordion.Toggle as={Button} variant="link" eventKey={toggle} className="accordion-btn">
        {toggle}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={toggle}>
        <>
          {children}
        </>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default AccordionItem;