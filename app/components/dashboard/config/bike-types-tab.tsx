import { DataTable } from '@/components/main/table/data-table'
import { bikeTypeColumns } from '@/lib/columns'
import { BikeType } from '@prisma/client'
import React from 'react'

type BikeTypesTabProps = {
    bikeTypes: BikeType[]
}

export const BikeTypesTab: React.FC<BikeTypesTabProps> = ({ bikeTypes }) => {
    if (!bikeTypes.length) {
        return <div>Geen fiets types gevonden</div>
    }

    return (
        <div className="max-w-4xl">
            <DataTable data={bikeTypes} columns={bikeTypeColumns} />
        </div>
    )
}
