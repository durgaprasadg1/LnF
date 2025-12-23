"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, LayoutGrid, TableIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Standalone View Toggle Buttons
export function ViewToggleButtons({ viewMode, onViewModeChange }) {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant={viewMode === "table" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-r-none"
        onClick={() => onViewModeChange("table")}
      >
        <TableIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "grid" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-l-none"
        onClick={() => onViewModeChange("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Hook for view mode
export function useViewMode(defaultMode = "table") {
  const [viewMode, setViewMode] = useState(defaultMode);
  return { viewMode, setViewMode };
}

// Helpers
const getStatusStyle = (status) => {
  const s = status?.toLowerCase();
  if (s === "completed" || s === "done") return "bg-green-500/20 text-green-400 border-green-500/30";
  if (s === "in progress" || s === "in-progress") return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  if (s === "pending" || s === "todo") return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  return "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

const getPriorityStyle = (priority) => {
  const p = priority?.toLowerCase();
  if (p === "high") return "bg-red-500/20 text-red-400 border-red-500/30";
  if (p === "medium") return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  if (p === "low") return "bg-green-500/20 text-green-400 border-green-500/30";
  return "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getInitials = (name) => {
  if (!name) return "??";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

// GridView JSX Version
export function GridView({ data, renderCard, columns = 3, gap = 16 }) {
  const defaultRenderCard = (item, index) => {
    const task = item;
    const title = task.title || "Untitled";
    const description = task.description || "";
    const status = task.status || "";
    const priority = task.priority || "";
    const tags = task.tags || [];
    const assignee = task.assignee || task.assignTo || "";
    const dueDate = task.dueDate || "";

    return (
      <div
        key={index}
        className="p-4 border border-border rounded-xl bg-card hover:border-muted-foreground/50 transition-all duration-200 flex flex-col gap-3 "
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base leading-tight">{title}</h3>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}

        {(status || priority) && (
          <div className="flex flex-row items-center gap-2">
            {status && <span className={`text-xs px-2 py-1 rounded-md border ${getStatusStyle(status)}`}>{status.toLowerCase()}</span>}
            {priority && <span className={`text-xs px-2 py-1 rounded-md border ${getPriorityStyle(priority)}`}>{priority.toLowerCase()}</span>}
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          {assignee ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {getInitials(assignee)}
              </div>
              <span className="text-sm text-muted-foreground">{assignee}</span>
            </div>
          ) : (
            <div />
          )}

          {dueDate && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {formatDate(dueDate)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {data.map((item, index) => (
        <div key={index}>
          {renderCard ? renderCard(item, index) : defaultRenderCard(item, index)}
        </div>
      ))}

      {data.length === 0 && (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No results.
        </div>
      )}
    </div>
  );
}

// DataTable JSX Version
export function DataTable({ columns, data, filters = [], showFilters = true }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination, sorting, columnFilters },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFilterChange = (filterId, value) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }));

    if (value === "all" || value === "") {
      setColumnFilters((prev) => prev.filter((f) => f.id !== filterId));
    } else {
      setColumnFilters((prev) => {
        const existing = prev.find((f) => f.id === filterId);
        if (existing) {
          return prev.map((f) => (f.id === filterId ? { ...f, value } : f));
        }
        return [...prev, { id: filterId, value }];
      });
    }
  };

  const hasFilters = filters.length > 0;

  return (
    <div>
      {/* Search & Filter */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full"
          />

          {/* Each filter UI */}
          {hasFilters &&
            showFilters &&
            filters.map((filter) => (
              <Select
                key={filter.id}
                value={filterValues[filter.id] || "all"}
                onValueChange={(v) => handleFilterChange(filter.id, v)}
              >
                <SelectTrigger className="h-9 cursor-pointer w-auto rounded-md border border-input bg-background px-2 text-sm">
                  <Filter className="h-4 w-4 mx-2 text-muted-foreground" />
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {filter.label}</SelectItem>
                  {filter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
        </div>

        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Rows</label>
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(v) =>
              setPagination((p) => ({ ...p, pageSize: Number(v), pageIndex: 0 }))
            }
>
            <SelectTrigger className="h-8 cursor-pointer rounded-md border border-input bg-background px-2 text-sm  text-black w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="text-black">
              {[10, 20, 30, 40, 50].map((s) => (
                <SelectItem key={s} value={String(s)} className="text-black">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} >
                {group.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder ? null : (
                        <button
                          className="flex items-center gap-2"
                          onClick={() => canSort && header.column.toggleSorting()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <span>
                              {sortState === "asc" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : sortState === "desc" ? (
                                <ArrowDown className="h-3 w-3" />
                              ) : (
                                <ArrowUpDown className="h-3 w-3 opacity-50" />
                              )}
                            </span>
                          )}
                        </button>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="text-white">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground text-white">
          Showing{" "}
          {pagination.pageIndex * pagination.pageSize + 1} -{" "}
          {Math.min(
            (pagination.pageIndex + 1) * pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-black"
          >
            Prev
          </Button>

          <div className="px-3 text-sm text-white">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-black"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
