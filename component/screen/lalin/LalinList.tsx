import { Button } from "@shadcn/components/ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@shadcn/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@shadcn/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { fetchListLalins } from "@libs/service/LalinService";
import { AggregatedRow, LalinRows } from "@libs/types/LalinTypes";
import { PlaceholdersAndVanishInput } from "@shadcn/components/ui/placeholder-and-vanish-input";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@shadcn/components/ui/calendar";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

const daysMap: Record<number, string> = {
    0: 'Minggu',
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu'
};

const paymentCategoryMap: Record<string, string[]> = {
    'TUNAI': ['Tunai'],
    'KTP': ['DinasOpr', 'DinasMitra', 'DinasKary'],
    'ETOLL': ['eMandiri', 'eBri', 'eBni', 'eBca', 'eDKI', 'eMega'],
    'FLO': ['eFlo']
};

const paymentDisplayNames: Record<string, string> = {
    'Tunai': 'Tunai',
    'DinasOpr': 'Dinas Opr',
    'DinasMitra': 'Dinas Mitra',
    'DinasKary': 'Dinas Kary',
    'eMandiri': 'e-Mandiri',
    'eBri': 'e-BRI',
    'eBni': 'e-BNI',
    'eBca': 'e-BCA',
    'eNobu': 'e-Nobu',
    'eDKI': 'e-DKI',
    'eMega': 'e-Mega',
    'eFlo': 'e-Flo'
};

export default function LisGerbang() {
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [aggregatedData, setAggregatedData] = React.useState<AggregatedRow[]>([]);
    const [pageDirection, setPageDirection] = React.useState<"next" | "prev" | "filter">("filter");
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [selectedCategory, setSelectedCategory] = React.useState("all");
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isEmpty, setIsEmpty] = React.useState(false);

    const placeholders = [
        "Cari Ruas",
        "Cari Gerbang",
        "Cari Gardu",
        "Cari Tanggal",
    ];

    const handleChange = (value: string) => {
        setGlobalFilter(value);
    };

    const columns: ColumnDef<AggregatedRow>[] = [
        {
            accessorKey: "no",
            header: "No.",
        },
        {
            accessorKey: "ruas",
            header: "Ruas",
        },
        {
            accessorKey: "gerbang",
            header: "Gerbang",
        },
        {
            accessorKey: "gardu",
            header: "Gardu",
        },
        {
            accessorKey: "hari",
            header: "Hari",
        },
        {
            accessorKey: "tanggal",
            header: "Tanggal",
        },
        {
            accessorKey: "metodePembayaran",
            header: "Metode Pembayaran",
        },
        {
            accessorKey: "gol1",
            header: "Gol I",
        },
        {
            accessorKey: "gol2",
            header: "Gol II",
        },
        {
            accessorKey: "gol3",
            header: "Gol III",
        },
        {
            accessorKey: "gol4",
            header: "Gol IV",
        },
        {
            accessorKey: "gol5",
            header: "Gol V",
        },
        {
            accessorKey: "totalLalin",
            header: "Total Lalin",
        },
    ];

    const filteredByCategory = React.useMemo(() => {
        if (selectedCategory === "all") {
            return aggregatedData;
        }
        return aggregatedData.filter(row => row.kategoriPembayaran === selectedCategory);
    }, [aggregatedData, selectedCategory]);

    const table = useReactTable({
        data: filteredByCategory,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getRowId: (row) =>
            `${row.tanggal}-${row.gerbang}-${row.gardu}-${row.metodePembayaran}`,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, columnId, filterValue) => {
            return Object.values(row.original).some((value) =>
                String(value).toLowerCase().includes(String(filterValue).toLowerCase())
            );
        },
    });

    const tbodyVariants = {
        enter: (direction: string) => {
            if (direction === "next") {
                return { opacity: 0, x: 40 };
            }
            if (direction === "prev") {
                return { opacity: 0, x: -40 };
            }
            return { opacity: 0, y: 8 };
        },
        center: {
            opacity: 1,
            x: 0,
            y: 0,
        },
        exit: (direction: string) => {
            if (direction === "next") {
                return { opacity: 0, x: -40 };
            }
            if (direction === "prev") {
                return { opacity: 0, x: 40 };
            }
            return { opacity: 0, y: -8 };
        },
    };

    const aggregateData = (rawData: LalinRows[]): AggregatedRow[] => {
        const grouped: Record<string, any> = {};

        rawData.forEach(row => {
            const dateKey = dayjs(row.Tanggal).format("YYYY-MM-DD");

            Object.entries(paymentCategoryMap).forEach(([category, methods]) => {
                methods.forEach(method => {
                    const key = `${dateKey}-${row.IdGerbang}-${row.IdGardu}-${method}`;

                    if (!grouped[key]) {
                        grouped[key] = {
                            Tanggal: dateKey, // simpan ISO, bukan Date object
                            IdGerbang: row.IdGerbang,
                            IdGardu: row.IdGardu,
                            kategoriPembayaran: category,
                            metodePembayaran: method,
                            golongan1: 0,
                            golongan2: 0,
                            golongan3: 0,
                            golongan4: 0,
                            golongan5: 0,
                        };
                    }

                    const paymentValue = row[method as keyof LalinRows] as number;
                    grouped[key][`golongan${row.Golongan}`] += paymentValue;
                });
            });
        });

        return Object.values(grouped)
            .filter((item: any) =>
                item.golongan1 + item.golongan2 + item.golongan3 + item.golongan4 + item.golongan5 > 0
            )
            .map((item: any, index) => ({
                no: index + 1,
                ruas: `Ruas ${Math.floor(item.IdGerbang / 3) + 1}`,
                gerbang: `Gerbang ${item.IdGerbang}`,
                gardu: String(item.IdGardu).padStart(2, '0'),
                hari: daysMap[dayjs(item.Tanggal).day()],
                tanggal: dayjs(item.Tanggal).format("DD/MM/YYYY"),
                kategoriPembayaran: item.kategoriPembayaran,
                metodePembayaran: paymentDisplayNames[item.metodePembayaran],
                gol1: item.golongan1,
                gol2: item.golongan2,
                gol3: item.golongan3,
                gol4: item.golongan4,
                gol5: item.golongan5,
                totalLalin:
                    item.golongan1 +
                    item.golongan2 +
                    item.golongan3 +
                    item.golongan4 +
                    item.golongan5,
            }));
    };


    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsEmpty(false);

            try {
                const params =
                    dateRange?.from && !dateRange?.to
                        ? {
                            tanggal: dayjs(dateRange.from).format("YYYY-MM-DD"),
                        }
                        : dateRange?.from && dateRange?.to
                            ? {
                                tanggalAwal: dayjs(dateRange.from).format("YYYY-MM-DD"),
                                tanggalAkhir: dayjs(dateRange.to).format("YYYY-MM-DD"),
                            }
                            : undefined;

                const result = await fetchListLalins(params);

                const rows = result.rows ?? [];

                if (rows.length === 0) {
                    setAggregatedData([]);
                    setIsEmpty(true);
                    return;
                }

                const aggregated = aggregateData(rows);

                if (aggregated.length === 0) {
                    setAggregatedData([]);
                    setIsEmpty(true);
                } else {
                    setAggregatedData(aggregated);
                    setIsEmpty(false);
                }

                setPageDirection("filter");
            } catch (error) {
                console.error("Fetch lalin error:", error);
                setAggregatedData([]);
                setIsEmpty(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dateRange]);

    const exportToExcel = () => {
        const dataToExport = filteredByCategory.map((row) => ({
            No: row.no,
            Ruas: row.ruas,
            Gerbang: row.gerbang,
            Gardu: row.gardu,
            Hari: row.hari,
            Tanggal: row.tanggal,
            "Kategori Pembayaran": row.kategoriPembayaran,
            "Metode Pembayaran": row.metodePembayaran,
            "Gol I": row.gol1,
            "Gol II": row.gol2,
            "Gol III": row.gol3,
            "Gol IV": row.gol4,
            "Gol V": row.gol5,
            "Total Lalin": row.totalLalin,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Lalin");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `Laporan_Lalin_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    return (
        <motion.div
            className="grid grid-cols-12 gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
        >
            <div className="col-span-12 lg:col-span-12 px-2 sm:px-0">
                <div className="border border-neutral-300 bg-white rounded-b-2xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center w-full">

                        {/* Search */}
                        <div className="md:col-span-4 lg:col-span-3">
                            <PlaceholdersAndVanishInput
                                placeholders={placeholders}
                                value={globalFilter}
                                onChange={(e) => {
                                    setPageDirection("filter");
                                    handleChange(e);
                                }}
                            />
                        </div>

                        {/* Date Range */}
                        <div className="md:col-span-4 lg:col-span-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                                        <span className="truncate">
                                            {dateRange?.from ? (
                                                dateRange.to ? (
                                                    <>
                                                        {dayjs(dateRange.from).format("DD MMM YYYY")} -{" "}
                                                        {dayjs(dateRange.to).format("DD MMM YYYY")}
                                                    </>
                                                ) : (
                                                    dayjs(dateRange.from).format("DD MMM YYYY")
                                                )
                                            ) : (
                                                "Pilih tanggal"
                                            )}
                                        </span>
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="start"
                                    side="bottom"
                                    sideOffset={8}
                                    className="
                    w-full
                    max-w-[95vw]
                    sm:max-w-[420px]
                    md:max-w-none
                    p-0
                "
                                >
                                    <div className="p-2">
                                        <Calendar
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={2}
                                            toMonth={new Date()}
                                            disabled={{ after: new Date() }}
                                            showOutsideDays={false}
                                            className="rounded-lg w-full"
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Category */}
                        <div className="md:col-span-3 lg:col-span-2">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Kategori Pembayaran" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">Semua Kategori</SelectItem>
                                        <SelectItem value="TUNAI">TUNAI</SelectItem>
                                        <SelectItem value="KTP">KTP (Dinas)</SelectItem>
                                        <SelectItem value="ETOLL">E-TOLL</SelectItem>
                                        <SelectItem value="FLO">FLO</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Export */}
                        <div className="md:col-span-1 flex md:justify-end">
                            <Button
                                variant="outline"
                                onClick={exportToExcel}
                                className="w-full md:w-auto"
                            >
                                Export Excel
                            </Button>
                        </div>

                    </div>


                    {/* Table */}
                    <div className="mt-4 rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <AnimatePresence mode="wait" custom={pageDirection}>
                                <motion.tbody
                                    key="table-body"
                                    custom={pageDirection}
                                    variants={tbodyVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        duration: 0.35,
                                        ease: "easeOut",
                                    }}
                                    className="[&_tr:last-child]:border-0"
                                >
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                Memuat data...
                                            </TableCell>
                                        </TableRow>
                                    ) : table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                {isEmpty ? "Tidak ada data" : "No results."}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </motion.tbody>
                            </AnimatePresence>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setPageDirection("prev");
                                    table.previousPage();
                                }}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setPageDirection("next");
                                    table.nextPage();
                                }}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}