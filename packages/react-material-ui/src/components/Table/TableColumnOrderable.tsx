'use client';

import React, { useEffect, useState, ReactNode } from 'react';

import { useTableRoot } from './hooks/useTableRoot';
import OrderableDropDown, { ListItem } from '../OrderableDropDown';

type TableColumnOrderableProps = {
  hasAllOption?: boolean;
  text?: string;
  icon?: ReactNode;
};

export const TableColumnOrderable = ({
  hasAllOption,
  text,
  icon,
}: TableColumnOrderableProps) => {
  const { headers, setHeaders } = useTableRoot();

  const [headerOrder, setHeaderOrder] = useState<ListItem[]>(
    headers.map((header) => ({ id: header.id, label: header.label })),
  );

  useEffect(() => {
    const newOrderedHeaders = headerOrder.map((header) => {
      const originalHeader = headers.find((h) => h.id === header.id);
      return { ...originalHeader, hide: header.hide };
    });
    setHeaders(newOrderedHeaders);
  }, [headerOrder]);

  return (
    <OrderableDropDown
      hasAllOption={hasAllOption}
      list={headerOrder}
      setList={setHeaderOrder}
      icon={icon}
      text={text}
    />
  );
};
