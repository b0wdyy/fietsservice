import SignatureCanvas from 'react-signature-canvas'
import { invoiceSchema } from '@/lib/invoice.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { BikeType } from '@prisma/client'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useSubmit } from '@remix-run/react'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

type InvoiceFormProps = {
    bikeTypes: BikeType[] | undefined
}

export const InvoiceForm = ({ bikeTypes }: InvoiceFormProps) => {
    const submit = useSubmit()
    const form = useForm<z.infer<typeof invoiceSchema>>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            amount: 0,
            deposit: 0,
            brand: '',
            bikeTypeId: '',
            dateOfPurchase: new Date(),
            purchaserName: '',
            extraAgreements: '',
            email: '',
            signature: '',
            img: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof invoiceSchema>) {
        const formData = new FormData()
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                const value = values[key as keyof typeof values]
                if (key === 'img' && value) {
                    formData.append(key, value as File)
                    continue
                }
                formData.append(key, String(value))
            }
        }
        submit(formData, {
            method: 'POST',
            encType: 'multipart/form-data',
            action: '/new',
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="space-y-4 pb-4"
            >
                <div className="space-y-4 md:flex md:w-1/2 md:gap-6 md:space-y-0">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Bedrag</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="deposit"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Voorschot</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4 md:flex md:gap-6 md:space-y-0">
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Merk</FormLabel>
                                <FormControl>
                                    <Input placeholder="Victoria" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bikeTypeId"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} {...field}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecteer een type" />
                                        </SelectTrigger>
                                    </FormControl>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Type</SelectLabel>
                                            {bikeTypes?.map((value) => (
                                                <SelectItem key={value.id} value={value.id}>
                                                    {value.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4 md:flex md:gap-6 md:space-y-0">
                    <FormField
                        control={form.control}
                        name="purchaserName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Naam</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john.doe@gmail.com" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div>
                    <FormField
                        control={form.control}
                        name="dateOfPurchase"
                        render={({ field }) => (
                            <FormItem className="flex w-1/2 flex-col">
                                <FormLabel>Datum van aankoop</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={'outline'}
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value && 'text-muted-foreground'
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="img"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Foto</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    {...fieldProps}
                                    onChange={(e) => {
                                        onChange(e.target.files?.[0])
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                ></FormField>

                <div>
                    <FormField
                        control={form.control}
                        name="extraAgreements"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Extra opmerkingen</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Onderhoud binnen 6 maanden, nieuw zadel, ..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="signature"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Handtekening koper</FormLabel>

                            {/* <SignatureCanvas /> */}
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full md:w-auto"
                    type="submit"
                    disabled={form.formState.isSubmitting || !form.formState.isValid}
                >
                    {form.formState.isSubmitting ? 'Aan het verwerken...' : 'Genereer'}
                </Button>
            </form>
        </Form>
    )
}
