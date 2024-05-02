'use client'

import { Invoice, User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export const invoiceColumns: ColumnDef<Invoice>[] = [
    {
        accessorKey: 'invoiceNumber',
        header: 'Factuur nummer',
    },
    {
        accessorKey: 'amount',
        header: 'Bedrag',
    },
    {
        accessorKey: 'brand',
        header: 'Merk',
    },
    {
        accessorKey: 'bikeType.name',
        header: 'Type',
    },
    {
        accessorKey: 'purchaserName',
        header: 'Naam klant',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
]

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'createdAt',
        header: 'Aangemaakt op',
        accessorFn: (user) => format(new Date(user.createdAt), 'dd-MM-yyyy HH:mm'),
    },
]
