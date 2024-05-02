import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useIsSubmitting } from '@/hooks/useIsSubmitting'
import { Form } from '@remix-run/react'
import { useRef } from 'react'

export function CreateUser() {
    const dialogClose = useRef<HTMLButtonElement>(null)
    const isSubmitting = useIsSubmitting()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Gebruiker aanmaken</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Gebruiker aanmaken</DialogTitle>
                </DialogHeader>

                <Form
                    method="POST"
                    action="/dashboard/users"
                    className="grid gap-4 py-4"
                    id="user-form"
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john.doe@john.com"
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Wachtwoord
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="*************"
                            className="col-span-3"
                        />
                    </div>
                </Form>

                <DialogFooter>
                    <Button
                        form="user-form"
                        type="submit"
                        onClick={() => dialogClose.current?.click()}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Gebruiker aan het opslaan...' : 'Gebruiker opslaan'}
                    </Button>
                    <DialogClose ref={dialogClose} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
