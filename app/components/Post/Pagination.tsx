import React from "react";
import Link from 'next/link';
import { Button } from '@mantine/core';

type Props = {
  totalPages: number
}

const Pagination = ({ totalPages }: Props) => {
  if (totalPages > 1) {
    const paginationButtons: React.JSX.Element[] = [];

    for (let i = 0; i< totalPages; i++) {
      const pageNum: number = i + 1;
      const url: string = pageNum == 1 ? '/' : `/${pageNum}`;
  
      paginationButtons.push(
        <Link href={ url }>
          <Button variant="default">
            { pageNum }
          </Button>
        </Link>
      );
    }
    return (
      <div id="post-list-pagination">
        { paginationButtons }
      </div>
    );
  }
  return (null);
}

export default Pagination;
