import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  subTable?: (row: TData) => React.ReactNode;
  tableClasses?: string;
  headerClasses?: string;
  headerCellClasses?: string;
  rowClasses?: string;
  bodyClasses?: string;
  cellsClasses?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  subTable,
  tableClasses,
  headerClasses,
  headerCellClasses,
  rowClasses,
  bodyClasses,
  cellsClasses,
}: DataTableProps<TData, TValue>) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <div className={cn("w-full", className)}>
      <Table className={tableClasses}>
        <TableHeader className={headerClasses}>
          <TableRow>
            {subTable && <TableHead className="w-[50px]" />}
            {table.getHeaderGroups()[0].headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn("px-4  py-3", headerCellClasses)}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className={bodyClasses}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <React.Fragment key={row.id}>
                  <TableRow className={rowClasses} key={row.id}>
                    {subTable && (
                      <TableCell className="p-0 w-[50px] px-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleRow(row.id)}
                        >
                          {expandedRows[row.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span className="sr-only">Toggle row</span>
                        </Button>
                      </TableCell>
                    )}
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn("px-4 py-3 ", cellsClasses)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {subTable && expandedRows[row.id] && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} className="p-0">
                        <div className="p-4">{subTable(row.original)}</div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (subTable ? 1 : 0)}
                className="h-24 text-center"
              >
                No Users Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
