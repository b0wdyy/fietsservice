"use client"

import { Invoice } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "invoiceNumber",
        header: "Factuur nummer"
    },
    {
        accessorKey: "amount",
        header: "Bedrag"
    },
    {
        accessorKey: "deposit",
        header: "Voorschot"
    },
    {
        accessorKey: "brand",
        header: "Merk"
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "dateOfPurchase",
        header: "Datum"
    },
    {
        accessorKey: "purchaserName",
        header: "Naam klant"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
]
