import { Button } from "@shadcn/components/ui/button";
import { PlaceholdersAndVanishInput } from "@shadcn/components/ui/placeholder-and-vanish-input";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@shadcn/components/ui/table";
import { MoreHorizontal, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react"
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
} from "@tanstack/react-table"
import { GerbangRow } from "@libs/types/GerbangType";
import { deleteGerbang, fetchListGerbang } from "@libs/service/GerbangService";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@shadcn/components/ui/dropdown-menu";
import ModalMain from "@component/widgets/modal/ModalMain";
import DeleteGerbang from "./modal/ModalDeleteGerbang";
import toast from "react-hot-toast";
import Toast from "@component/widgets/toast";
import ModalCreateGerbang from "./modal/ModalCreateGerbang";
import ModalUpdateGerbang from "./modal/ModalUpdateGerbang";

export default function LisGerbang() {
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [modalCreate, setModalCreate] = React.useState<boolean>(false);
    const [modalUpdate, setModalUpdate] = React.useState<boolean>(false);
    const [modalDelete, setModalDelete] = React.useState<boolean>(false);
    const [lisGerbang, setLisGerbang] = React.useState<GerbangRow[]>([]);
    const [selectedUser, setSelectedUser] =
        React.useState<GerbangRow | null>(null);
    const [pageDirection, setPageDirection] = React.useState<"next" | "prev" | "filter">("filter")
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const placeholders = [
        "Cari ID",
        "Cari ID Cabang",
        "Cari Nama Cabang",
        "Cari Nama Gerbang",
    ];
    const [params, setParams] = React.useState({
        id: undefined as number | undefined,
        IdCabang: undefined as number | undefined,
        NamaCabang: "",
        NamaGerbang: "",
        page: 1,
        limit: 10,
    });
    const handleChange = (value: string) => {
        setGlobalFilter(value);
    };

    const columns: ColumnDef<GerbangRow>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => row.getValue("id"),
        },
        {
            accessorKey: "IdCabang",
            header: "ID Cabang",
            cell: ({ row }) => row.getValue("IdCabang"),
        },
        {
            accessorKey: "NamaCabang",
            header: "Nama Cabang",
            cell: ({ row }) => row.getValue("NamaCabang"),
        },
        {
            accessorKey: "NamaGerbang",
            header: "Nama Gerbang",
            cell: ({ row }) => row.getValue("NamaGerbang"),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const listGerbang = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuSeparator />



                            <DropdownMenuItem
                                   onClick={() => setModalUpdate(true)}

                            >
                                Edit Data
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedUser(listGerbang);
                                    setModalDelete(true);
                                }}
                            >
                                <p className="text-[#EF144A] font-semibold">Hapus</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];
    const table = useReactTable({
        data: lisGerbang,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
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
            )
        },
    })

    const tbodyVariants = {
        enter: (direction: string) => {
            if (direction === "next") {
                return { opacity: 0, x: 40 }
            }
            if (direction === "prev") {
                return { opacity: 0, x: -40 }
            }
            return { opacity: 0, y: 8 }
        },
        center: {
            opacity: 1,
            x: 0,
            y: 0,
        },
        exit: (direction: string) => {
            if (direction === "next") {
                return { opacity: 0, x: -40 }
            }
            if (direction === "prev") {
                return { opacity: 0, x: 40 }
            }
            return { opacity: 0, y: -8 }
        },
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchListGerbang(params);

                setLisGerbang(res?.data?.rows?.rows ?? []);
            } catch (error) {
                console.error("Fetch gerbang error:", error);
            }
        };

        fetchData();
    }, [params]);

    const handleDeleteGerbang = async () => {
        if (!selectedUser) return;

        try {
            const res = await deleteGerbang({
                id: selectedUser.id,
                IdCabang: selectedUser.IdCabang,
            });

            if (res?.status === 200) {
                toast.custom(
                    (t) => (
                        <Toast.Success
                            visible={t.visible}
                            onClose={() => toast.remove(t.id)}
                            text="Data Berhasil Dihapus"
                        />
                    ),
                    { position: "top-center" }
                );

                setLisGerbang((prev) =>
                    prev.filter(
                        (item) =>
                            !(
                                item.id === selectedUser.id &&
                                item.IdCabang === selectedUser.IdCabang
                            )
                    )
                );

                setSelectedUser(null);
                setModalDelete(false);
            } else {
                toast.custom(
                    (t) => (
                        <Toast.Error
                            visible={t.visible}
                            onClose={() => toast.remove(t.id)}
                            text="Gagal Mengubah Status"
                        />
                    ),
                    { position: "top-center" }
                );
            }
        } catch (error) {
            console.error("Delete gerbang error:", error);
            toast.error("Terjadi kesalahan saat menghapus data");
        }
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

                    <div className="grid grid-cols-12 gap-3 items-center">

                        {/* Search */}
                        <div className="col-span-12 md:col-span-7 w-full xl:w-[500px] lg:col-span-6">


                            {/* Search */}


                            <PlaceholdersAndVanishInput
                                placeholders={placeholders}
                                value={globalFilter}
                                onChange={(e) => {
                                    setPageDirection("filter")
                                    handleChange(e)
                                }}
                            />
                        </div>

                        {/* Tombol Add */}
                        <div className="col-span-12 md:col-span-5 lg:col-span-6 flex md:justify-end items-center">

                            <button
                                type="button"
                                onClick={() => setModalCreate(true)}
                                className="inline-flex w-full md:w-auto items-center justify-center gap-2
                   border border-neutral-300 bg-white rounded-md
                   px-4 py-2 text-sm font-medium text-zinc-800
                   hover:bg-neutral-100 transition"
                            >
                            <Plus/>
                                <span className="hidden sm:inline">
                                    Tambah
                                </span>
                            </button>
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
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <AnimatePresence mode="wait" custom={pageDirection}>
                                <motion.tbody
                                    key={`${table.getState().pagination.pageIndex}-${globalFilter}`}
                                    custom={pageDirection}
                                    variants={tbodyVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        duration: 0.35,
                                        ease: "easeOut",
                                    }}
                                    className="[&_tr:last-child]:border-0 dark:[&_tr]:border-b-[#40444b]"
                                >
                                    {table.getRowModel().rows?.length ? (
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
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </motion.tbody>
                            </AnimatePresence>

                        </Table>
                    </div>
                    {/* Table */}

                    {/* Pagination */}
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className=" flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setPageDirection("prev")
                                    table.previousPage()
                                }}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setPageDirection("next")
                                    table.nextPage()
                                }}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tambah Data */}
            <ModalMain
                title="Tambah data"
                isOpen={modalCreate}
                onClose={() => setModalCreate(false)}
                size="xl"
            >
                <ModalCreateGerbang
                />
            </ModalMain>
            {/* Modal Tambah Data */}

            {/* Modal Update Data */}
            <ModalMain
                title="Update Data"
                isOpen={modalUpdate}
                onClose={() => setModalUpdate(false)}
                size="xl"
            >
                <ModalUpdateGerbang
                />
            </ModalMain>
            {/* Modal Tambah Data */}

            {/* Modal Hapus Data */}
            <ModalMain
                title="Hapus Data"
                isOpen={modalDelete}
                onClose={() => setModalDelete(false)}
                size="xl"
            >
                <DeleteGerbang
                    onDelete={handleDeleteGerbang}
                    onClose={() => setModalDelete(false)}
                />
            </ModalMain>
            {/* Modal Hapus Data */}

        </motion.div>
    )
}
